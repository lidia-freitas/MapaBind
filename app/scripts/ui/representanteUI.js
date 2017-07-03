/**
 * Created by Lidia Freitas on 01/07/2017.
 */

'use strict';

let RepresentanteUI = (function (argument) {
    let representantesContainer = document.getElementById('container-panels');

    function create() {
        RepresentanteServico.getAll().then(success).catch(fail);

        function success(response) {
            // remove itens a cada consulta
            while (representantesContainer.firstChild) {
                representantesContainer.removeChild(representantesContainer.firstChild);
            }

            response.forEach(function (item) {
                buildHTML(item);
            });
        }

        function fail(error) {
            console.log(error);
        }
    }

    function buildHTML(item) {
        //cria os elementos html
        let panel = document.createElement('div');
        let panelHeader = document.createElement('div');
        let panelBody = document.createElement('div');

        let listaTelefones = document.createElement('span');
        let listaEmails = document.createElement('span');

        let containerEndereco = document.createElement('p');
        let containerTelefones = document.createElement('p');
        let containerEmails = document.createElement('p');

        let iconTelefones = document.createElement('i');
        let iconEmails = document.createElement('i');

        //adiciona as classes
        panel.classList.add('panel', 'panel-default');
        panelHeader.classList.add('panel-heading');
        panelBody.classList.add('panel-body');

        containerEndereco.classList.add('endereco-representante');
        containerTelefones.classList.add('telefones-representante');
        containerEmails.classList.add('emails-representante');

        iconTelefones.classList.add('mp-icon-phone');
        iconEmails.classList.add('mp-icon-mail');

        //cria os elementos html e seta os atributos e conteudos
        item.telefones.forEach(function (tel) {
            let linkFone = document.createElement('a');
            linkFone.setAttribute('href', tel.link);
            linkFone.innerText = tel.txt;

            listaTelefones.appendChild(linkFone);
        });

        item.emails.forEach(function (email) {
            let linkEmail = document.createElement('a');
            linkEmail.setAttribute('href', email.link);
            linkEmail.innerText = email.txt;

            listaEmails.appendChild(linkEmail);
        });

        //monta o panel
        panelHeader.innerText = item.titulo;
        panel.appendChild(panelHeader);

        containerEndereco.innerText = item.endereco;

        containerTelefones.appendChild(iconTelefones);
        containerTelefones.appendChild(listaTelefones);

        containerEmails.appendChild(iconEmails);
        containerEmails.appendChild(listaEmails);

        panelBody.appendChild(containerEndereco);
        panelBody.appendChild(containerTelefones);
        panelBody.appendChild(containerEmails);

        panel.appendChild(panelHeader);
        panel.appendChild(panelBody);

        representantesContainer.appendChild(panel);
    }

    return {
        create: create,
        buildHTML: buildHTML
    };
})();
