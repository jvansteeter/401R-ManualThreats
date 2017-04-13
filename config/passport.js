var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var user = {
	"_id" : "57aeab8914c2fb381472c09f",
	"username" : "test",
	"first_name" : "Test",
	"last_name" : "User",
	"password_hash" : "$2a$10$e4EhwRb0Knk08vWpgbxwFekIN1rqS6ZPDSYIGQKm3cD84IGL8sAUO"
};
// used to serialize the user for the session
passport.serializeUser(function(user2, done)
{
    done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function(id, done)
{
	done(null, user);
});


passport.use('local', new LocalStrategy(function (username, password, done)
{

	if (username === "go" && password === "gogo2017")
	{
		return done(null, user);
	}
	else
	{
		return done(null, false, {message: 'Invalid'});
	}
}));
