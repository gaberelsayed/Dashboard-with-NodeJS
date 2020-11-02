const mongoose = require('mongoose');
let residentNotificationSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    residentID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true });
let residentNotification = mongoose.model('residentNotification', residentNotificationSchema);
module.exports = residentNotification;