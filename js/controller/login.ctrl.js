(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 8 */
    angular
        .module('module.controller.login',[])
        .controller('loginCtrl', loginCtrl);


    loginCtrl.$inject = [
        '$scope',
        '$log',
        '$state',
        'serviceLogin',
        'serviceStorage',
        '$translate'
        
    ];

    function loginCtrl($scope,$log,$state,serviceLogin,serviceStorage,$translate) {
       
       $scope.focusName=false;
       
       $scope.getLogin= function(user){

            user.lang = $translate.storage().get();

            serviceLogin.login(user,function(data){

                serviceStorage.setData('trackedData',data);

                $state.go('dashboard');
            
            },function(){
                $scope.user={};
                $scope.focusName=true;
            });

       };

       $scope.reset=function(){
        $scope.user={};
        $scope.focusName=true;
       };

    }

}(angular));