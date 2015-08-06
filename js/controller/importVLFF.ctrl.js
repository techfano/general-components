(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 11 */
    angular
        .module('module.controller.importVLFF',[])
        .controller('importVLFFCtrl', importVLFFCtrl)
        .controller('importVLFFModal', importVLFFModal);


    importVLFFCtrl.$inject = [
        '$log',
        '$scope',
        '$translate',
        '$modal',
        'serviceWebsocket',
        'serviceStorage',
        'serviceLogin'
    ];

    function importVLFFCtrl($log,
                            $scope,
                            $translate,
                            $modal,
                            serviceWebsocket,
                            serviceStorage,
                            serviceLogin) {

        $scope.isChecked = false;

        $scope.isLogged = false;

        $scope.isProcessing = false;

        $scope.isSuccessful = false;

        $scope.isNotSuccessful = false;

        $scope.isNotValid = false;

        $scope.fileName = '';

        $scope.fileToUpload = null;

        $scope.percent = 0;

        $scope.errorMessage = {
            show: false,
            hideAuto: true,
            time: 5000,
            type: 'danger'
        };

        $translate('importVLFF.error.login.wrongLogin').then(function (translatedValue) {
            $scope.errorMessage.message = translatedValue;
        });

        $scope.openConfirmation = function (size) {

            var modalInstance = $modal.open({
              animation: true,
              templateUrl: 'modalConfirmation.html',
              controller: 'importVLFFModal',
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
                clearCsvInput: function () {
                    return $scope.clearCsvInput;
                },
                isSuccessfulMessage: function () {
                    return $scope.isSuccessfulMessage;
                },
                getCsvFile: function () {
                    return $scope.getCsvFile;
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
                $scope.errorMessage.show = false;

            },function(){
                $scope.user={};
                $scope.focusName=true;
                $scope.isLogged = false;
                $scope.isUnsuccessfulLogged = true;
                $scope.errorMessage.show = true;
            });
        };

        $scope.showProgressBar = function () {
            $scope.isProcessing = true;
            $scope.percent = 0;
        };

        $scope.hideProgressBar = function () {
            $scope.isProcessing = false;
        };

        $scope.clearCsvInput = function () {
            $scope.fileToUpload = null;
            $scope.fileName = null;
            document.getElementById('fileVoters').value = null;
        };

        $scope.isSuccessfulMessage = function (flag) {
            if(flag) {
                $scope.isSuccessful = true;
                $scope.isNotSuccessful = false;
                $scope.isNotValid = false;   
            }else {
                $scope.isSuccessful = false;
                $scope.isNotSuccessful = true;
                $scope.isNotValid = false;
            }
        };

        $scope.getCsvFile = function () {
            return $scope.fileToUpload;
        };

        $scope.hideErrorMessages = function () {
            $scope.isNotSuccessful = false;
            $scope.isNotValid = false;
        };

        var checkStatus = function() {
            var numberOfCheckedVoters = parseInt(serviceStorage.getData('trackedData').status.noOfCheckedInVoters);

            if(numberOfCheckedVoters > 0) {
                $scope.isChecked = true;
            }else{
                $scope.isChecked = false;
            }
        };

        var updateProgressBar = function(data) {
            $scope.percent = data.data;
        };

        checkStatus();
        serviceWebsocket.initialize(updateProgressBar);
    }

    function importVLFFModal($scope,$modalInstance,serviceVoter,showProgressBar,hideProgressBar,
        clearCsvInput,isSuccessfulMessage,getCsvFile,serviceStorage,$rootScope,serviceButtons) {

        $scope.close = function () {
            hideProgressBar();
            clearCsvInput();
            $modalInstance.close();
        };

        $scope.confirm = function () {
            $modalInstance.close();
            showProgressBar();

            serviceVoter.import(getCsvFile(), function(data){
                isSuccessfulMessage(true);
                hideProgressBar();
                serviceStorage.setData('trackedData',data);
                serviceButtons.voter.empty.disabled=false;
                $rootScope.reloadHeader(data);
            }, function(error) {
                hideProgressBar();
                clearCsvInput();
                isSuccessfulMessage(false);
                console.log(error);
            });
        };

    }

}(angular));