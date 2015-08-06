(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 8 */
    angular
    .module('module.service.general',[])
    .service('serviceGeneral', serviceGeneral);

    serviceGeneral.$inject = ['serviceResource'];

    function serviceGeneral(serviceResource) {
        
        this.dbstatus = function(query,fnSuccess,fnError){

            var dbstatus = serviceResource.request('dbstatus');

            return dbstatus.get(query,fnSuccess,fnError);

        };

    }

}(angular));