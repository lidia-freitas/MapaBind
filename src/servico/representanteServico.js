/**
 * Created by Lidia Freitas on 30/06/2017.
 */

'use strict';

let RepresentanteServico = Object.create(null, {
    getAll: {
        value: function () {
            return new Promise(function (resolve, reject) {
                RepresentanteRepositorio.getAll().then(success).catch(fail);

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
            return new Promise(function (resolve, reject) {

                RepresentanteRepositorio.getPorEstado(name).then(success).catch(fail);

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
