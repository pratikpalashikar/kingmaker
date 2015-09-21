angular.module('kingmaker.controller', [])

.controller('LoginCtrl', function($scope, LoginService,SignUpService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            //$state.go('tab.dash');
            alert("login success");
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    };

    $scope.signUp = function(){

      SignUpService.signUpUser($scope.data.username, $scope.data.email, $scope.data.password).success(function(data) {
          //$state.go('tab.dash');
          alert("login success");
      });

    }

});
