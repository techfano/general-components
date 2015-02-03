define(['angularAMD', 'angular-route','angular-resource'], function (angularAMD) {
  
  var app = angular.module("webapp", ['ngRoute','ngResource']);

  app.config(function ($routeProvider) {

    $routeProvider
    .when("/uiValidator", angularAMD.route({
        templateUrl: 'views/uiValidator.html',
        controller: 'uiValidatorCtrl',
        controllerUrl: 'controller/uiValidator'
    }))
    
    .otherwise({redirectTo: "/uiValidator"});
    
  });


  angularAMD.bootstrap(app);

  return app;
});