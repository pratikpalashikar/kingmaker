// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('kingmaker', ['ionic', 'kingmaker.controller', 'kingmaker.services','ngCordova'])


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
                        //Application ID                             //Javascript rest api key   
        Parse.initialize("CoBPiX7SCnMPtiS9DuThOjuUk80gjDocQWPJ92Dx", "SUv0Uq0Befi9Kh7zre0hR1wjxhwej056rgYh0iGm");

    });
})



// this is used as the router to change the state of the application
/*Take care for the commas while editing the state it may lead to error*/
.config(function ($stateProvider, $urlRouterProvider) {

    //This is done to move the position of the tab to the bottom

    $stateProvider
    /*This is the abstract tab for the maintabs*/
    .state('maintab', {
        url: '/maintab',
        abstract: true,
        templateUrl: 'templates/maintab.html'
    })

    /*Main tab pages starts*/
    
    .state('maintab.events', {
        url: '/events',
        views: {
            'events': {
                templateUrl: 'templates/events.html',
                controller: 'EventController'
            }
        }
    })

    .state('maintab.following', {
        url: '/following',
        views: {
            'following': {
                templateUrl: 'templates/following.html',
                controller: 'followingController'
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
   /*Maintab bar ends*/
    
    
    /*Subtab for the subtab*/
    .state('subtab', {
        url: '/following',
        abstract: true,
        templateUrl: 'templates/following.html'
    })

     
     .state('subtab.candidate', {
        url: '/candidate',
        views: {
            'candidateView': {
                templateUrl: 'templates/candidate.html',
                controller: 'candidate'
            }
        }
    })
    
     .state('subtab.election', {
        url: '/election',
        views: {
            'electionView': {
                templateUrl: 'templates/election.html',
                controller: 'election'
            }
        }
    })
    /*Subtab ends*/
  
    /*Navigates to the comments page*/
    .state('comments', {
            url: '/comments',
            templateUrl: 'templates/comments.html',
            controller: 'comments'

        })
    
    /*This is the main login page*/
    .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'

        })

    /*Candidate Page*/
    /*.state('candidate', {
        url: '/candidate',
        templateUrl: 'templates/candidate.html',
        controller: 'candidate'
    })
*/
    /*Screen that will be used to create the event */
    .state('createEvent', {
        url: '/createEvent',
        templateUrl: 'templates/createEvent.html',
        controller: 'createEvent'
    })

    /*Sign up screen*/
    .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'LoginCtrl'
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/maintab/events');
});