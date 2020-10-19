/*@ here we include express-framework @*/
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
app.set("io", io);
/*@ here we include express-framework @*/

/*@ here we include third-party middleware => responseTime @*/
const responseTime = require('response-time')
app.use(responseTime())
/*@ here we include third-party middleware => responseTime @*/

/*@ here we include third-party middleware => Morgan @*/
const morgan = require('morgan')
app.use(morgan('dev'))
/*@ here we include third-party middleware => Morgan @*/

/*@ here we connect to DB @*/
require('./Connection/connection')
/*@ here we connect to DB @*/

/*@ here we include static-files @*/
const path = require('path');
app.use('/assets', express.static(path.join(__dirname, 'assets')));
/*@ here we include static-files @*/

/*@ Passport Configuration @*/
require('./config/passport')
/*@ Passport Configuration @*/


/*@ here we set-up body-parser @*/
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
/*@ here we set-up body-parser @*/

// session as flash needs to session
const session = require('express-session')
app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 259200000054564564564645 }
}))

// falsh 
const flash = require('connect-flash')
app.use(flash())


/*@ Global variables @*/


/*@ Passport middleware @*/
const passport = require('passport')
app.use(passport.initialize())
app.use(passport.session())
/*@ Passport middleware @*/

app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    res.locals.errors = req.flash('errors')
    res.locals.user = req.user || null
    res.locals.title = 'good'
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
    next()
})




/*@ Global variables @*/
/*@ here we include adminRouter @*/
const Admin = require('./routes/Admin');
app.use('/auth', Admin);
/*@ here we include adminRouter @*/

//For set layouts of html view
var expressLayouts = require('express-ejs-layouts');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);



/*@ here is special @*/





/*@ here we include dashboardRouter @*/
const Dashboard = require('./routes/Dashboard');
app.use('/dashboard', Dashboard);
/*@ here we include dashboardRouter @*/

/*@ Handle Error-404 @*/
app.get('*', (req, res, next) => {
    res.redirect('/auth/login')
    
})
/*@ Handle Error-404 @*/

// setup event listener
io.on('connection', socket => {

    socket.on('joinAdmin', data => {
        socket.join(data.adminRoom);
    })

})
const port = process.env.PORT || 3000;
http.listen(port, () => {
    console.log('Running on Port: 3000')
})