const mongoose = require('mongoose');
const coreSchema = require('../../core/schemas/DateSchema')

coreSchema.add({
    name: {
        type: String,
        required: true,
        index: true, // for adding unique category name
        unique: true // for adding unique category name
    },
})

exports.Model = mongoose.model('Category', coreSchema); // using only exports so it can be exported only to this folder level
