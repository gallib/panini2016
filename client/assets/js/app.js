(function() {
    'use strict';

    var paniniApp = angular.module('paniniApp', [
        'ngRoute',
        'paniniControllers',
        'paniniServices'
    ]);

    paniniApp.config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: './templates/index.html',
                    controller: 'PaniniController'
                })
                .when('/m/:privateId', {
                    templateUrl: './templates/manage.html',
                    controller: 'ManageController'
                })
                .when('/w/:publicId', {
                    templateUrl: './templates/view.html',
                    controller: 'ViewController'
                })
                .otherwise({
                    redirectTo: '/'
                });

            $locationProvider.html5Mode({
                enabled:true,
                requireBase: true
            });

            $locationProvider.hashPrefix('!');
        }
    ]);

    paniniApp.run(function() {
        $(document).foundation();
    });
})();
