(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 8 */
    angular
        .module('module.controller.exportFinalVT',[])
        .controller('exportFinalVTCtrl', exportFinalVTCtrl)
        .controller('exportFinalVTModal', exportFinalVTModal);


    exportFinalVTCtrl.$inject = [
        '$log',
        '$scope',
        '$translate',
        '$modal',
        'serviceResource',
        'serviceStorage',
        'serviceButtons',
        '$rootScope'
    ];

    function exportFinalVTCtrl($log,$scope,$translate,$modal) {


        $scope.isNotSuccessful=false;
        $scope.isSuccessful=false;
        $scope.exportPath='';


        $scope.setCallbackMessages = function (status,path) {
            if(status){
                $scope.isNotSuccessful=false;
                $scope.isSuccessful=true;
                $scope.exportPath = path;
            }else{
                $scope.isNotSuccessful=true;
                $scope.isSuccessful=false;
            }
        };

        $scope.open = function (size) {

            var modalInstance = $modal.open({
              animation: true,
              templateUrl: 'myModalContent.html',
              controller: 'exportFinalVTModal',
              size: size,
              resolve: {
                setCallbackResolve: function () {
                  /*return $scope.voter;*/
                  return $scope.setCallbackMessages;
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

    function exportFinalVTModal(
        $scope, 
        $modalInstance, 
        serviceResource, 
        serviceStorage, 
        setCallbackResolve, 
        serviceButtons,
        $rootScope) {

        $scope.export = function () {

            var trackedData = serviceStorage.getData('trackedData'); 
            var filters = {trackCode: trackedData.track.pollingCenterTrack };       

            serviceResource.request('exportResource').get(
                filters,

                function(data){
                    
                    serviceButtons.voter.checkIng.disabled = true;
                    serviceButtons.voter.send.disabled=true;

                    setCallbackResolve(true,data.xmlTurnoutReportDir);

                    serviceStorage.setData('trackedData',data.dto);
                    $rootScope.reloadFooter(data.dto);
                    $rootScope.reloadHeader(data.dto);

                    $modalInstance.close();
                    
               },
               
               function(){
                    setCallbackResolve(false);
                    $modalInstance.close();
               }
            );

            //console.log('hola don pepito, hola don jose'+trackedData);
        };

        $scope.close = function () {
            $modalInstance.close();
        };

    }

}(angular));