const { Schema, Types } = require('mongoose');

// Schema to create Reaction model

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            deafult: Date.now,
            getters: true,
        },
    })

    module.exports = reactionSchema;