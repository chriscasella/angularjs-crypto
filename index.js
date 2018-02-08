var app = angular.module('CryptoApp', ['ngMaterial', 'ngRoute']);

app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
    .when('/',{
        templateUrl: 'home/home.html',
        controller: 'HomeController'
    })
    .when('/currencies',{
        templateUrl: 'currencies/currencies.html',
        controller: 'CurrenciesController'
    })
    .when('/currencies/:coin',{
        templateUrl: 'coin/coin.html',
        controller: 'CoinController',
        data:{
            data : 'coin'
        }
    })
    .otherwise({ redirectTo: '/' });
}]);