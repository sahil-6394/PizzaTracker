const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

function authController() {

    return {
        login(req, res) {
            res.render('auth/login')
        },
        postlogin(req, res, next) {
            const {email, password} = req.body
            //validet request
            if(!email || !password) {
                req.flash('error','All fields are required')

                //if user fill two fields and click on submit button then error message is shown but all input which is provided by 
                //user is gone ex. if user fill name with sahil and email with abc@mail.com and click on submit button these two 
                //input should be there whenever user makes mistake therefore here flash messages is used
                return res.redirect('/login')
            }
            passport.authenticate('local', (err, user, info) => {

                if(err) {
                    req.flash('error', info.message)
                    return next(err)
                }
                if(!user) {
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }

                req.logIn(user, err => {
                    if(err) {
                        req.flash('error', info.message)
                        return next(err)
                    }

                    return res.redirect('/')
                })
            })(req, res, next)
        },
        register(req, res) {
            res.render('auth/register')
        },
        async postregister(req, res) {

            const {name, email, password} = req.body
            //validet request
            if(!name || !email || !password) {
                req.flash('error','All fields are required')

                //if user fill two fields and click on submit button then error message is shown but all input which is provided by 
                //user is gone ex. if user fill name with sahil and email with abc@mail.com and click on submit button these two 
                //input should be there whenever user makes mistake therefore here flash messages is used
                req.flash('name', name) 
                req.flash('email', email)
                return res.redirect('/register')
            }
            
            //check if email exist
            User.exists({email: email}, (err, result) => {
                if(result) {
                    req.flash('error','Email is taken')
                    req.flash('name', name) 
                    req.flash('email', email)
                    return res.redirect('/register')
                }
            })

            //hash pwd 
            const hashPassword = await bcrypt.hash(password, 10)

            //create user
            const user = User({
                name,
                email,
                password: hashPassword
            })

            user.save().then((user) => {
                //auto login
                return res.redirect('/')
            }).catch(err => {
                req.flash('error','something went wrong')
                    return res.redirect('/register')
            })
            console.log(req.body)
        },
        logout(req, res) {
            req.logOut()
            return res.redirect('/')
        }
    }
}

module.exports = authController;