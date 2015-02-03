define(['app'], function (app) {
    app.register.controller('demoCtrl',['$scope','promisesFactory','$routeParams', function ($scope,promisesFactory,param) {

    	var params={
    		appId : '12345'
    	}
    	console.log(param)

    }]);

});
