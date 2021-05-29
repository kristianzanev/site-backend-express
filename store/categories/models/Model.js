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
        default: Date.now(),
    },
    updated_at: {
        default: Date.now(),
        type: Date,
    }
});

const updateHooks = ['updateOne', 'update', 'updateMany', 'findOneAndUpdate', 'save'];

updateHooks.forEach(hook => {
    schema.pre(hook, function() {
        this.set({ updated_at: Date.now() });
    });
})



exports.Model = mongoose.model('Category', schema); // using only exports so it can be exported only to this folder level
