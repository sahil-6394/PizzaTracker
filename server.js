require('dotenv').config()//all variable in file can access
const express = require('express')
const app = express()
const ejs = require('ejs')
const expresslayout = require('express-ejs-layouts')
const path = require('path')
const PORT = process.env.PORT || 3000 
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoStore = require('connect-mongo')
const passport = require('passport')

//database connection 
const url = 'mongodb://localhost:27017/pizza';
mongoose.connect(url, {useNewUrlParser: true});
const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log('database connected sucesfully.....')
// })
// // .catch(err => {
// //     console.log('connection failed.....')
// // })

//passport config 
//session config
//session store

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store:  MongoStore.create(({
        mongoUrl: url,
        collection: 'sessions'
    })),
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
    // cookie: {maxAge: 1000 * 15}
}))

const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())


//Assets
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded(extended= true))
app.use(express.json())

//Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})
//set template engine
app.use(expresslayout)
app.set('views', path.join(__dirname, '/resourses/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})