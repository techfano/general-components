(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 10 */
    angular
        .module('module.controller.sendFinalVT',[])
        .controller('sendFinalVTCtrl', sendFinalVTCtrl)
        .controller('sendFinalVTModal', sendFinalVTModal);


    sendFinalVTCtrl.$inject = [
        '$log',
        '$scope',
        '$translate',
        '$modal',
        'serviceButtons',
        '$rootScope'
    ];

    function sendFinalVTCtrl($log,$scope,$translate,$modal,serviceButtons) {

            $scope.buttons = serviceButtons;

            $scope.message={
                show: false,
                hideAuto:false,
                type:'success'
            };

            $scope.open = function (size) {

                var modalInstance = $modal.open({
                  animation: true,
                  templateUrl: 'myModalContent.html',
                  controller: 'sendFinalVTModal',
                  size: size,
                  resolve: {
                    message: function () {
                        return $scope.message;
                    },
                    buttons:function(){
                        return $scope.buttons;
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



    }

    function sendFinalVTModal($scope, 
                            $modalInstance,
                            serviceVoter,
                            serviceStorage,
                            buttons,
                            message,
                            $translate,
                            $timeout,
                            serviceButtons,
                            $rootScope) {

        var filter = {
            trackCode:serviceStorage.getData('trackedData').track.pollingCenterTrack
        };

        

        $scope.close = function () {
            $modalInstance.close();
        };

        $scope.sendFinal = function(){
            $modalInstance.close();
            
            buttons.voter.final.show=true;
            buttons.voter.final.disabled=true;
            serviceVoter.sendFinalVoter(filter,function(data){
                $timeout(function(){    
                    $translate('sendFinalVT.message.success').then(function (translatedValue) {
                        message.message = translatedValue;
                    });
                    buttons.voter.final.show=false;
                    buttons.voter.final.disabled=false;
                    serviceStorage.setData('trackedData',data.dto);
                    serviceButtons.voter.checkIng.disabled=true;
                    serviceButtons.voter.send.disabled=true;
                    message.show=true;
                    message.hideAuto=true;
                    message.time=4000;
                    $rootScope.reloadFooter(data.dto);
                    $rootScope.reloadHeader(data.dto);

                },5000);
            });
        };

    }

}(angular));