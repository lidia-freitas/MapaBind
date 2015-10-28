(function () {
    var representantesResource = "https://gist.githubusercontent.com/lidia-freitas/638005146a7e7763af98/raw/dc78fbc4c81c6857597ff1c8f7c3ccbdd734a851/representantes.json";
    var estadosResource = "https://gist.githubusercontent.com/lidia-freitas/4c0fd733dba8ab47aba1/raw/2fdecb636c9eb6619aee91a8a58ecf763d891004/estados.json";
    var ufInicial = 'pr';


    function iniciaAjax () {
        var objetoAjax = false;
        if(window.XMLHttpRequest){
            objetoAjax = new XMLHttpRequest();
        }else if(window.ActiveXObject) {
            try{
                objetoAjax = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e){
                try {
                    objetoAjax = new ActiveXObject("Microsoft.XMLHTTP")
                } catch(ex) {
                    objetoAjax = false;
                }
            }
        }
        return objetoAjax;
    }

    function requisitaDados(arquivo) {
        return new  Promise (function (resolve, reject) {
            var requisicaoAjax = iniciaAjax();
            if (requisicaoAjax) {
                requisicaoAjax.onreadystatechange = function () {
                    if(requisicaoAjax.readyState == 4){
                        if(requisicaoAjax.status == 200 || requisicaoAjax.status == 304){
                            resolve(JSON.parse(requisicaoAjax.response));
                        }else{
                            alert("Problema na comunicação");
                            reject(Error(requisicaoAjax.statusText));
                        }
                    }
                };
                requisicaoAjax.open("GET", arquivo, true);
                requisicaoAjax.send(null);
            }
        });
    }

    function montaUiRepresentantes() {
        var represContainer = document.getElementById('container-panels'),
            panelRepres = '',
            linksFones = '',
            linksEmails = '';

        this.forEach(function (repres) {
            panelRepres += '<div class="panel panel-default"> \
                <div class="panel-heading">' + repres.titulo + '</div> \
                <div class="panel-body"> \
                    <p class="endereco-representante">' + repres.endereco + '</p> \
                    <p class="telefones-representante">' + linksFones + '</p> \
                    <p class="emails-representante"> ' + linksEmails + '</p> \
                </div> \
            </div>';

            for(var i = 0; i < repres.telefones.length; i++){
                linksFones += '<a href="' + repres.telefones[i].link + '">' + repres.telefones[i].txt +'</a>';
            }
            for(var i = 0; i < repres.emails.length; i++){
                linksEmails += '<a href="' + repres.emails[i].link + '">' + repres.emails[i].txt +'</a>';
            }
        })

        represContainer.innerHTML = panelRepres;
    }

    function montaUiEstados(){
        var imgEstadoContainer = document.getElementById('container-mapa'),
            optionContainer = document.getElementById('select-uf'),
            imgEstado = '',
            slcOption = '';

        this.forEach(function (uf) {
            imgEstado += '<span class="uf uf-'+ uf.sigla +'" data-value="'+ uf.sigla +'"></span>';
            slcOption += '<option value="'+ uf.sigla +'">' + uf.nome + '</option>';
        });

        imgEstadoContainer.innerHTML = imgEstado;
        optionContainer.innerHTML = slcOption;

        var ufAtivo = imgEstadoContainer.getElementsByClassName('uf-' + ufInicial);
        ufAtivo[0].classList.add('ativo');

        bindClickEvent();
    }

    function bindClickEvent(){
        var triggerEstado = document.getElementsByClassName('uf'),
            triggerOption = document.getElementById('select-uf');

        for (var i = 0; i < triggerEstado.length; i++) {
            triggerEstado[i].onclick = addEvento;
        }

        triggerOption.onchange = addEvento;

        function addEvento(e) {
            if (e.type === 'click') {
                var ufSelecionado = this.dataset.value;
            }else if(e.type === 'change'){
                var ufSelecionado = this.value;
            }

            busca(ufSelecionado);
            setaElemAtivo(ufSelecionado);
        }
    }

    function busca(estadoSelecionado) {
        requisitaDados(representantesResource).then(function(response) {
            var responseFilter = response.filter(function (repres) {
                return repres.sigla == estadoSelecionado;
            });

            montaUiRepresentantes.apply(responseFilter);

        }, function(error) {
            console.error("Falha!", error);
        });
    }

    function setaElemAtivo(ufSelecionado) {
        var estadoAtivo = document.getElementsByClassName('ativo'),
            estadoSelecionado = document.getElementsByClassName('uf-' + ufSelecionado);

        estadoAtivo[0].classList.remove('ativo');
        estadoSelecionado[0].classList.add('ativo');
        document.getElementById('select-uf').value = ufSelecionado;

    }

    function init() {
        requisitaDados(estadosResource).then(function(response) {
            montaUiEstados.apply(response);
            busca(ufInicial);
        }, function(error) {
            console.error("Falha!", error);
        });

        requisitaDados(representantesResource).then(function(response) {
            montaUiRepresentantes.apply(response);
            busca(ufInicial);
        }, function(error) {
            console.error("Falha!", error);
        });
    };

    return  init()

})();
