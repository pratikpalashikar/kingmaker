// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('kingmaker', ['ionic','kingmaker.controller','kingmaker.services'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    Parse.initialize("SAenSs3ANpppNo4dj4ZZbpflckiS87uAS2U74hig", "G2BgV6o3s0VzvdMtJw1F5DsnoXHcUX0RY0UAppyr");


  });
})

// this is used as the router to change the state of the application
.config(function($stateProvider, $urlRouterProvider) {

$stateProvider
//Watch out for the commas
.state('login', {
     url: '/login',
     templateUrl: 'templates/login.html',
     controller:'LoginCtrl'
 })

 .state('candidate', {
      url: '/candidate',
      templateUrl: 'templates/candidate.html',
      controller:'candidate'
  })

//Watch out for the commas
 .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'LoginCtrl'
  });

 // if none of the above states are matched, use this as the fallback
 $urlRouterProvider.otherwise('/login');
});
