// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('kingmaker', ['ionic', 'kingmaker.controller', 'kingmaker.services'])


.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

        //First is application id and the second is the client key
        Parse.initialize("CoBPiX7SCnMPtiS9DuThOjuUk80gjDocQWPJ92Dx", "irEFXbxE25QxOibHJYHrPmTaVpMiHbWmVmO7HpxV");

    });
})



// this is used as the router to change the state of the application
.config(function ($stateProvider, $urlRouterProvider) {

    //This is done to move the position of the tab to the bottom

    $stateProvider

    .state('maintab', {
        url: '/maintab',
        abstract: true,
        templateUrl: 'templates/maintab.html'
    })

    .state('maintab.candidate', {
        url: '/candidate',
        views: {
            'candidate': {
                templateUrl: 'templates/candidate.html'
            }
        }
    })

    .state('maintab.events', {
        url: '/events',
        views: {
            'events': {
                templateUrl: 'templates/events.html'
            }
        }
    })

    .state('maintab.following', {
        url: '/following',
        views: {
            'following': {
                templateUrl: 'templates/following.html'
            },
            'a': {
                templateUrl: 'templates/following.html'
            }
        }

    })

    .state('maintab.volunteer', {
        url: '/volunteer',
        views: {
            'volunteer': {
                templateUrl: 'templates/volunteer.html'
            }
        }
    })

    .state('maintab.messages', {
        url: '/messages',
        views: {
            'messages': {
                templateUrl: 'templates/messages.html'
            }
        }
    })

    .state('maintab.newsfeed', {
        url: '/newsfeed',
        views: {
            'newsfeed': {
                templateUrl: 'templates/newsfeed.html', 
                controller: 'FeedController'
            }
        }
    })


    //Watch out for the commas
    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'

    })

    .state('candidate', {
        url: '/candidate',
        templateUrl: 'templates/candidate.html',
        controller: 'candidate'
    })

    .state('createEvent', {
        url: '/createEvent',
        templateUrl: 'templates/createEvent.html',
        controller: 'createEvent'
    })

    //Watch out for the commas
    .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'LoginCtrl'
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/maintab/events');
});