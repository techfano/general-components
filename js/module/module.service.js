(function(angular) {
	'use strict';
	
	angular.module('module.service', [
		'module.service.general',
		'module.service.resource',
		'module.service.storage',
		'module.service.login',
		'module.service.voter',
		'module.service.buttons',
		'module.service.websocket'
	]);

}(angular));