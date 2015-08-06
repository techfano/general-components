//based on https://github.com/techfano/ng-components/
(function() {
	'use strict';
	/*jshint latedef: false */
	/*jshint validthis: true */
	angular
		.module('module.component.loader',[])
		.directive('uiLoader', uiLoader)
		.directive('imgLoader', imgLoader);

		function uiLoader($rootScope) {

			var directive = {
				restrict: 'AE',
				templateUrl: 'template/uiLoader.html',
				transclude: true,
				link:link
			};

			return directive;

			function link($scope,element,$attr){
				
				var q = angular.element(element);
				var a = angular.element(q[0].firstElementChild);

				if($attr.dataTranslate){

					a.append('<span>'+$attr.dataTranslate+'</span>');
				}
				
				$scope.loader=false;		
				
				$rootScope.$on('$request', function(){
					$scope.loader=true;
					$rootScope.$emit('beforeLoaderEvent');
					a.removeClass('animated fadeOutUp');
					a.addClass('animated fadeIn');			
				});

				$rootScope.$on('$response', function(){
					a.removeClass('animated fadeIn');
					a.addClass('animated fadeOutUp',function(){
						$scope.loader=false;
					});
					$rootScope.$emit('afterLoaderEvent');
				});

				$rootScope.$on('$responseError', function(){
					a.removeClass('animated fadeIn');
					a.addClass('animated fadeOutUp',function(){
						$scope.loader=false;
					});		
				});

			}			

		}

		function imgLoader($rootScope){
		    return {
		      restrict: 'A',
		      scope: {
		        ngSrc: '@'
		      },
		      link: function(scope, element) {
		        element.on('load', function() {
		          element.addClass('animated fadeIn');
		        }).on('error', function() {
		          $rootScope.bannerLoading = false;
		        });
		        
		        scope.$watch('ngSrc', function() {
		          element.removeClass('animated fadeIn');
		        });
		      }
		    };
		}

}(angular));


