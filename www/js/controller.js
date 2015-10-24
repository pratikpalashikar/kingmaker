var app = angular.module('kingmaker.controller', []);

/*This is the controller to handle the login*/
app.controller('LoginCtrl', function ($scope, LoginService, SignUpService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.login = function () {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function (data) {
            $state.go('createEvent');
            //  alert("login success");
        }).error(function (data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    };

    $scope.signUp = function () {


        //Make sure all the variable are set properly in the format $scope.data.tel
        var promise = SignUpService.signUpUser($scope.data.username, $scope.data.email, $scope.data.password, $scope.data.tel);
        //alert(promise);
        promise.then(function (data) {
            var alertPopup = $ionicPopup.alert({
                title: 'SignUp Complete',
                template: 'Please login using your credential'
            });

            $state.go('login');
            //alert("login success");
        }, function (data) {
            var alertPopup = $ionicPopup.alert({
                title: 'SignUp Failed',
                template: 'Please check your credentials!'
            });

        });

    }

});


app.controller('FeedController', function ($http, $scope) {

    $scope.init = function () {
        $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=100&callback=JSON_CALLBACK&q=' + encodeURIComponent('http://maharashtratimes.indiatimes.com/rssfeeds/2429066.cms'))
            .success(function(data){
           
            $scope.entries = data.responseData.feed.entries;
        })
            .error(function(data){
            console.log("Error "+data)
         
    });
    
    }
    
    $scope.browse = function(v){
        window.open(v,"system","location=yes");   
    }


});

/*This is the controller to control the internal app candidate add-on*/
app.controller('candidate', function ($scope) {
    $scope.candidates = [
        {
            name: 'Pratik Palashikar'
        },
        {
            name: 'Sanjay Thorat'
        }
]

    $scope.data = {
        showDelete: false,
        i: 0
    }

    $scope.likes = function () {
        $scope.data.i++
    }


    $scope.add = function () {
        $scope.candidates.push({
            name: 'Sanjay Thorat'
        })
        $scope.candidates.push({
            name: 'Sanjay Thorat'
        })
        $scope.elections.push({
            name: 'Princeton'
        })
        $scope.elections.push({
            name: 'MIT'
        })
    }

    $scope.elections = [
        {
            name: 'MIT'
        },
        {
            name: 'Princeton'
        },
        {
            name: 'University of texas Arlington'
        }
]


});


/*This controller is used to create the event*/
app.controller('maintab', function ($scope, $ionicPopup, $state, createEventService) {

});


/*This controller is used to create the event*/
app.controller('createEvent', function ($scope, $ionicPopup, $state, createEventService) {
    $scope.data = {};
    $scope.image = [];

    /*create event function*/

    // var file = new Parse.File("myfile.png",$scope.data.file, "image/png");
    alert($scope.image.file);
    $scope.save = function () {


        createEventService.addEvent($scope.data.eventname, $scope.data.description, $scope.data.organizer, $scope.data.tagline, $scope.data.datetime, $scope.data.file).success(function (data) {

            var alertPopup = $ionicPopup.alert({
                title: 'Event Added',
                template: 'Good Luck!!!'
            });

            // $state.go('login');
            //alert("login success");
        }).error(function (data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Event creation failed',
                template: 'Cannot create a new event'
            });

        });
    }
});