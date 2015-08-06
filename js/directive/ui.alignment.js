//based on https://github.com/techfano/ng-components/
(function() {
	'use strict';
	/*jshint latedef: false */
	/*jshint validthis: true */
	angular
		.module('module.component.alignment',[])
		.directive('uiAlignment', uiAlignment);

		function uiAlignment($rootScope) {

			var directive = {
				restrict: 'A',
				link:link
			};

			return directive;

			function link($scope,element){

				var q = angular.element(element);

				$rootScope.$on('$translateChangeSuccess',function(event,data){
					
						if(data.language==='ara'){
							q.attr('dir','rtl');
						}else{
							q.attr('dir','ltr');
						}

				});

			}


		}

}(angular));
