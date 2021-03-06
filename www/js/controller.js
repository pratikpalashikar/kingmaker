var app = angular.module('kingmaker.controller', ['ngCordova']);

/*This is the controller to handle the login*/
app.controller('LoginCtrl', function ($scope, LoginService, SignUpService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.login = function () {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function (data) {
            $state.go('maintab.events');
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


app.controller('FeedController', function ($http, $log, $scope, activity, getUserInfo, $cordovaSocialSharing, $ionicActionSheet) {



    //This button is to toggle the like button
    $scope.toggle = false;
    //Like button counter
    $scope.like = 0;

    var userId;

    var tempCandidate = [];
    var jsons = new Array();


    //Like button functionality
    $scope.likebutton = function () {
        //toggle for the colour
        $scope.toggle = !$scope.toggle;
        if ($scope.toggle == true) {
            //Increment counter
            $scope.like++;


        } else {
            //Decrement counter
            $scope.like--;

        }
    }


    /*Get the object id of the user using his username*/
    getUserInfo.getUserId(loggedInUserName).
    success(function (userId) {
            alert(JSON.stringify(userId));
            $scope.userId = userId;

        })
        .error(function (error) {
            $scope.status = 'Unable to load candidate data: ' + error.message;
            $log.error(error.message);
        });
    /*Function ends to retrieve user Id*/



    /*First of all get the data of the logged in user following a candidate */
    var loggedInUserName = '';

    $scope.init = function () {

        /* Get the candidates ID */
        var objectId = "5j5DcUpAfK";

        activity.getCandidates(objectId)
            .success(function (res) {

                /*using the for loop to extract only the candidate ids*/

                for (var i = 0; i < res.results.length; i++) {

                    tempCandidate[i] = res.results[i].candidateId.objectId;
                    /*console.log(tempCandidate[i]);*/
                    /*getPosts(tempCandidate[i]);*/
                }

                getPosts(tempCandidate);


            })
            .error(function (error) {
                $scope.status = 'Unable to load candidate data: ' + error.message;
                $log.error(error.message);
            });

        /*  */


    }

    function getPosts(candidateIds) {

        activity.getPosts(candidateIds)
            .success(function (resPosts) {
                /*console.log(JSON.stringify(resPosts.results));*/
                $scope.activities = resPosts.results;
                /*console.log(jsons);*/
            })
            .error(function (error) {
                $scope.status = 'Unable to load candidate data: ' + error.message;
                $log.error(error.message);
            });

    }

    /*   $scope.init = function () {
           activity.getCandidates()
               .success(function (res) {
                   $scope.activities = res.results;
                   // alert(JSON.stringify(res));
               })
               .error(function (error) {
                   $scope.status = 'Unable to load candidate data: ' + error.message;
                   $log.error(error.message);
               });
       }*/

    $scope.showActionsheet = function () {

        $ionicActionSheet.show({
            titleText: 'Share',
            buttons: [
                {
                    text: '<i class="icon ion-social-facebook"></i> Facebook'
                },
                {
                    text: '<i class="icon ion-social-whatsapp"></i> Watsapp'
                },
                {
                    text: '<i class="icon ion-social-google"></i> Gmail'
                },
                {
                    text: '<i class="icon ion-social-twitter"></i> Twitter'
                },
                {
                    text: '<i class="icon ion-social-linkedin"></i> Linked In'
                }
      ],
            destructiveText: 'Delete',
            cancelText: 'Cancel',
            cancel: function () {
                console.log('CANCELLED');
            },
            buttonClicked: function (index) {



                if (index == 0) {

                    $scope.shareViaFacebook = function (message, image, link) {
                        $cordovaSocialSharing.shareViaFacebook(message, image, link)
                            .then(function (result) {
                                console.log('sucess');
                            }, function (err) {
                                console.log('An error occured');
                            });
                    }


                } else if (index == 1) {

                    $scope.shareViaWhatsApp = function (message, image, link) {
                        $cordovaSocialSharing.shareViaWhatsApp(message, image, link)
                            .then(function (result) {
                                console.log('sucess');
                            }, function (err) {
                                console.log('An error occured');
                            });
                    }


                } else if (index == 2) {

                    $scope.shareViaTwitter = function (message, image, link) {
                        $cordovaSocialSharing.shareViaTwitter(message, image, link)
                            .then(function (result) {
                                console.log('sucess');
                            }, function (err) {
                                console.log('An error occured');
                            });
                    }
                }



            },
            destructiveButtonClicked: function () {
                console.log('DESTRUCT');
                return true;
            }
        });
    };

});


app.controller('EventController', function ($http, $log, $scope, events) {

    $scope.init = function () {
        events.getEvents()
            .success(function (res) {
                $scope.events = res.results;
                // alert(JSON.stringify(res));
            })
            .error(function (error) {
                $scope.status = 'Unable to load candidate data: ' + error.message;
                $log.error(error.message);
            });
    }


});



/*This controller is called when the user clicks on the candidate tab, the information should appear in the form of all candidates*/
app.controller('candidate', function ($scope, $http, dataObjects) {


    $scope.init = function () {
        dataObjects.getCandidates()
            .success(function (candidates) {
                $scope.candidates = candidates;
            })
            .error(function (error) {
                $scope.status = 'Unable to load candidate data: ' + error.message;
            });
    }
});


/*This controller is used to create the event*/
app.controller('maintab', function ($scope, $ionicPopup, $state, createEventService) {

});


/*This controller is used to create the event*/
app.controller('comments', function ($scope, $ionicHistory, $ionicPopup, $state, createEventService) {

    $scope.myGoBack = function () {
        $ionicHistory.goBack();
    };

    //This is the variable for the comments
    $scope.comment = [];
    $scope.txtcomment = "";

    //This is the button to add the comments
    $scope.btn_add = function (txtcomment) {
        $scope.txtcomment = txtcomment;
        if ($scope.txtcomment != '') {

            $scope.comment.push($scope.txtcomment);
            $scope.txtcomment = "";
        }
    }

    //This is the button to remove the button
    $scope.remItem = function ($index) {
        $scope.comment.splice($index, 1);
    }



});


/*This controller contains the electiona and the candidates tabs*/
app.controller("followingController", function ($scope, $ionicSlideBoxDelegate, $ionicActionSheet, dataObjects) {



    //This is calling the service to get the values of the candidates that are involved in the election.
    $scope.init = function () {

        dataObjects.getCandidates()
            .success(function (candidates) {
                $scope.candidates = candidates;
                console.log(candidates);
                alert(JSON.stringify(candidates));
            })
            .error(function (error) {
                $scope.status = 'Unable to load candidate data: ' + error;
                console.log(status);
            });

    }




    /*Slide bar for the election and the candidates*/
    $scope.navSlide = function (index) {
        $ionicSlideBoxDelegate.slide(index, 500);
    }


    /*Action sheet to share the content please look foe the altenative action which is present for the using the common functionality*/
    $scope.showActionsheet = function () {

        $ionicActionSheet.show({
            titleText: 'Share',
            buttons: [
                {
                    text: '<i class="icon ion-social-facebook"></i> Facebook'
                },
                {
                    text: '<i class="icon ion-social-whatsapp"></i> Watsapp'
                },
                {
                    text: '<i class="icon ion-social-google"></i> Gmail'
                },
                {
                    text: '<i class="icon ion-social-twitter"></i> Twitter'
                },
                {
                    text: '<i class="icon ion-social-linkedin"></i> Linked In'
                }
      ],
            destructiveText: 'Delete',
            cancelText: 'Cancel',
            cancel: function () {
                console.log('CANCELLED');
            },
            buttonClicked: function (index) {



                if (index == 0) {

                    $scope.shareViaFacebook = function (message, image, link) {
                        $cordovaSocialSharing.shareViaFacebook(message, image, link)
                            .then(function (result) {
                                console.log('sucess');
                            }, function (err) {
                                console.log('An error occured');
                            });
                    }


                } else if (index == 1) {

                    $scope.shareViaWhatsApp = function (message, image, link) {
                        $cordovaSocialSharing.shareViaWhatsApp(message, image, link)
                            .then(function (result) {
                                console.log('sucess');
                            }, function (err) {
                                console.log('An error occured');
                            });
                    }


                } else if (index == 2) {

                    $scope.shareViaTwitter = function (message, image, link) {
                        $cordovaSocialSharing.shareViaTwitter(message, image, link)
                            .then(function (result) {
                                console.log('sucess');
                            }, function (err) {
                                console.log('An error occured');
                            });
                    }
                }



            },
            destructiveButtonClicked: function () {
                console.log('DESTRUCT');
                return true;
            }
        });
    };


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