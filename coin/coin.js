app.service('CoinService', ['$http', '$q', function($http, $q){
    var self = this;
    var servCoin = null;
    self.getCoin = function(coin){
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'https://min-api.cryptocompare.com/data/price?fsym=' + coin + '&tsyms=BTC,USD,EUR'
        }).then(function(response){
            console.log(response);
            //self.servCoin = response.data;
            deferred.resolve(response.data);
        }, function(error){
            deferred.reject(error);
        });
        return deferred.promise;
    };

   }])

app.controller('CoinController', ['$scope', '$routeParams', 'CoinService', function ($scope, $routeParams, CoinService){
    //TODO Circular loading module from Material

    $scope.coinName = $routeParams.coin;
     
    $scope.init = function(){
        console.log($routeParams);
        $scope.getCoin($routeParams.coin);
    };

    $scope.toggledFn = null;

    $scope.toggleFn = function(fn){
        $scope.toggledFn = fn;
    };

    $scope.getCoin = function(quote){
        CoinService.getCoin($routeParams.coin).then(function (r) {
            $scope.coin = r;
        });
    };

      $scope.init();
}]);