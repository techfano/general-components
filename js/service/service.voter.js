(function() {
    'use strict';
    /*global FormData*/
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 8 */
    angular
    .module('module.service.voter',[])
    .service('serviceVoter', serviceVoter);

    serviceVoter.$inject = ['serviceResource'];

    function serviceVoter(serviceResource) {

        this.search = function(query,fnSuccess,fnError){

            var search = serviceResource.request('voterSearch');

            return search.get(query,fnSuccess,fnError);

        };

        this.language = function(lang,fnSuccess,fnError){

            var language = serviceResource.request('language');

            return language.save(lang,fnSuccess,fnError);

        };

        this.checkIn = function(nationalId,fnSuccess,fnError){

            var checkIn = serviceResource.request('checkIn');

            return checkIn.put(nationalId,fnSuccess,fnError);

        };

        this.import = function(file, fnSuccess, fnError){

            var fd = new FormData();
            fd.append('file', file);

            var importVoterList = serviceResource.request('importVoterList');

            return importVoterList.save(fd, fnSuccess, fnError);

        };

        this.sendVoterTurnout = function (fnSuccess, fnError) {
            
            var send = serviceResource.request('sendVoterTurnout');

            return send.get(fnSuccess, fnError);

        };

        this.importFromServer = function(fnSuccess, fnError){

            var importVoterList = serviceResource.request('importVoterList');

            return importVoterList.get(fnSuccess, fnError);

        };

        this.sendFinalVoter = function(query, fnSuccess, fnError){

            var sendFinal = serviceResource.request('sendFinal');

            return sendFinal.get(query, fnSuccess, fnError);

        };

    }

}(angular));