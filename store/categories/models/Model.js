const mongoose = require('mongoose');
const dateSchema = require('../../core/schemas/DateSchema')

dateSchema.add({
    name: {
        type: String,
        required: true,
        index: true, // for adding unique category name
        unique: true // for adding unique category name
    },
})

exports.Model = mongoose.model('Category', dateSchema); // using only exports so it can be exported only to this folder level
