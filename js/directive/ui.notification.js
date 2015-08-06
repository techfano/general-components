(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 8 */
    /*jshint unused:false*/

    angular.module('module.component.notification',[])
            .directive('uiNotification', uiFocus);

    function uiFocus($rootScope,$timeout){

        var directive = {
            restrict: 'AE',
            templateUrl: 'template/uiNotification.html',
            link: link
        };

        return directive;

        function link (scope, element) {
            var e = angular.element(element);
            var a = angular.element(e[0].firstElementChild);
            
            scope.notify = false;

            $rootScope.$on('$notifyingSocketEvent',function(){
                scope.notify = true;
                a.removeClass('animated flipOutX');
                a.addClass('animated flipInY');
                $timeout(function(){
                    a.removeClass('animated flipInY');
                    a.addClass('animated flipOutX');
                },500);
            });

        }

    }

}(angular));