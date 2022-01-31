const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')

function passportInit(passport) {

    passport.use(new LocalStrategy({usernameField: 'email',passwordField: 'password'}, async(email, password, done) => {

        //check user exist
        const user = await User.findOne({email: email})
        if(!user) {
            return done(null, false, {message: 'no user with this email'})
        }

        //if exist
        bcrypt.compare(password, user.password).then(match => {
            if(match) {
                return done(null, user, {message: 'succesfully logedin'})
            }

            return done(null, false, {message: 'wrong username or password'})
        }).catch(err => {
            return done(null, false, {message: 'something  went wrong'})
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
   // req.user
}

module.exports = passportInit