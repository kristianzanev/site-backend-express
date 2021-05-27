const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true, // for adding unique category name
        unique: true // for adding unique category name
    },
    created_at: {
        type: Date,
        immutable: true,
        // default: Date.now(),
        set(value) {
            return Date.now(); // forcing only current first date
          },
    }
});


// schema.pre('save', () => {console.warn('save')})

module.exports = mongoose.model('Category', schema)