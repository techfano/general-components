(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 8 */

    angular.module('module.service.resource',[])
    .service('serviceResource', serviceResource);

    serviceResource.$inject = [
      '$resource',
      'constantResource'
    ];
   
    function serviceResource($resource,config) {

           
      this.request = function (url){
        
        config.url[url].settings = config.url[url].settings || { paramDefaults: {}, actions: {}, options:{} };

        return $resource(config.url[url].path,
                         config.url[url].settings.paramDefaults,
                         config.url[url].settings.actions,
                         config.url[url].settings.options);

      };

    }

}(angular));