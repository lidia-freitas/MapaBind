/**
 * Created by Lidia Freitas on 01/07/2017.
 */

'use strict';

let MapaBindUI = (function  () {

    function create() {
        RepresentanteUI.create();
        EstadoUI.create();
    }

    return Object.create(null, {
        create: {value: create}
    });
}());