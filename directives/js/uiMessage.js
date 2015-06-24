//based on https://github.com/techfano/ng-components/

/*
Scope name "message is relative to define"
$scope.message={
	show: true/false,
	hideAuto: true/false,
	time: 5000 (integer) not optional, 5000 milisecond by default
}


*/
(function() {
	'use strict';
	/*jshint latedef: false */
	/*jshint validthis: true */
	angular
		.module('module.component.message',[])
		.directive('uiMessage', uiMessage);

		function uiMessage($timeout) {

			var directive = {
				scope: {
			        options: '='
			    },
				restrict: 'AE',
				templateUrl: 'template/uiMessage.html',
				transclude: true,
				link: link,
				controller: controller
			};

			return directive;

			function link($scope,element) {

				var q = angular.element(element);
				var a = angular.element(q[0].firstElementChild);


				$scope.timeHide =function(show){
					if(show){
						if(!$scope.options.time){
							$scope.options.time=5000;
						}
						$timeout(function(){
							a.removeClass('animated flipInX');
							a.addClass('animated flipOutX');
							$scope.options.show = false;
						},$scope.options.time);
					}
				};

				$scope.showMessage = function(show){
					if(show){
						a.removeClass('animated flipOutX');
						a.addClass('animated flipInX');
						$scope.options.hideAuto = false;
					}else{
						a.removeClass('animated flipInX');
						a.addClass('animated flipOutX');
					}
				};

				
			}

			function controller($scope) {

				$scope.$watch('options.hideAuto',function(newValue){
					$scope.timeHide(newValue);
				});

				$scope.$watch('options.show',function(newValue){
					$scope.showMessage(newValue);
				});
				
		        
		        $scope.typeAlert=function(type){
		          switch(type){
		            case 'success':
		            return 'alert-success';
		            case 'info':
		            return 'alert-info';
		            case 'warning':
		            return 'alert-warning';
		            case 'danger':
		            return 'alert-danger';
		          }
		        };

		        $scope.typeAlertHead=function(type){
		          switch(type){
		            case 'success':
		            return 'alert-success-head';
		            case 'info':
		            return 'alert-info-head';
		            case 'warning':
		            return 'alert-warning-head';
		            case 'danger':
		            return 'alert-danger-head';
		          }
		        };

		        $scope.typeAlertIcon=function(type){
		          switch(type){
		            case 'success':
		            return 'ci-success';
		            case 'info':
		            return 'ci-info';
		            case 'warning':
		            return 'ci-warning';
		            case 'danger':
		            return 'ci-error';
		          }
		        };
			}


		}

}(angular));