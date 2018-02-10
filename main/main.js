app.controller('MainController', ['$scope', 'CurrenciesService', function ($scope, CurrenciesService){
    $scope.currencies = r;

    $scope.init = function () {
        //$scope.getCurrencies();
    };

    $scope.getCurrencies = function () {
        CurrenciesService.getApi().then(function (r) {
            $scope.currencies = r;
        })
    };

    $scope.init();
}]);