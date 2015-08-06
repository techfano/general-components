(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 10 */
    angular
        .module('module.controller.importVLFS',[])
        .controller('importVLFSCtrl', importVLFSCtrl)
        .controller('importVLFSModal', importVLFSModal);


    importVLFSCtrl.$inject = [
        '$log',
        '$scope',
        '$translate',
        '$modal',
        'serviceWebsocket',
        'serviceStorage',
        'serviceLogin'
    ];

    function importVLFSCtrl($log,$scope,$translate,$modal,serviceWebsocket,serviceStorage,serviceLogin) {

        $scope.isChecked = false;

        $scope.isLogged = false;

        $scope.isProcessing = false;

        $scope.isSuccessful = false;

        $scope.isNotSuccessful = false;

        $scope.percent = 0;


        $scope.openConfirmation = function (size) {

            var modalInstance = $modal.open({
              animation: true,
              templateUrl: 'modalConfirmation.html',
              controller: 'importVLFSModal',
              size: size,
              keyboard: false,
              backdrop: 'static',
              resolve: {
                showProgressBar: function () {
                    return $scope.showProgressBar;
                },
                hideProgressBar: function () {
                    return $scope.hideProgressBar;
                },
                clearLoginForm: function () {
                    return $scope.clearLoginForm;
                },
                isSuccessfulMessage: function () {
                    return $scope.isSuccessfulMessage;
                }
              }
            });

            modalInstance.result.then(function () {

            }, function () {
            });
        };


        $scope.changeLanguage = function(lang){

            $translate.use(lang);

        };

        $scope.getLogin = function(user) {
            user.lang = $translate.storage().get();

            serviceLogin.validationLogin(user,function(){

                $scope.isLogged = true;
                $scope.openConfirmation();

            },function(){
                $scope.clearLoginForm();
            });
        };

        $scope.showProgressBar = function () {
            $scope.isProcessing = true;
            $scope.percent = 0;
        };

        $scope.hideProgressBar = function () {
            $scope.isProcessing = false;
        };

        $scope.clearLoginForm = function () {
            $scope.user={};
            $scope.focusName=true;
            $scope.isLogged = false;
        };

        $scope.isSuccessfulMessage = function (flag) {
            if(flag) {
                $scope.isSuccessful = true;
                $scope.isNotSuccessful = false;    
            }else {
                $scope.isSuccessful = false;
                $scope.isNotSuccessful = true;    
            }
            
        };

        var checkStatus = function() {
            var numberOfCheckedVoters = parseInt(serviceStorage.getData('trackedData').status.noOfCheckedInVoters);

            if(numberOfCheckedVoters > 0) {
                $scope.isChecked = true;
            }else{
                $scope.isChecked = false;
            }
        };

        var updateProgressBar = function(payload) {
            $scope.percent = payload.data;
        };

        checkStatus();
        serviceWebsocket.initialize(updateProgressBar);

    }

    function importVLFSModal($scope,$modalInstance,serviceVoter,showProgressBar,hideProgressBar,
        clearLoginForm,isSuccessfulMessage,serviceStorage,$rootScope,serviceButtons) {

        $scope.close = function () {
            $modalInstance.close();
            clearLoginForm();
        };

        $scope.confirm = function () {
            $modalInstance.close();
            showProgressBar();
            serviceVoter.importFromServer(function(data){
                isSuccessfulMessage(true);
                hideProgressBar();
                serviceStorage.setData('trackedData',data);
                $rootScope.reloadHeader(data);
                serviceButtons.voter.empty.disabled=false;
            }, function(error) {
                hideProgressBar();
                isSuccessfulMessage(false);
                console.log(error);
            });
        };

    }

}(angular));