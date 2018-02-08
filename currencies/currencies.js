app.service('CurrenciesSerivce', ['$http', '$q', function($http, $q){
    var self = this;
    self.currencies = null;

    //gets all currencies
    self.getApi = function () {
        var deferred = $q.defer();
        if (self.currencies == null) {
            $http({
                method: 'GET',
                url: 'https://rest.coinapi.io/v1/exchangerate/BTC?apikey=' + api_key
            }).then(function (response) {
                deferred.resolve(response.data.rates);
                console.log('My first promise succeeded', response.data.rates);
            }, function (error) {
                deferred.reject(error);
                console.log('My first promise failed', error);
            });
        } else {
            deferred.resolve();
        };
        return deferred.promise;
    };
}])

app.controller('CurrenciesController', ['$scope', '$location', 'CurrenciesSerivce', function ($scope, $location, CurrenciesSerivce){
    $scope.currencies = null;
    
    //calls service
    $scope.init = function () {
        $scope.getApi();
    };

    $scope.getApi = function () {
        CurrenciesSerivce.getApi().then(function (r) {
            $scope.currencies = r;
        });
    };

    $scope.goToCoin= function (route){
        $location.path(route);
    };

    //TODO Make a displayCurrency function that routes to a view for an individual currency and makes another API call for that currency.
    $scope.init();
}]);