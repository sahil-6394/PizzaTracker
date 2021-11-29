const express = require('express')
const app = express()
const ejs = require('ejs')
const expresslayout = require('express-ejs-layouts')
const path = require('path')
const PORT = process.env.PORT || 3000 

//Assets
app.use(express.static(path.join(__dirname, 'public')))


//set template engine
app.use(expresslayout)
app.set('views', path.join(__dirname, '/resourses/views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home')
})
app.get('/cart', (req, res) => {
    res.render('customers/cart')
})
app.get('/login', (req, res) => {
    res.render('auth/login')
})
app.get('/rege', (req, res) => {
    res.render('auth/rege')
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})