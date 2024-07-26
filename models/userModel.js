const mongoose = require('mongoose');
const generateHelper = require('../helpers/generate');

const userSchema = new mongoose.Schema(
    {
        fullName: String,
        email: String,
        password: String,
        tokenUser: {
            type: String,
            default: generateHelper.string(32),
        },
        phone: String,
        avatar: String,
        friendList: [
            {
                user_id: String,
                room_chat: String,
            },
        ],
        acceptFriends: Array,
        requestFriends: Array,
        status: {
            type: String,
            default: 'active',
        },
        statusOnline: {
            type: String,
            default: 'offline',
        },
        deleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: Date,
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
