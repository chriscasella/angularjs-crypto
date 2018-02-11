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
    .when('/currencies/:coin?',{
        templateUrl: 'currenciesExchange/currenciesExchange.html',
        controller: 'CurrenciesController'
    })
    .when('/currencies/overView/:coin', {
        templateUrl: 'coinOverview/coinOverview.html',
        controller: 'CoinOverviewController'
    })
    .otherwise({ redirectTo: '/' });
}]);