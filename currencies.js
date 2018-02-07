app.service('CurrenciesSerivce', ['$http', '$q', function($http, $q){
    var self = this;
    self.currencies = null;
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

app.controller('CurrenciesController', ['$scope', 'CurrenciesSerivce', function ($scope, CurrenciesSerivce){
    $scope.currencies = null;
    
    $scope.init = function () {
        $scope.getApi();
    };

    $scope.getApi = function () {
        CurrenciesSerivce.getApi().then(function (r) {
            $scope.currencies = r;
        });
    };


    $scope.init();
}]);