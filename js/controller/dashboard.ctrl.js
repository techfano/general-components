(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 8 */
    angular
        .module('module.controller.dashboard',[])
        .controller('dashboardCtrl', dashboardCtrl);


    dashboardCtrl.$inject = [
        '$scope',
        '$state',
        'serviceStorage'
    ];

    function dashboardCtrl($scope,$state,serviceStorage) {

        $scope.vmlStateGo= function(){

            var trackStatus = serviceStorage.getData('trackedData').track.status;
            if(trackStatus==='EXPORTED'){
                
                $state.go('voterList');
            }else{
                $state.go('checkIn');
            }

       };

    }

}(angular));