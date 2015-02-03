'use strict';

define(['app'], function (app) {

    app.factory('resourceFactory',function($resource){
        return {	
            get:function(request,params){
                return $resource(config.restUrl+request, params,
                    {'get' : { method: 'GET', isArray : false, headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }  }
                });
            }, 

            post:function(params){
                return $resource(config.restUrl+'obtain/table/post', params,{
                    'save': { method:'POST' }
                });
            } 
        }
    });

});
