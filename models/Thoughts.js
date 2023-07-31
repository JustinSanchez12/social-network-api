const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

//Schema to create Thought Model

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            getters: true,
        },
        username: {
            type: String,
            required: true,
        },
        //array of nested documents created with the reactionSchema
        reactions: [reactionSchema],
    });

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;