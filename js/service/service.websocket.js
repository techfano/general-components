(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 8 */
    angular
    .module('module.service.websocket',[])
    .factory('websocket', function (socketFactory) {
        return socketFactory({
            url: 'http://localhost:8080/vlm/handler'
        });
    })
    .service('serviceWebsocket', serviceWebsocket);

    serviceWebsocket.$inject = ['websocket'];

    function serviceWebsocket(websocket) {

        this.isOpened = false;

        this.initialize = function(fnOnMessage) {
            websocket.setHandler('open', function() {
                console.log('INFO:', 'The connection is opened');
            });
            websocket.setHandler('close', function(event) {
                console.log('INFO:', 'The connection is closed');
                console.log('ERROR:', event.reason);
            });
            websocket.setHandler('message', function(data){
                fnOnMessage(data);
            });
        };

        this.sendMessage = function(message) {
            websocket.send(message);
        };

        this.closeConnection = function() {
            websocket.close();
        };

    }

}(angular));