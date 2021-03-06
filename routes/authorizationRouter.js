var express = require('express');
var router = express.Router();
var passport = require('passport');

//
// API for user authentication
//

router.post('/register', function(req, res) //passport.authenticate('local-register'), function(req, res)
{
	if (req.body.authCode !== 'testtest')
	{
		res.send("Invalid Authorization Code");
		return;
	}

	// find or create the user with the given username
    User.findOrCreate({username: req.body.username}, function(err, user, created) 
    {
        if (created) 
        {
            // if this username is not taken, then create a user record
            user.username = req.body.username;
            user.first_name = req.body.firstname;
            user.last_name = req.body.lastname;
            user.setPassword(req.body.password);
            user.save(function(err) 
            {
				if (err) 
				{
				    return res.send(err);
				}
		        return res.send("OK");
		    });
		} 
		else 
		{
		    // return an error if the username is taken
		    return res.send("Username is already in use");
		}
    });
});

router.post('/login', passport.authenticate('local'), function(req, res)
{
	res.json(req.user);
	//res.sendStatus(200);	
});

module.exports = router;
