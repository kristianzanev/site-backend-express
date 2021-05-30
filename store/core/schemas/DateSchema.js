const mongoose = require('mongoose');
const schema = mongoose.Schema({
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
        this.set({ updated_at: Date.now() }); // forcing date update on each hook
    });
});

module.exports = schema;