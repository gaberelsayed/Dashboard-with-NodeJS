// @Admin Router

// Require Express Framework
const express = require('express');
const router = express.Router();

// Require forwardAuthenticated
const { forwardAuthenticated } = require('../config/auth');

// Require Packages
const passport = require('passport');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

// Require Admin Model
const Admin = require('../models/Admin')

// Login Authentication
router.get('/login', forwardAuthenticated, async (req, res) => {
   try {
       res.render('Auth/auth-login');
   } catch(err) {
    req.flash('error', 'حدث خطأ ما بالسيرفر');
    res.redirect('/login')
   }
});
router.post('/login', forwardAuthenticated, (req, res) => {
    if (!req.body.email || !req.body.password) {
        req.flash('error', 'جميع الحقول يجب أن تكون مملوئة');
        res.redirect('/auth/login');
    } else {
        passport.authenticate('local.login', {
            successRedirect: '/dashboard',
            failureRedirect: '/auth/login',
            failureFlash: true
        })(req, res);
    }
});

// Register Authentication
router.get('/register', forwardAuthenticated, async (req, res) => {
    try {
        res.render('Auth/auth-register');
    } catch(err) {
     req.flash('error', 'حدث خطأ ما بالسيرفر');
     res.redirect('/register')
    }
    
});
router.post('/register', forwardAuthenticated, async (req, res) => {

    try {
        const { fullname, email, password, confirmPassword } = req.body;

        if (fullname.length < 6) {
            req.flash('error', 'الاسم يجب أن يكون أكثر من 6 أحرف');
            return res.redirect('/auth/register')
        }
        if (!(/^\w+([-+.]\w+)*@((yahoo|gmail)\.com)$/.test(email))) {
            req.flash('error', 'البريد الإلكتروني يجب أن يكون جميل أو ياهو');
            return res.redirect('/auth/register')
        }
        if (password.length < 6) {
            req.flash('error', 'كلمة المرور يجب أن تكون أكثر من 6 أحرف');
            return res.redirect('/auth/register')
        }
        if (password.length !== confirmPassword.length) {
            req.flash('error', 'كلمتا المرور غير متطابقين');
            return res.redirect('/auth/register')
        }
        passport.authenticate('local.signup', {
            successRedirect: '/dashboard',
            failureRedirect: '/auth/register',
            failureFlash: true
        })(req, res);
    } catch (err) {
        req.flash('error', 'حدث خطأ ما بالسيرفر');
        res.redirect('/auth/register')
    }
});


// Forgot Password Authentication
router.get('/forgot-password', forwardAuthenticated, async (req, res) => {
    try {
        res.render('Auth/auth-forgot-password');
    } catch(err) {
     req.flash('error', 'حدث خطأ ما بالسيرفر');
     res.redirect('/forgot-password')
    }
   
})
router.post('/forgot-password', forwardAuthenticated, async (req, res) => {
    if (!(/^\w+([-+.]\w+)*@((yahoo|gmail)\.com)$/.test(req.body.email))) {
        req.flash('error', 'البريد الإلكتروني يجب أن يكون جميل أو ياهو');
        return res.redirect('/auth/forgot-password')
    }
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
        req.flash('error', 'الحساب غير موجود مُسبقًا');
        return res.redirect('/auth/forgot-password');
    }
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'AbdulrahmanFawzy999@gmail.com',
            pass: 'sxgqljelmksfsuuo'
        }
    });
    let mailOptions = {
        to: admin.email,
        from: 'AbdulrahmanFawzy999@gmail.com',
        subject: 'Reset your password',
        html: `
              <p> You are receiving this because you (or someone else) has requested the reset of the password for your account. 
              </p>
              <p>
              Please click on the following link to complete the process
              </p>
              <a href="http://dashboard.wezara.me/auth/reset-password/${admin._id}" target="_blank">Follow</a>
              <p>If you did not request this, please ignore this email and your password will remain unchanged. </p>`
    };
    transporter.sendMail(mailOptions, function (err) {
        if (err) {
            req.flash('error', `حدث خطأ ما بالسيرفر`);
            res.redirect('/auth/forgot-paswsord');
        } else {
            req.flash('success', 'قمنا بإرسال رسالة إلى بريدك الإلكتروني قم بفحصها');
            res.redirect('/auth/forgot-password');
        }
    });
});
router.get('/reset-password/:id', forwardAuthenticated, async (req, res) => {
    try {
        const admin = await Admin.findOne({ _id: req.params.id });
        if (admin) {
            res.render('Auth/resetPassword', { specialID: req.params.id })
        }
        else {
            req.flash('error', 'هذا الحساب غير موجود');
            res.redirect("/auth/forgot-password");
        }
    } catch (err) {
        req.flash('error', 'حدث خطأ ما في السيرفر');
        res.redirect("/auth/forgot-password");
    }
});
router.post('/updatePassword', forwardAuthenticated, async (req, res) => {
       try {
        const { password, confirmPassword, specialID } = req.body;


        if (password.length < 6) {
            req.flash('error', 'كلمة المرور يجب أن تكون أكثر من 6 أحرف');
            return res.redirect(`/auth/reset-password/${ req.body.specialID }`)
        }

        if (password.length !== confirmPassword.length) {
            req.flash('error', 'كلمتا المرور غير متطابقين');
            return res.redirect(`/auth/reset-password/${ req.body.specialID }`)
        }

        await Admin.findOneAndUpdate({ _id: specialID }, { password: await bcrypt.hash(password, 10) } );
        req.flash('success', 'تم تغيير كلمة السر بنجاح');
        return res.redirect(`/auth/login`);

       } catch(err) {
        req.flash('error', 'حدث خطأ ما في السيرفر');
        return res.redirect(`/auth/reset-password/${ req.body.specialID }`)
       }
       
  });

// Logout (Session Expired)
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success', 'تم تسجيل الخروج بنجاح');
    res.redirect('/auth/login');
});
module.exports = router;
