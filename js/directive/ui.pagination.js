//based on https://github.com/techfano/ng-components/
(function() {
	'use strict';
	/*jshint latedef: false */
	/*jshint validthis: true */
	angular
		.module('module.component.pagination',[])
		.directive('uiPagination', uiPagination);

		function uiPagination() {

			var directive = {
				scope: {
			        totalRows: '=',
			        rowsbyPage: '='
			    },
				restrict: 'AE',
				templateUrl: 'template/uiPagination.html',
				transclude: true,
				controller: controller
			};

			return directive;

			function controller($scope,$rootScope) {

				$scope.parameters={
					pagesDisplay: 5,
					offset: 0
				};

				$rootScope.$on('$tableLoadSuccess',function(event,parameters){
					numberPages(parameters);
                    console.log('table success');
                    $rootScope.$$listeners.$tableLoadSuccess=[];
				});

				var first = 0;
		    	var last = $scope.parameters.pagesDisplay;
		    	var middle = Math.ceil($scope.parameters.pagesDisplay/2);
				var limit = 0;


		    	var validPages = function(page){

					limit = $scope.parameters.totalPages-$scope.parameters.pagesDisplay;
		    		

		    		if(page>=$scope.parameters.pagesDisplay-1 && page<=limit){
		    			
		    				first = page-middle+1;
			    			last = page+middle;						

					}else if(page<$scope.parameters.pagesDisplay-1){
						first = 0;
						last = $scope.parameters.pagesDisplay;
					}else if(page>$scope.parameters.totalPages || page >=limit){
						first = limit;
						last = $scope.parameters.totalPages;
					}
		    		
		    		$scope.parameters.offset = page;
					sendEvent();
		    	};

				$scope.getPage=function(page){									
					
					validPages(page);					
					
				};


				$scope.nextPage = function(){

					if($scope.parameters.offset<$scope.parameters.totalPages-1){
						
						$scope.parameters.offset=$scope.parameters.offset+1;

						if($scope.parameters.offset>$scope.parameters.totalPages){
							$scope.parameters.offset=$scope.parameters.totalPages-1;
						}
						if($scope.parameters.offset>$scope.parameters.pagesDisplay-1){
							first = first + 1;
							last = last + 1;

							if(last>$scope.parameters.totalPages){
								first = $scope.parameters.totalPages-$scope.parameters.pagesDisplay;
								last=$scope.parameters.totalPages;
							}							
						}

					}
					
					validPages($scope.parameters.offset);
					
				};

				$scope.previousPage = function(){

					if($scope.parameters.offset>0){
						$scope.parameters.offset=$scope.parameters.offset-1;
						sendEvent();							
					}else if($scope.parameters.offset<0){
						$scope.parameters.offset=0;	
					}

					/*if(first>0){
						first=first-1;
						last=last-1;
					}*/

					validPages($scope.parameters.offset);
					
				};

				$scope.lastPage=function(){
					first = $scope.parameters.totalPages-$scope.parameters.pagesDisplay;
					last = $scope.parameters.totalPages;
					if(last<$scope.parameters.pagesDisplay){
						first=0;
					}
					$scope.parameters.offset = $scope.parameters.totalPages-1;
					validPages($scope.parameters.offset);
				};

				$scope.firstPage=function(){
					first = 0;
					last = $scope.parameters.pagesDisplay;
					$scope.parameters.offset = 0;
					validPages($scope.parameters.offset);
				};
				
				var numberPages = function(parameters){
					$scope.parameters.totalPages = Math.ceil(parameters.count/parameters.size);
				};

				var sendEvent=function(){
					$rootScope.$broadcast('$paginationEvent',$scope.parameters);
				};

				

				$scope.nTimes=function(n){		
					if(!isNaN(n)&&n!==undefined){
						
				    	var list = [];

				    	if($scope.parameters.totalPages<$scope.parameters.pagesDisplay){
				    		last = $scope.parameters.totalPages;
				    	}

				    	for (var i = first; i<=last-1; i++) {
				    		list.push(i);	
				    	}
				    	
				    	return list;

					}
				};
			
			}


		}

}(angular));