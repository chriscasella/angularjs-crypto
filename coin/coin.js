app.service('CoinService', ['$http', '$q', function($http, $q){
    var self = this;
    var servCoin = null;
    self.getCoin = function(coin){
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'https://rest.coinapi.io/v1/exchangerate/' + coin + '?apikey=' + api_key
        }).then(function(response){
            console.log(response);
            self.servCoin = response.data;
            deferred.resolve(response.data);
        }, function(error){
            deferred.reject(error);
        });
        return deferred.promise;
    };

    self.getSpecificExchng = function(base, quote){
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'https://rest.coinapi.io/v1/exchangerate/' + base + '/' + quote + '?apikey=' + api_key
        }).then(function(response){
            console.log(response);
            deferred.resolve(response.data);
        }, function(error){
            deferred.reject(error);
        })
        return deferred.promise;
    };
}])

app.controller('CoinController', ['$scope', '$routeParams', 'CoinService', function ($scope, $routeParams, CoinService){
    //TODO Circular loading module from Material
    $scope.init = function(){
        console.log($routeParams);
        $scope.getCoin($routeParams.coin);
    };

    $scope.toggledFn = null;

    $scope.toggleFn = function(fn){
        $scope.toggledFn = fn;
    };

    $scope.getCoin = function(quote){
        CoinService.getCoin($routeParams.coin, quote).then(function (r) {
            $scope.coin = r;
        });
    };

    $scope.getSpecificExchng = function(exchng){
        CoinService.getSpecificExchng(exchng).then(function(r){
            $scope.specificExchngRate = r;
        })
    };

    $scope.init();
}]);