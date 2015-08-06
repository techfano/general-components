(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 8 */
    angular
    .module('module.service.login',[])
    .service('serviceLogin', serviceLogin);

    serviceLogin.$inject = ['serviceResource'];

    function serviceLogin(serviceResource) {

        this.login = function(user,fnSuccess,fnError){

            var login = serviceResource.request('login');

            return login.save(user,fnSuccess,fnError);

        };

        this.validationLogin = function(user,fnSuccess,fnError){
            var login = serviceResource.request('validationLogin');

            return login.save(user,fnSuccess,fnError);
        };

        this.logoff = function(fnSuccess,fnError) {
            var logoff = serviceResource.request('logoff');

            return logoff.get(fnSuccess,fnError);
        };

    }

}(angular));