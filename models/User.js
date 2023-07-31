const { Schema, model } = require('mongoose');

//Schema to create an user model

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(email);
            },
            message: 'Please provide a valid email address'
        }
    },
    thoughts: {
        type: Schema.Types.ObjectId,
        //reference the Thought Model
        ref: 'Thought' 
    },
    friends: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;