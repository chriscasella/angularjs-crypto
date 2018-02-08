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
}])

app.controller('CoinController', ['$scope', '$routeParams', 'CoinService', function ($scope, $routeParams, CoinService){
    $scope.init = function(){
        console.log($routeParams);
        $scope.getCoin($routeParams.coin);
    };
    $scope.getCoin = function(coin){
        CoinService.getCoin(coin).then(function (r) {
            $scope.coin = r;
        });
    };

    $scope.init();
}]);