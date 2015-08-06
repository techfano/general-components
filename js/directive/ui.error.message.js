//based on https://github.com/techfano/ng-components/
(function() {
	'use strict';
	/*jshint latedef: false */
	/*jshint validthis: true */
	angular
		.module('module.component.errorMessage',[])
		.directive('uiErrorMessage', uiErrorMessage);

		function uiErrorMessage($rootScope,$timeout) {

			var directive = {
				restrict: 'AE',
				templateUrl: 'template/uiErrorMessage.html',
				scope:{
					message:'@message',
				},
				transclude: true,
				link: link,
				controller: controller
			};

			return directive;

			function controller($scope) {

				$scope.options={
					show:false,
					hide:{auto:false,time:0},
					type:'danger'
				};

				$scope.closeAlert=function(){
		          $scope.showAlert=false;
		          $scope.options.show=false;
		          $scope.options.hide.auto=false;
		          $scope.options.hide.time=0;
		        };
		        $scope.timeAlert=function(object){
		          var auto=object.hide.auto;
		          var time=object.hide.time;
		          if(time===undefined){
		            time=5000;
		          }
		          if(auto){
		            $timeout($scope.closeAlert, time);
		          }
		        };
		        $scope.closeButton=function(click){
		          if(click){
		            $scope.showCloseButton=true;
		          }else{
		            $scope.showCloseButton=false;
		          }
		        };
		        $scope.showAlertMessage=function(value){
		          $scope.showAlert=value;
		          if($scope.options.show){
		            $scope.options.show=value;
		          }
		        };
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
			}

			function link($scope,element) {

				var q = angular.element(element);
				var a = angular.element(q[0].firstElementChild);
				
				$rootScope.$on('$responseError',function(event,data){

					$scope.options.show = true;
					if(data.status===500){
						
							$scope.message = data.statusText;
						
					}else{
						//if(!$scope.message){
							$scope.message = data.statusText;
							if(data.data.errors){

								$scope.message = data.data.errors[0].code;
							}
						//}
					}

					a.removeClass('animated flipOutX');
					a.addClass('animated flipInX');

					$timeout(function(){
						a.removeClass('animated flipInX');
						a.addClass('animated flipOutX');
					},5000);

				});

				if($scope.options){
		          $scope.message=$scope.message;
		          $scope.$watch('options.type',function() {
		            $scope.type=$scope.options.type;
		          });
		          $scope.$watch('message',function() {
		            $scope.newmessage=$scope.message;
		          });
		          $scope.showAlert=true;
		          $scope.showCloseButton=true;
		          
		          if($scope.options.hide){
		           
		            $scope.timeAlert($scope.options);
		            
		            $scope.$watch('options.hide.auto',function() {
		              $scope.timeAlert($scope.options);
		            });
		            
		            $scope.$watch('options.hide.time',function() {
		              $scope.timeAlert($scope.options);
		            });
		          
		            $scope.$watch('options.hide.click',function() {
		              $scope.closeButton($scope.options.hide.click);
		            });
		            
		          }
		          
		          $scope.$watch('options.show',function() {
		            switch($scope.options.show){
		              case true:
		                $scope.showAlertMessage(true);
		              break;
		              case false:
		                $scope.showAlertMessage(false);
		              break;
		            }
		          });
		        }
			}

			


		}

}(angular));