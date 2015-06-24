(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 8 */

    angular.module('module.component.keyStokes',[])
    .constant('validConfig', {
        'numbers' : /[^0-9]/g
    })
    .directive('uiKeyValid', uiKeyValid)
    .directive('noEnter', noEnter);

    function uiKeyValid(validConfig){

        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        var transformedInput = text.replace(validConfig['numbers'], '');

                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return undefined;
                }            
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    }

    function noEnter(){
        return {
            link: function (scope, element) {

                var e =angular.element(element);
                
                e.on('keypress',function(event){
                     if (event.which === 13){
                         event.preventDefault();
                    }
                });
            }
        };
    }

}(angular));