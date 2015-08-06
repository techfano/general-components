(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 15 */
    angular
        .module('module.controller.voterSearch',[])
        .controller('voterSearchCtrl', voterSearchCtrl)
        .controller('voterSearchModal', voterSearchModal);


    voterSearchCtrl.$inject = [
        '$scope',
        '$state',
        '$stateParams',
        '$translate',
        'serviceVoter',
        'serviceResource',
        '$modal',
        'serviceButtons',
        'serviceStorage',
    ];

    function voterSearchCtrl(
        $scope,
        $state,
        $stateParams,
        $translate,
        serviceVoter,
        serviceResource,
        $modal,
        serviceButtons) {

        
        var dbstatus = serviceResource.request('dbstatus');

        dbstatus.get(function(data){
            $scope.isVotersEmpty = data.isVotersEmpty;
        });

        var searchVoter =function(){

            serviceVoter.search($stateParams,function(data){

                $scope.voter = data;                

                switch($scope.voter.votingAttendance){
                    case 'CHECKED_IN':
                        $scope.buttonCheckingDisabled = true;
                        break;
                    default:
                        $scope.buttonCheckingDisabled = false;
                }

            });

        };


        if($stateParams.search){
            searchVoter();
            
            $scope.buttonCheckingShow = true;

            $scope.open = function (size) {

                var modalInstance = $modal.open({
                  animation: true,
                  templateUrl: 'myModalContent.html',
                  controller: 'voterSearchModal',
                  size: size,
                  resolve: {
                    voter: function () {
                      return $scope.voter;
                    }
                  }
                });

                modalInstance.result.then(function () {

                  $scope.buttons = serviceButtons;
                  searchVoter();
                
                }, function () {                
                });
            };

            $stateParams.search = null;
        
        }
        
        $scope.changeLanguage = function(lang){

            $translate.use(lang);

        };

        $scope.cancel = function(){

            $scope.voter = {};

            var query = {
                nationalId: null,
                trackCode: null,
                search: null
            };

            $state.go('checkIn',query);

        };

    }

    function voterSearchModal($scope, $modalInstance, voter, serviceVoter, serviceButtons, serviceStorage,$rootScope) {

        $scope.voter =  voter;

        var noOfCheckedInVoters = parseInt(serviceStorage.getData('trackedData').status.noOfCheckedInVoters);
        if(noOfCheckedInVoters === 0){
            $scope.msjQuestion =  'voterSearch.modal.checkIn.listNoAvailable.question';
            $scope.msjDescription =  'voterSearch.modal.checkIn.listNoAvailable.description';
        }else{
            $scope.msjQuestion =  'voterSearch.modal.checkIn.sureToCheckIn.question';
            $scope.msjDescription =  'voterSearch.modal.checkIn.sureToCheckIn.description';
        }        

        $scope.close = function () {
            $modalInstance.close();
        };

        $scope.getCheckIn = function(){

           serviceVoter.checkIn(
                {nationalId : $scope.voter.nationalId },

                function(data){
                    serviceStorage.setData('trackedData',data);
                    serviceButtons.voter.send.disabled = false;
                    serviceButtons.voter.export.disabled = false;

                    serviceButtons.voter.importFile.disabled = true;
                    serviceButtons.voter.importServer.disabled = true;

                    $modalInstance.close();                    
                    $rootScope.reloadHeader(data);
               },
               
               function(){
                    $modalInstance.close();
               }
           );

        };

    }

}(angular));