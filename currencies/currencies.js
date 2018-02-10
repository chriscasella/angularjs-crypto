app.service('CurrenciesService', ['$http', '$q', function($http, $q){
    var self = this;
    self.currencies = [];

    //gets all currencies
    self.getApi = function () {
        var deferred = $q.defer();
        //console.log(self.currencies.length);
        if (self.currencies.length == 0) {
            $http({
                method: 'GET',
                url: 'https://min-api.cryptocompare.com/data/all/coinlist'
            }).then(function (response) {
                var r = response.data.Data;
                Object.keys(r).forEach(function (key) {
                    var value = r[key]
                    // iteration code
                    self.currencies.push(value);
                })
                deferred.resolve(self.currencies);
                console.log('My first promise succeeded', self.currencies);
            }, function (error) {
                deferred.reject(error);
                console.log('My first promise failed', error);
            });
        } else {
            deferred.resolve(self.currencies);
        };
        return deferred.promise;
    };
}])

app.controller('CurrenciesController', ['$scope', '$location', 'CurrenciesService', function ($scope, $location, CurrenciesService){
    $scope.currencies = null;
    $scope.activeView = 'currencies/currenciesCoin.html';
    $scope.switchVal = false;
    //TODO md-progress for loading progress circular
    
    //calls service
    $scope.init = function () {
        $scope.getApi();
    };

    $scope.toggleCoinView = function (s){
        if( s === true ){
            $scope.activeView = 'currencies/currenciesCoinOverview.html';
        }
        else{
            $scope.activeView = 'currencies/currenciesCoin.html';
        };
    };

    $scope.getApi = function () {
        CurrenciesService.getApi().then(function (r) {
            $scope.currencies = r;
        });
    };

    $scope.goToCoin= function (route){
        //console.log('/currencies', route, $location.path(route))
        $location.path('currencies/' + route);
    };

    //TODO Make a displayCurrency function that routes to a view for an individual currency and makes another API call for that currency.
    $scope.init();
}]);