/**
 * Created by Lidia Freitas on 01/07/2017.
 */

'use strict';

let EstadoUI = (function (argument) {
    let selectContainer = document.getElementById('select-uf');
    let mapaContainer = document.getElementById('container-mapa');
    let representantesContainer = document.getElementById('container-panels');

    function create() {
        EstadoServico.getAll().then(success).catch(fail);

        function success(response) {
            response.forEach(function (item) {
                buildHTML(item);
            });

            initializeEvents();
        }

        function fail(error) {
            console.log(error);
        }
    }

    function buildHTML(item) {
        let tagEstado = document.createElement('i');
        let tagOption = document.createElement('option');

        tagEstado.classList.add('uf', 'icon-' + item.sigla);
        tagEstado.dataset.value = item.sigla;
        tagOption.value = item.sigla;
        tagOption.innerText = item.nome;

        mapaContainer.appendChild(tagEstado);
        selectContainer.appendChild(tagOption);
    }

    function initializeEvents() {
        mapaContainer.addEventListener('click', function () {
            let ufSelecionado = event.target.dataset.value;

            activate(ufSelecionado);

            RepresentanteServico.getPorEstado(ufSelecionado)
                .then(function (result) {
                    while (representantesContainer.firstChild) {
                        representantesContainer.removeChild(representantesContainer.firstChild);
                    }

                    result.forEach(function (item) {
                        RepresentanteUI.buildHTML(item);
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }, false);

        selectContainer.addEventListener('change', function () {
            let ufSelecionado = this.value;

            activate(ufSelecionado);

            RepresentanteServico.getPorEstado(ufSelecionado)
                .then(function (result) {
                    while (representantesContainer.firstChild) {
                        representantesContainer.removeChild(representantesContainer.firstChild);
                    }

                    result.forEach(function (item) {
                        RepresentanteUI.buildHTML(item);
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }, false);
    }

    function activate(ufSelecionado) {
        let estadoAtual = document.getElementsByClassName('ativo');
        if (!ufSelecionado) {
            estadoAtual[0].classList.remove('ativo');
            return;
        }

        let estadoSelecionado = document.getElementsByClassName('icon-' + ufSelecionado);

        if (estadoAtual.length) {
            estadoAtual[0].classList.remove('ativo');
        }
        estadoSelecionado[0].classList.add('ativo');
        selectContainer.value = ufSelecionado;
    }

    return  {
        create: create
    };
})();



