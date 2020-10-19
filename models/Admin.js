const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'الاسم المطلوب إجباري'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'البريد مطلوب إجباري'],
        unique: true,
        trim: true,
        match: /^\w+([-+.]\w+)*@((yahoo|gmail)\.com)$/
    },
    password: {
        type: String,
        required: [true, 'كلمة السر إجباري'],
        trim: true
    }
});
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
