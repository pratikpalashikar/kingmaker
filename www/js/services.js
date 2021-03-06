angular.module('kingmaker.services', [])


/*This is used to access the candidates which are involved in the election
factory is used to return the object
*/
.factory('dataObjects', ['$http', function ($http) {

    var baseUrl = 'https://api.parse.com/1/classes/Candidates';
    var dataFactory = {};
    var include;

    dataFactory.getCandidates = function () {
        return $http.get(baseUrl, {
            headers: {
                'Content-Type': 'application/json',
                'X-Parse-Application-Id': 'CoBPiX7SCnMPtiS9DuThOjuUk80gjDocQWPJ92Dx',
                'X-Parse-REST-API-Key': 'SUv0Uq0Befi9Kh7zre0hR1wjxhwej056rgYh0iGm'
            },
            params: {
                where: {
                    $relatedTo: {
                        object: {
                            __type: 'Pointer',
                            className: 'Elections',
                            objectId: '6VCyQjxbgI'
                        },
                        key: 'elecCandidate'
                    }
                }
            }
        });
    }

    return dataFactory;
}])



/*This factory is used to get the activity of the users*/
.factory('activity', ['$http', function ($http) {

    var baseUrl = 'https://api.parse.com/1/classes/Actions';
    var dataFactory = {};
    var include;


    dataFactory.getCandidates = function (uservar) {

        var whereQuery = {
            'fromUser': uservar,
            'type': 'follow',
            'subType': 'candidate'
        }

        return $http.get(baseUrl, {
            headers: {
                'Content-Type': 'application/json',
                'X-Parse-Application-Id': 'CoBPiX7SCnMPtiS9DuThOjuUk80gjDocQWPJ92Dx',
                'X-Parse-REST-API-Key': 'SUv0Uq0Befi9Kh7zre0hR1wjxhwej056rgYh0iGm'
            },
            params: {
                where: whereQuery,
                limit: 20,
                include: 'candidateId'
            }

        });
    }

    dataFactory.getPosts = function (candidateIds) {


        var getPostsUrl = 'https://api.parse.com/1/classes/Activity';

        var getPostQuery = {
            'type': 'post',
            'postUser': {
                
                $in: candidateIds
                
            }
        }

        return $http.get(getPostsUrl, {
            headers: {
                'Content-Type': 'application/json',
                'X-Parse-Application-Id': 'CoBPiX7SCnMPtiS9DuThOjuUk80gjDocQWPJ92Dx',
                'X-Parse-REST-API-Key': 'SUv0Uq0Befi9Kh7zre0hR1wjxhwej056rgYh0iGm'
            },
            params: {
                where: getPostQuery,
                limit: 20,
                include: 'mediaId'
            }
        });
    }
    return dataFactory;

}])



/*This factory is used to get the activity of the users*/
.factory('getUserInfo', ['$http', function ($http) {


    var dataFactory = {};

    dataFactory.getUserId = function (user) {

        var baseUrl = 'https://api.parse.com/1/users/' + user;
        return $http.get(baseUrl, {
            headers: {
                'Content-Type': 'application/json',
                'X-Parse-Application-Id': 'CoBPiX7SCnMPtiS9DuThOjuUk80gjDocQWPJ92Dx',
                'X-Parse-REST-API-Key': 'SUv0Uq0Befi9Kh7zre0hR1wjxhwej056rgYh0iGm'
            }
        });
    }
    return dataFactory;

}])



/*This factory is used to get the activity of the users*/
.factory('events', ['$http', function ($http) {

    var baseUrl = 'https://api.parse.com/1/classes/Events';
    var dataFactory = {};
    dataFactory.getEvents = function () {
        return $http.get(baseUrl, {
            headers: {
                'Content-Type': 'application/json',
                'X-Parse-Application-Id': 'CoBPiX7SCnMPtiS9DuThOjuUk80gjDocQWPJ92Dx',
                'X-Parse-REST-API-Key': 'SUv0Uq0Befi9Kh7zre0hR1wjxhwej056rgYh0iGm'
            }
        });
    }
    return dataFactory;

}])



.service('LoginService', function ($q) {
    var e = $q.defer();
    var promise = e.promise;
    return {
        loginUser: function (name, pw) {
            Parse.User.logIn(name, pw, {
                success: function (user) {
                    e.resolve(user);
                },
                error: function (user, error) {
                    e.reject(user);
                }
            });
            promise.success = function (fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function (fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})


.service('createEventService', function ($q) {
    var e = $q.defer();
    var promise = e.promise;
    return {
        addEvent: function (eventname, description, organizer, tagline, datetime, fileOne) {
            /*created the event object*/
            alert(fileOne);

            var Events = Parse.Object.extend("Events");
            var events = new Events();
            /*set the event name*/
            events.set("name", eventname);
            /*set the description*/
            events.set("description", description);
            /*set the organiser*/
            events.set("organizer", organizer);
            /*set the organiser description*/
            events.set("tagline", tagline);
            /*Date*/
            events.set("startTime", new Date(Date.parse(datetime)));
            //Upload the image file
            var file = new Parse.File("myfile.zzz", fileOne, "image/png");
            alert(file);
            events.set("photo", file);
            events.save(null, {
                success: function (user) {
                    e.resolve(user);
                },
                error: function (user, error) {
                    alert(error.message);
                    e.reject(user);
                }
            });

            promise.success = function (fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function (fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})



.service('SignUpService', function ($q) {
    var a = $q.defer();
    var promise = a.promise;
    return {
        signUpUser: function (name, email, pw, tel) {
            //Create a new user on Parse
            var user = new Parse.User();
            user.set("username", name);
            user.set("password", pw);
            user.set("email", email);
            user.set("phoneNo", parseInt(tel));
            //  alert(name);
            //creates a user in the backend
            user.signUp(null, {
                success: function (user) {
                    a.resolve(user);
                },
                error: function (user, error) {
                    a.reject(user);
                }

            });

            promise.success = function (fn) {
                promise.then(fn);
                return promise;
                alert("In success promise");
            }
            promise.error = function (fnerr) {
                promise.then(null, fnerr);
                return promise;
                alert("In  error");
            }
            return promise;

        }


    }

});