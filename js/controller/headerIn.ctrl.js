(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 8 */
    angular
        .module('module.controller.headerIn',[])
        .controller('headerInCtrl', headerInCtrl)
        .controller('headerInModal', headerInModal);


    headerInCtrl.$inject = [
        '$scope',
        '$log',
        'serviceStorage',
        '$state',
        '$rootScope',
        '$modal'
    ];

    function headerInCtrl($scope,$log,serviceStorage,$state,$rootScope,$modal) {

        $rootScope.header = serviceStorage.getData('trackedData');

        $scope.destroySession = function(){            
            serviceStorage.deleteData('trackedData');
            $state.go('login');
        };

        $rootScope.reloadHeader = function (data) {
            $rootScope.header.status = data.status;
            $rootScope.header.track = data.track;
        };

         $scope.openConfirmation = function (size) {

            var modalInstance = $modal.open({
              animation: true,
              templateUrl: 'logoffConfirmation.html',
              controller: 'headerInModal',
              size: size,
              keyboard: false,
              backdrop: 'static',
              resolve: {
                destroySession: function () {
                    return $scope.destroySession;
                }
              }
            });

            modalInstance.result.then(function () {

            }, function () {
            });
        };

    }

    function headerInModal($scope,$modalInstance,serviceLogin,destroySession) {

        $scope.close = function () {
            $modalInstance.close();
        };

        $scope.confirm = function () {
            $modalInstance.close();

            serviceLogin.logoff(function(){
                destroySession();
            }, function(error) {
                console.log(error);
            });
        };

    }

}(angular));