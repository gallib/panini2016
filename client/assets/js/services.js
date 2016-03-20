(function() {
    'use strict';

    var paniniServices = angular.module('paniniServices', ['ngResource']);

    paniniServices.factory('OwnerService', ['$resource', function($resource){
        return $resource('http://localhost:3005/owner', {}, {
            query: {
                method: 'GET'
            },
            create: {
                method: 'POST'
            }
        });
    }]);

    paniniServices.factory('CollectionService', ['$resource', function($resource){
        return $resource('http://localhost:3005/collection/:collectionId', {
            collectionId: '@collectionId'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);

    paniniServices.factory('StickerService', ['$resource', function($resource){
        return $resource('http://localhost:3005/team/:teamId/sticker/:stickerId', {
            teamId: '@teamId',
            stickerId: '@stickerId'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);

    paniniServices.factory('CategoryService', ['$resource', function($resource){
        return $resource('http://localhost:3005/category', {}, {
            query: {
                method: 'GET'
            }
        });
    }]);
})();
