/**
 * Created by Lidia Freitas on 30/06/2017.
 */

'use strict';

let RepresentanteRepositorio = Object.create(null, {
    getAll: {
        value: function () {
            return new Promise (function (resolve, reject) {
                RequestApi.get('https://gist.githubusercontent.com/lidia-freitas/638005146a7e7763af98/raw/93320dc7d37d484bee3b16f6ce98577e896ad452/representantes.json')
                    .then(success).catch(fail);

                function success(response) {
                    return resolve(response)
                }

                function fail(error) {
                    return reject(error)
                }
            });
        }
    },
    getPorEstado: {
        value: function (name) {
            return new Promise (function (resolve, reject) {
                RequestApi.get('https://gist.githubusercontent.com/lidia-freitas/638005146a7e7763af98/raw/93320dc7d37d484bee3b16f6ce98577e896ad452/representantes.json', name)
                    .then(success).catch(fail);

                function success(response) {
                    return resolve(response.filter(function (item) {
                        return item.sigla === name;
                    }))
                }

                function fail(error) {
                    return reject(error)
                }
            });
        }
    }
});