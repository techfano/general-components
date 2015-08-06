(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 10 */
    angular
        .module('module.controller.aside',[])
        .controller('asideCtrl', asideCtrl);


    asideCtrl.$inject = [
        '$scope',
        '$state',
        '$stateParams',
        '$translate',
        'serviceStorage',
        'serviceVoter',
        'serviceResource',
        'serviceButtons',
        'serviceGeneral',
    ];

    function asideCtrl($scope,
                        $state,
                        $stateParams,
                        $translate,
                        serviceStorage,
                        serviceVoter,
                        serviceResource,
                        serviceButtons,
                        serviceGeneral) {

        $scope.buttons = serviceButtons;

        serviceGeneral.dbstatus({},function(data){
            $scope.buttons.voter.empty.disabled = data.isVotersEmpty;
        });

        $scope.state = $state;

        var trackStatus = serviceStorage.getData('trackedData').track.status;
        if(trackStatus==='EXPORTED'){
           serviceButtons.voter.checkIng.disabled=true;
        }

        var noOfCheckedInVoters = parseInt(serviceStorage.getData('trackedData').status.noOfCheckedInVoters);
        if(noOfCheckedInVoters === 0){
            serviceButtons.voter.send.disabled = true;
            serviceButtons.voter.export.disabled = true;
            serviceButtons.voter.importFile.disabled = false;
            serviceButtons.voter.importServer.disabled = false;
        }else{
            serviceButtons.voter.send.disabled = false;
            serviceButtons.voter.export.disabled = false;
            serviceButtons.voter.importFile.disabled = true;
            serviceButtons.voter.importServer.disabled = true;
        }

        if(trackStatus==='EXPORTED'){
            serviceButtons.voter.send.disabled=true;
        }

        if($state.is('voterList')){
            $scope.query={
                trackCode:serviceStorage.getData('trackedData').track.pollingCenterTrack
            };
        }

        $scope.changeLanguage = function(lang){

            serviceVoter.language({language:lang},function(data){

                $translate.use(lang);
                serviceStorage.setData('trackedData',data);

                $state.reload('bodyIn.layout');


            });

        };

        $scope.isCollapsed = true;


        $scope.setAdvance=function(){
            $scope.advanceSearch=true;
        };

        $scope.refreshSearch=function(){
            $scope.query={
                nationalId: null,
                name: null,
                familyName: null,
                search: null,
                trackCode: serviceStorage.getData('trackedData').track.pollingCenterTrack,
                votingAttendance: ''
            };
            $scope.searchBoxFocus = true;
        };

        $scope.setFocus =  function(){
            $scope.searchBoxFocus = true;
            $scope.advanceSearch=false;
            $scope.isCollapsed = true;
            $scope.refreshSearch();
        };
        $scope.search=function(query){

            query.trackCode = serviceStorage.getData('trackedData').track.pollingCenterTrack;

            $scope.searchBoxFocus = true;

            if($state.is('checkIn')){
                query.search = true;
                $state.go('checkIn',query);
                $scope.query.nationalId = '';
            }

            if($state.is('voterList')){
                query.search = true;
                $state.go('voterList',query);
                $scope.query.nationalId = '';
            }

       };

    }

}(angular));