const mongoose = require('mongoose');
const coreSchema = require('../../core/schemas/DateSchema');
const { isEmail } = require('validator');

coreSchema.add({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true,'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a valid password'],
        minlength: [6, 'Minimum password length must be 6 characters']
    },
})

exports.Model = mongoose.model('User', coreSchema); // using only exports so it can be exported only to this folder level
