(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 8 */
    angular
        .module('module.controller.header',[])
        .controller('headerCtrl', headerCtrl);


    headerCtrl.$inject = [
        '$scope',
        '$translate'
    ];

    function headerCtrl($scope,$translate) {

       $scope.changeLanguage = function(lang){

            $translate.use(lang);

       };

    }

}(angular));