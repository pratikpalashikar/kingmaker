var app = angular.module('kingmaker.controller', []);

/*This is the controller to handle the login*/
app.controller('LoginCtrl', function($scope, LoginService,SignUpService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
             $state.go('candidate');
          //  alert("login success");
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    };

    $scope.signUp = function(){

      SignUpService.signUpUser($scope.data.username, $scope.data.email, $scope.data.password).success(function(data) {
          $state.go('login');
          //alert("login success");
      }).error(function(data){
            var alertPopup = $ionicPopup.alert({
                title: 'SignUp Failed',
                template: 'Please check your credentials!'
            });
      
      });

    }

});

/*This is the controller to control the internal app candidate add-on*/
app.controller('candidate',function($scope){
  $scope.candidates =[
  {name: 'Pratik Palashikar'},
  {name: 'Sanjay Thorat'}  
]

  $scope.data = {
    showDelete: false,
    i:0
  }
  
  $scope.likes = function(){
    $scope.data.i++
  }
  
  
  $scope.add = function(){
    $scope.candidates.push({name: 'Sanjay Thorat' })
    $scope.candidates.push({name: 'Sanjay Thorat' })
    $scope.elections.push({name: 'Princeton' })
    $scope.elections.push({name: 'MIT' })
  }
  
  $scope.elections =[
  {name: 'MIT'},
  {name: 'Princeton'} ,
  {name: 'University of texas Arlington'}
]

});
