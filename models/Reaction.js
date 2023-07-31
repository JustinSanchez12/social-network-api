const { Schema, model, default: mongoose } = require('mongoose');

// Schema to create Reaction model

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: ObjectId,
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
            deafult: Date.now(),
            getters: true,
        },
    })