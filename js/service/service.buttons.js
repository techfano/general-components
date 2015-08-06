(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 8 */
    angular
    .module('module.service.buttons',[])
    .service('serviceButtons', serviceButtons);

    function serviceButtons() {

        this.voter = {

            importFile : {
                disabled : false 
            },
            importServer : {
                disabled : false 
            },
            checkIng : {
                disabled : false 
            },

            send: {
                disabled : true
            },
            export:{
                disabled: true
            },
            empty:{
                disabled: false
            },
            final:{
                disabled : false,
                show: false
            }            

        };
    }

}(angular));