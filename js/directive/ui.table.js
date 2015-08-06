(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 8 */

    angular.module('module.component.table',[])
            .directive('uiTable', uiTable);

    function uiTable($rootScope,$sce){

        var directive = {
            restrict: 'AE',
            scope:{
                tableModel: '=',
                tableRequest: '='
            },
            templateUrl: 'template/uiTable.html',
            link: link,
            controller: controller
        };

        return directive;

        function link () {
           
        }

        function controller($scope){

            $scope.trustHtml = function(data){
                return $sce.trustAsHtml(data);
            };

            var getTable = function(parameters){

                if($scope.tableRequest.request){

                    $scope.tableRequest.request(parameters,function(data){
                        $scope.tableModel = data.entities;

                        if(parameters.headerDefine){
                            $scope.tableModel = queryTable(data.entities,parameters.headerDefine);
                        }
                        
                        angular.extend(parameters,data.pagination);
                        $rootScope.$emit('$tableLoadSuccess',parameters);
                    });

                }

            
            };

            getTable($scope.tableRequest.parameters);
            $rootScope.$$listeners.$paginationEvent=[];


            $rootScope.$on('$paginationEvent',function(event,parameters){
                $scope.parameters = parameters;
                getTable(angular.merge($scope.tableRequest.parameters,parameters));
            });

            var queryTable = function(tableModel,headerDefine){

                var ids=[];

                var lista = [];
                                
                angular.forEach(headerDefine, function(value,key){
                        ids[key]=value.obj;
                });

                angular.forEach(tableModel,function(value){
                
                    var v='{';
                  
                    for (var i=0; i < ids.length; i++) {
                        if(i===ids.length-1){
                            v+='"'+ids[i]+'":"'+sanitizeParsing(value[ids[i]])+'"';
                        }else{
                            v+='"'+ids[i]+'":"'+sanitizeParsing(value[ids[i]])+'",';
                        }
                    }
                  
                    v+='}';
                  
                    lista.push(angular.fromJson(v));
                
                });
                return lista;

                
            };

            var xscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
            var cuote = /'/g;
            var dcuote = /"/g;

            function sanitizeParsing(str) {
                return str.toString().replace(dcuote, '\\"').replace(cuote, '\&#39').replace(xscript,'');
            }

        }

    }

}(angular));