
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},//meaning of unique here is that 
                                                        //if user try to regester with same email id then it will give an eror
    password: {type: String, required: true},
    role: {type: String, default: 'customers'}, //required true is not taken here bcf of we don't want role of the every customer
},{timestamps: true})

const User = mongoose.model('User', userSchema)

module.exports = User