/**
 * Created by Lidia Freitas on 30/06/2017.
 */

'use strict';

let EstadoRepositorio = Object.create(null, {
    getAll: {
        value: function () {
            return new Promise (function (resolve, reject) {
                RequestApi.get('https://gist.githubusercontent.com/lidia-freitas/4c0fd733dba8ab47aba1/raw/de0bf86aaa04b0c34787e14beddcf0ef829e4b2d/estados.json')
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
    getOne: {
        value: function (name) {
            return new Promise (function (resolve, reject) {
                RequestApi.get('https://gist.githubusercontent.com/lidia-freitas/4c0fd733dba8ab47aba1/raw/de0bf86aaa04b0c34787e14beddcf0ef829e4b2d/estados.json', name)
                    .then(success).catch(fail);

                function success(response) {
                    return resolve(response.filter(function (item) {
                        return item.sigla === name;
                    }));
                }

                function fail(error) {
                    return reject(error)
                }

            });
        }
    }
});