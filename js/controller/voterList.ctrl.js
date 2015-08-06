(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 15 */
    angular
        .module('module.controller.voterList',[])
        .controller('voterListCtrl', voterListCtrl);


    voterListCtrl.$inject = [
        '$scope',
        '$state',
        '$stateParams',
        'serviceResource',
        'serviceStorage',
        'serviceButtons',
        'serviceGeneral'
    ];

    function voterListCtrl($scope,$state,$stateParams,serviceResource,serviceStorage,serviceButtons,serviceGeneral) {
        
        var voterList = serviceResource.request('voterList');
        var reportVoters = serviceResource.request('reportVoters');

        $scope.buttons = serviceButtons;

        serviceGeneral.dbstatus({},function(data){
            $scope.isVotersEmpty = data.isVotersEmpty;
            $scope.buttons.voter.empty.disabled = data.isVotersEmpty;
        });


        var filters = {

            trackCode: serviceStorage.getData('trackedData').track.pollingCenterTrack,
            headerDefine: [
                           {obj:'nationalId'},
                           {obj:'name'},
                           {obj:'familyName'},
                           {obj:'voterNumber'},
                           {obj:'votingAttendance'},
                           {obj:'votingAttendanceTime'}
                          ],
            size: 10,
            offset: 0
        
        };

        if($stateParams.search){
            angular.merge(filters,$stateParams);
            $stateParams.search = null;
        }    

        var listVoters = function(filters, callback){
            
            voterList.get(filters,function(data){
                callback(data);
            });
      
        };

        $scope.tableData = {

            request: listVoters,
            parameters: filters

        };

        $scope.printVoters = function(){
            $scope.showMessage = true;
            reportVoters.get(filters,function(){
                $scope.showMessage = false;
            });
        };

    }


}(angular));