(function() {
    'use strict';

    var paniniControllers = angular.module('paniniControllers', []);

    paniniControllers.controller('ViewController', ['$scope', '$routeParams', 'OwnerService', 'CategoryService',
        function($scope, $routeParams, OwnerService, CategoryService) {
            OwnerService.query({
                'public_id': $routeParams.publicId
            })
            .$promise.then(function(data) {
                $scope.owner = data.owner;

                CategoryService.get({}, function(data){
                    $scope.data = data.categories;
                });
            });
        }
    ]);

    paniniControllers.controller('ManageController', ['$scope', '$routeParams', '$location', 'OwnerService', 'CategoryService', 'CollectionService',
        function($scope, $routeParams, $location, OwnerService, CategoryService, CollectionService) {
            $scope.url = $location.absUrl();

            OwnerService.query({
                'private_id': $routeParams.privateId
            })
            .$promise.then(function(data) {
                $scope.owner = data.owner;
                $scope.publicUrl = $location.protocol() + "://" + $location.host() +
                    ($location.port() != 80 ? ":" + $location.port() : '') +'/w/' + data.owner.public_id;

                CategoryService.get({}, function(data){
                    $scope.data = data.categories;
                });
            });

            $scope.toggleGlued = function(collection) {
                collection.glued = !collection.glued;

                CollectionService.update({
                    collectionId: collection._id
                }, collection);
            };

            $scope.updateDuplicate = function(collection, increment) {
                if (collection.duplicate + increment >= 0) {
                    collection.duplicate += increment;

                    CollectionService.update({
                        collectionId: collection._id
                    }, collection);
                }
            };
        }
    ]);

    paniniControllers.controller('PaniniController', ['$scope', 'CategoryService', 'StickerService',
        function($scope, CategoryService, StickerService) {
            $scope.owner = {};

            CategoryService.get({}, function(data){
                $scope.data = data.categories;
            });

            $scope.toggleGlued = function(teamId, sticker) {
                sticker.glued = !sticker.glued;

                StickerService.update({
                    teamId: teamId,
                    stickerId: sticker._id
                }, sticker);
            };

            $scope.updateDuplicate = function(teamId, sticker, increment) {
                if (sticker.duplicate + increment >= 0) {
                    sticker.duplicate += increment;

                    StickerService.update({
                        teamId: teamId,
                        stickerId: sticker._id
                    }, sticker);
                }
            };
        }
    ]);

    paniniControllers.controller('SidebarController', ['$scope', '$location', 'OwnerService',
        function($scope, $location, OwnerService) {
            $scope.owner = {};

            $scope.createOwner = function(owner) {
                if ($scope.createowner.$valid) {
                    OwnerService
                        .create({
                            owner: owner.name
                        })
                        .$promise.then(function(data) {
                            $location.path('/m/' + data.owner.private_id);
                        });
                }
            };
        }
    ]);
})();