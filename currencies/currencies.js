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
    $scope.currencies = [];
    $scope.currencyToPush = [];
    $scope.activeView = 'currencies/currenciesCoin.html';
    $scope.switchVal = false;
    $scope.visibleCurrencies = [];
    $scope.currenciesLen = $scope.currencies.length;
    
    //calls service
    $scope.init = function () {
        $scope.getApi();
    };
    //Changes pagination position
    $scope.changePage = function(pageNum){
        this.pageNum = pageNum - 1;
        var c = $scope.currencies;
        console.log(pageNum);
        for(var i = 0; i < c.length; i++){
          if(pageNum == i){
              $scope.visibleCurrencies = angular.copy(c[i]);
          };  
        };
    };
    //toggles active views in currencies.html
    $scope.toggleCoinView = function (s){
        // s is the boolean response coming from the md-switch directive
        if( s === true ){
            $scope.activeView = 'currencies/currenciesCoinOverview.html';
        }
        else{
            $scope.activeView = 'currencies/currenciesCoin.html';
        };
    };

    $scope.getApi = function () {
        CurrenciesService.getApi().then(function (r) {
            //$scope.currencies = r;
            var counter = 0;
            for(var i = 0; i < r.length; i++){
                if(counter < 149){
                    $scope.currencyToPush.push(r[i]);
                    counter++
                } else {
                    counter =0;
                    $scope.currencies.push($scope.currencyToPush);
                    $scope.currencyToPush = [];
                    $scope.currencyToPush.push(r[i]);
                };
            };
            $scope.changePage(1);
        });
    };

    $scope.goToCoin= function (route){
        //console.log('/currencies', route, $location.path(route))
        $location.path('currencies/' + route);
    };

    //TODO Make a displayCurrency function that routes to a view for an individual currency and makes another API call for that currency.
    $scope.init();
}]);