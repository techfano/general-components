(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 8 */
     angular.module('module.factory.sessionInterceptor',[])
    .factory('sessionInterceptor', sessionInterceptor);

    sessionInterceptor.$inject = ['$rootScope','$state','serviceStorage'];

    function sessionInterceptor($rootScope,$state,serviceStorage){

    	return {
    		checkRoute: function() {
    			$rootScope.$on('$locationChangeSuccess', function(e, toState){

		    		var session = serviceStorage.getData('trackedData');

		    		if(toState.name === 'login') {
		    			return;
		    		}

		    		if(session !== undefined) {
		    			return;
		    		}

		    		$state.go('login');

		    	});		
    		}
    	};

	}

}(angular));