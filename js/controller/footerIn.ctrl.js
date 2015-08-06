(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 8 */
    angular
        .module('module.controller.footer',[])
        .controller('footerInCtrl', footerInCtrl);


    footerInCtrl.$inject = [
        '$scope',
        '$log',
        '$translate',
        'serviceStorage',
        '$rootScope'
    ];

    function footerInCtrl($scope,$log,$translate,serviceStorage,$rootScope) {

        $rootScope.footer = serviceStorage.getData('trackedData');

        $rootScope.reloadFooter = function (data) {
            $rootScope.footer.turnOut = data.turnOut;
        };

    }

}(angular));