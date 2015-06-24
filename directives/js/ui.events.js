(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 8 */

    angular.module('module.component.events',[])
            .directive('uiCancelFire', uiCancelFire)
            .directive('uiCancelInput', uiCancelInput);

    function uiCancelFire($rootScope){

        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

         function link (scope, element) {

            var e = angular.element(element);
                
            e.on('click',function(){
                $rootScope.$emit('$cancelFired');
            });
           
        }

    }

    function uiCancelInput($rootScope){

        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link (scope, element) {
            
            $rootScope.$on('$cancelFired',function(){   
                element[0].focus();     
                angular.element(element).val(''); 
            });
            
        }

    }

}(angular));