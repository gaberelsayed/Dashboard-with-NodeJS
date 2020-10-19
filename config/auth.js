module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) return next();
        else {
            req.flash('error', 'من أجل ذيارة تلك الصفحة سجل دخولك أولًا');
            res.redirect('/auth/login');
        }
    },
    forwardAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) res.redirect('/dashboard');
        else return next();
    }
};