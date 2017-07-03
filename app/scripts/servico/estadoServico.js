/**
 * Created by Lidia Freitas on 01/07/2017.
 */

'use strict';

let EstadoServico = Object.create(null, {
    getAll: {
        value: function () {
            return new Promise(function (resolve, reject) {
                EstadoRepositorio.getAll().then(success).catch(fail);

                function success(response) {
                    return resolve(response)
                }

                function fail(error) {
                    return reject(error)
                }
            });
        }
    },
    getOne: {
        value: function (name) {
            return new Promise(function (resolve, reject) {

                EstadoRepositorio.getOne(name).then(success).catch(fail);

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
