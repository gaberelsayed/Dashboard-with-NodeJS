const mongoose = require('mongoose');
let userNotificationchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true });
let userNotification = mongoose.model('userNotification', userNotificationchema);
module.exports = userNotification;