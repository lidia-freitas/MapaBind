/**
 * Created by Lidia Freitas on 01/07/2017.
 */

'use strict';

let RequestApi = Object.create(null, {
    ajaxRequest: {
        value: function  () {
            let ajaxRequest = false;
            if(window.XMLHttpRequest){
                ajaxRequest = new XMLHttpRequest();
            }else if(window.ActiveXObject) {
                try{
                    ajaxRequest = new ActiveXObject('Msxml2.XMLHTTP');
                } catch(e){
                    try {
                        ajaxRequest = new ActiveXObject('Microsoft.XMLHTTP')
                    } catch(ex) {
                        ajaxRequest = false;
                    }
                }
            }
            return ajaxRequest;
        }
    },
    get: {
        value: function (source) {
            let self = this;

            return new  Promise (function (resolve, reject) {
                let ajaxRequest = self.ajaxRequest();

                if (ajaxRequest) {
                    ajaxRequest.onreadystatechange = function () {
                        if(ajaxRequest.readyState == 4){
                            if(ajaxRequest.status == 200 || ajaxRequest.status == 304){
                                resolve(JSON.parse(ajaxRequest.response));
                            }else{
                                alert('Problema na comunicação');
                                reject(Error(ajaxRequest.statusText));
                            }
                        }
                    };
                    ajaxRequest.open('GET', source, true);
                    ajaxRequest.send(null);
                }
            });
        }
    }
});

