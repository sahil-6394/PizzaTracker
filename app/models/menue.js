
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const menueSchema = new Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: String, required: true},
    size: {type: String, required: true},
})

const Menue = mongoose.model('Menue', menueSchema)

module.exports = Menue