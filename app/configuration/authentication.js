var User =   require('../../app/models/user')
var config = require('./configauth');
var jwt = require('jsonwebtoken');
function login (body, res, next) {
    User.findOne({ 'email' :  body.email }, function(err, user) {
        // if there are any errors, return the error before anything else
        if (err) {
            throw err
        }

        // if no user is found, return the message
        if (!user) {
            return res.json({ success: false, message: 'Authentication failed. User not found.' });
        }

        // if the user is found but the password is wrong
        if (!user.validPassword(body.password)) {
            return res.json({ success: false, message: 'Invalid user name and or password' });
        }

        // all is well, return successful user
        var payload = {
            sub: user._id
        },
        token = jwt.sign(payload, config.jwtSecret);
        return res.json({
            success: true,
            message: 'You have successfully logged in!',
            token,
            data:user
          });

    });
}

function signup (body, res, next) {
    User.findOne({ 'email' :  body.email }, function(err, user) {
        // if there are any errors, return the error
        if (err) {
            throw err;
        }
        // check to see if theres already a user with that email
        if (user) {
            return res.json({ success: false, message: 'Authentication failed. Email already used' });
        } else {

            var newUser = new User();
            newUser.email = body.email;
            newUser.password = newUser.generateHash(body.password);
            newUser.name = body.name;

            // save the user
            newUser.save(function(err) {
                if (err) {
                    throw err;
                }
                return res.json({
                    success: true,
                    message: "You have successfully signed up! Now you should be able to log in."
                })
            });
        }

    });
}


module.exports = {login, signup};