(function(){
        app.controller('navbarController', ['$scope', '$location', 'ROUTES', function($scope, $location, ROUTES){
            $scope.routes = angular.copy(ROUTES);

            $scope.init = function(){
                console.log('hello', $scope.routes);
            };
            $scope.goTo = function(route){
                $location.path(route);
            };

            $scope.init();
        }])

        app.directive('cryptoNavbar', function(){
            return {
                restrict: 'E',
                templateUrl: 'navbar/navbar.html',
                controller: 'navbarController'
            }
        });
})();