const express = require('express')
const app = express()
const ejs = require('ejs')
const expresslayout = require('express-ejs-layouts')
const path = require('path')
const PORT = process.env.PORT || 3000 
module.exports = app;

res.render('home')
app.get('/', (req, res) => {
})

//set template engine
app.use(expresslayout)
app.set('views', path.join(__dirname, '/resourses/views'))
app.set('view engine', 'ejs')


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})