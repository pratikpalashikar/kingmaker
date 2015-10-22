angular.module('kingmaker.services', [])

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