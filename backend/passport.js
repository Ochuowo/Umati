var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

// Define a function to serialize the user object into the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  // Define a function to deserialize the user object from the session
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  
  // Define a local strategy for passport to authenticate the user using username and password
  passport.use(new LocalStrategy(function(username, password, done) {
    // Find the user with the given username in the database
    User.findOne({username: username}, function(err, user) {
      if (err) {
        // If there is an error, return it
        return done(err);
      }
      if (!user) {
        // If the user is not found, return a message
        return done(null, false, {message: "Incorrect username"});
      }
      // Compare the given password with the hashed password in the database using bcrypt
      bcrypt.compare(password, user.password, function(err, result) {
        if (err) {
          // If there is an error, return it
          return done(err);
        }
        if (result) {
          // If the passwords match, return the user object
          return done(null, user);
        } else {
          // If the passwords do not match, return a message
          return done(null, false, {message: "Incorrect password"});
        }
      });
    });
  }));

  export default passport;