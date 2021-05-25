const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Products', schema);