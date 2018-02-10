app.service('HomeService', ['$http', '$q', function ($http, $q) {
   
}]);
app.controller('HomeController', ['$scope', '$q', '$timeout', 'HomeService', 'CurrenciesService', function ($scope, $q, $timeout, HomeService, CurrenciesService) {
    $scope.currencies = null;
    $scope.coinName = '';
    
    $scope.init = function (){
        $scope.getCurrencies();
    };

    $scope.getCurrencies = function(){
        CurrenciesService.getApi().then(function(r){
            $scope.currencies = r;
        });
    };

  
    $scope.init();
}]);


