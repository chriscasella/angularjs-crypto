app.service('HomeService', ['$http', '$q', function ($http, $q) {
   
}]);
app.controller('HomeController', ['$scope', 'HomeService', 'CurrenciesService', function ($scope, HomeService, CurrenciesService) {
    $scope.currencies = null;
    
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


