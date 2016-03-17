(function() {
    'use strict';

    var paniniControllers = angular.module('paniniControllers', []);

    paniniControllers.controller('PaniniController', ['$scope', 'TeamListService', 'StickerService',
        function($scope, TeamListService, StickerService) {
            TeamListService.get({}, function(data){
                $scope.data = data.data;
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
})();