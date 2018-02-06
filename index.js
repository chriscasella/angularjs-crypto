var app = angular.module('CryptoApp', ['ngMaterial', 'ngRoute']);

app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
    .when('/',{
        templateUrl: 'home.html',
        controller: 'HomeController'
    })
    .otherwise({ redirectTo: '/view1' });
}]);