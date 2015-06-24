(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 8 */

    angular.module('module.component.focus',[])
            .directive('uiFocus', uiFocus);

    function uiFocus(){

        var directive = {
            restrict: 'A',
            scope:{
                loopFocus:'=',
                modelFocus:'='
            },
            link: link
        };

        return directive;

        function link (scope, element, attrs) {

            
            scope.$watch('modelFocus', function() {
                if (scope.modelFocus) { element[0].focus(); scope.modelFocus=false;}
            });

            scope.$watch(attrs.uiFocus, function(newValue) {
                if (newValue) { element[0].focus(); scope.modelFocus=false;}
            });

            element.bind('blur', function() {       
                if(scope.loopFocus){
                    element[0].focus();
                }
            });
        }

    }

}(angular));