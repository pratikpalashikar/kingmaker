angular.module('kingmaker.services', [])

.service('LoginService', function($q) {
    return {
              loginUser: function(name, pw) {
              Parse.User.logIn(name,pw, {
              success: function(user) {
              // Do stuff after successful login.
              console.log(user);
              alert("success!");
              },
              error: function(user, error) {
              // The login failed. Check error to see why.
              alert("error!");
              }
              });
        }
    }
})


.service('SignUpService', function($q) {
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
      // Hooray! Let them use the app now.
      alert("success!");

    },
    error: function(user, error) {
      // Show the error message somewhere and let the user try again.
      alert("Error: " + error.code + " " + error.message);
    }
    });

  }
}

});
