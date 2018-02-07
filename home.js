app.service('HomeService', ['$http', '$q', function ($http, $q) {
    var self = this;
    self.currencies = null;
    self.getApi = function () {
        var deferred = $q.defer();
        if(self.currencies == null){
            $http({
                method: 'GET',
                url: 'https://rest.coinapi.io/v1/exchangerate/BTC?apikey=' + api_key
            }).then(function (response) {
                deferred.resolve(response);
                console.log('My first promise succeeded', response);
            }, function (error) {
                deferred.reject(error);
                console.log('My first promise failed', error);
            });
        } else{
            deferred.resolve(self.currencies);
        };
        return deferred.promise;
    };
}]);
app.controller('HomeController', ['$scope', 'HomeService', 'ROUTES', function ($scope, HomeService, ROUTES) {

    $scope.routes = ROUTES;

    $scope.init = function () {
        $scope.getApi();
    };
    
    $scope.getApi = function () {
        HomeService.getApi().then(function (r) {
            console.log(r);
        });
    };


    $scope.init();
}]);


