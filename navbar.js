(function(){
        app.controller('navbarController', ['$scope', '$location', 'ROUTES', function($scope, $location, ROUTES){
            $scope.routes = angular.copy(ROUTES);
            $scope.goTo = function(route){
                $location.path(route);
            };
        }])

        app.directive('cryptoNavbar', function(){
            return {
                restrict: 'E',
                controller: 'navbarController',
                templateUrl: 'navbar.html'
            }
        })
})();