//based on https://github.com/techfano/ng-components/
(function() {
	'use strict';
	/*jshint latedef: false */
	/*jshint validthis: true */
	angular
		.module('module.component.toast',[])
		.directive('uiSuccessToast', clickMove);

		function clickMove($rootScope,$timeout) {

			var directive = {
				restrict: 'AE',
				templateUrl: 'template/uiSuccessToast.html',
				scope:{
					delayToast:'='
				},
				transclude: true,
				link:link
			};

			return directive;

			function link($scope,element){
				var q = angular.element(element);
				var a = angular.element(q[0].firstElementChild);
				
				var delay = 2000;

				if($scope.overlayToast){
					delay = $scope.overlayToast;
				}

				
				$rootScope.$on('beforeLoaderEvent',function(){

					a.removeClass('animated bounceInUp');
					a.addClass('animated bounceOutDown');


				});

				$rootScope.$on('afterLoaderEvent',function(){
					$scope.toast = true;
					a.removeClass('animated bounceOutDown');
					a.addClass('animated bounceInUp');

					$timeout(function() {

						a.removeClass('animated bounceInUp');
						a.addClass('animated bounceOutDown',function(){
							$scope.toast = false;
						});

					}, delay);

				});

					/*q.removeClass('option');*/
				/*});*/

				/*q.on('mouseover',function(){
					q.removeClass('animated bounceIn');
				});
*/

			}


		}

}(angular));
