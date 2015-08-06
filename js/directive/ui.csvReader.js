(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 8 */
    /*jshint unused:false*/

    angular.module('module.component.uiCsvReader',[])
            .directive('uiCsvReader', uiCsvReader);

    function uiCsvReader($rootScope,$parse){

        var directive = {
            restrict: 'A',
            link:link
        };

        return directive;

        function link(scope,element,attrs){
            var model = $parse(attrs.uiCsvReader);
            var modelSetter = model.assign;
            var modelName = $parse(attrs.uiCsvName);
            var modelNameSetter = modelName.assign;
            
            element.bind('change', function(){
                scope.hideErrorMessages();
                scope.$apply(function(){
                    var csvExtensions = ['text/comma-separated-values','text/csv','application/csv',
                    'application/excel','application/vnd.ms-excel','application/vnd.msexcel','text/anytext'];

                    var fileType = element[0].files[0].type;

                    var isValid = false;

                    if(fileType === '') {
                        var nameParts = element[0].files[0].name.split('.');

                        if(nameParts.length === 1 || (nameParts[0] === '' && nameParts.length === 2) ) {
                            fileType = undefined;
                        }else {
                            fileType = nameParts.pop();
                        }

                        if(fileType.indexOf('csv') > -1){
                            isValid = true;
                        }
                    }else {
                        if(csvExtensions.indexOf(fileType) > -1){
                            isValid = true;
                        }
                    }

                    if(isValid){
                        modelSetter(scope, element[0].files[0]);
                        modelNameSetter(scope, element[0].files[0].name); 
                        scope.openConfirmation();
                    }else{
                        element[0].value = null;
                        modelSetter(scope, null);
                        modelNameSetter(scope, null);
                        scope.isNotValid = true;
                    }
                });
            });

        }

    }

}(angular));