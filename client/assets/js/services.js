(function() {
    'use strict';

    var paniniServices = angular.module('paniniServices', ['ngResource']);

    paniniServices.factory('StickerService', ['$resource', '$http', function($resource, $http){
        return $resource('http://localhost:3005/team/:teamId/sticker/:stickerId', {
            teamId: '@teamId',
            stickerId: '@stickerId'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);

    paniniServices.factory('TeamListService', ['$resource', function($resource){
        return $resource('http://localhost:3005/team', {}, {
            query: {
                method: 'GET'
            }
        });
    }]);
})();
