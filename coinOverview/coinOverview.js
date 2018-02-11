app.service('CoinOverviewService', ['$http', '$q', function($http, $q){
    var self = this;

    self.getCoin = function(id){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url: 'https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=' + id
        }).then(function(r){
            console.log('coin data', r);
            deferred.resolve(r);
        }, function(error){});
        return deferred.promise;
    };
}])

app.controller('CoinOverviewController', ['$scope', '$routeParams', 'CurrenciesService', 'CoinOverviewService', function ($scope, $routeParams, CurrenciesService, CoinOverviewService){
    
    $scope.currencies = angular.copy(CurrenciesService.currencies);
    $scope.id = null;

    $scope.init = function(){
        $scope.coinName = $routeParams.coin;
        $scope.findSymbol($scope.coinName);
    };
    //api call for service
    $scope.getCoin = function(id){
        CoinOverviewService.getCoin(id).then(function (r) {
            $scope.coin = r;
        });
    };
    //parses currencies hash for matching id for symbol from params
    $scope.findSymbol = function(sym){
        var s = $scope.currencies;
        for(var i=0; i < s.length; i++ ){
            if(s[i].Symbol == sym){
                $scope.id = s[i].Id;
                $scope.getCoin($scope.id);
            };
        };
    };
    $scope.init();
}]);
