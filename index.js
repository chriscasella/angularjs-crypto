var app = angular.module('CryptoApp', ['ngMaterial', 'ngRoute']);

app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
    .when('/',{
        templateUrl: 'home.html',
        controller: 'HomeController'
    })
    .when('/currencies',{
        templateUrl: 'currencies.html',
        controller: 'CurrenciesController'
    })
    .otherwise({ redirectTo: '/' });
}]);