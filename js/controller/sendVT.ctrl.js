(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 8 */
    angular
        .module('module.controller.sendVT',[])
        .controller('sendVTCtrl', sendVTCtrl);


    sendVTCtrl.$inject = [
        '$log',
        '$scope',
        '$translate',
        'serviceVoter',
        'serviceStorage',
        '$rootScope'
    ];

    function sendVTCtrl($log,$scope,$translate,serviceVoter,serviceStorage,$rootScope) {

        $scope.isSuccessful = false;

        $scope.isNotSuccessful = false;

        $scope.changeLanguage = function(lang){

            $translate.use(lang);

        };

        $scope.send = function () {
            
            angular.element(document).ready(function () {
                serviceVoter.sendVoterTurnout(function (data) {
                    $scope.isSuccessful = true;
                    serviceStorage.setData('trackedData',data);
                    $rootScope.reloadFooter(data);
                    $rootScope.reloadHeader(data);
                }, function (error) {
                    console.log(error);
                    $scope.isNotSuccessful = true;
                });
            });
            
        };

        $scope.send();

    }

}(angular));