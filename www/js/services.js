angular.module('kingmaker.services', [])

.service('LoginService', function($q) {
var e = $q.defer();
var promise = e.promise;
return {
loginUser: function(name, pw) {
Parse.User.logIn(name,pw, {
success: function(user) {
e.resolve(user);
},
error: function(user, error) {
e.reject(error);
}
});
promise.success = function(fn){
promise.then(fn);
return promise;
}
promise.error = function(fn) {
promise.then(null, fn);
return promise;
}
return promise;
}
}

})


.service('SignUpService', function($q) {
var a = $q.defer();
var promise = a.promise;
return{
signUpUser: function(name,email,pw){
//Create a new user on Parse
var user = new Parse.User();
user.set("username", name);
user.set("password", pw);
user.set("email", email);
//creates a user in the backend
user.signUp(null, {
success: function(user) {
a.resolve(user);
// Hooray! Let them use the app now.
alert("success!");

},
error: function(user, error) {
a.reject(error);
}

});

promise.success = function(fn){
promise.then(fn);
return promise;
}
promise.error = function(fn) {
promise.then(null, fn);
return promise;
}
return promise;

}


}

});
