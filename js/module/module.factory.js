(function(angular) {
	'use strict';
	
	angular.module('module.factory', [
		'module.factory.interceptor',
		'module.factory.sessionInterceptor'
	]);

}(angular));