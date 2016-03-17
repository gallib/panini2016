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
                    templateUrl: 'templates/index.html',
                    controller: 'PaniniController'
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
