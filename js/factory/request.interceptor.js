(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 8 */
     angular.module('module.factory.interceptor',[])
    .factory('requestInterceptor', errorInterceptor);

    errorInterceptor.$inject = ['$rootScope',
    						    '$q'];

    function errorInterceptor($rootScope,$q){


    	return {

    		request: function (config) {
		   		$rootScope.$broadcast('$request', config);
	        	return config || $q.when(config);
	      	},

	      	response: function (response) {	
		   		$rootScope.$broadcast('$response', response);  
	    	 return response || $q.when(response);
		    },

		   requestError: function (rejection) {
		   		$rootScope.$broadcast('$requestError', rejection);
	        	return $q.reject(rejection);
	      	},

	      	responseError: function (rejection) {	
		   		$rootScope.$broadcast('$responseError', rejection);    		
		    	return $q.reject(rejection);
		    }

	    };

	}

}(angular));