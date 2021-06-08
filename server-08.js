if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const app = express();

const initializePassport = require('./passport-config');
initializePassport(passport, 
    email   => users.find(user => user.email === email),
    id      => users.find(user => user.id === id)
);     

const users = [];

app.set('view-engines', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,                              
    resave: false,          
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

//ROUTES
app.get("/", checkAuthenticated, (req, res) => {
    //the user only exists in array after registration
    //middleware does a check before passing data to page
    //isAuthenticated must be inherent to passport
    res.render('index-02.ejs', { name: req.user.name });
});

app.get("/login", checkNotAuthenticated, (req, res) => {
    res.render('login.ejs');
    //middleware prevents this page from being accessed if user is logged in
});

app.get("/register", checkNotAuthenticated, (req, res) => {
    res.render('register.ejs');
    //middleware prevents this page from being accessed if user is logged in
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true

    //successful redirect seems like it could have an array of options
    //depending on the role, this is where I'd want different pages set
    //ex: redirect if you're an admin, redirect if you are an expert, user 

    //middleware prevents this page from being accessed if user is logged in
}));

app.post("/register", checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
    
        users.push({
            id: Date.now().toString(),
            name: req.body.name, 
            email: req.body.email, 
            password: hashedPassword
        });

        //if successful, redirect them to login to sign in
        res.redirect('/login');
    } catch {
        //if unsuccessful, redirect them to re-register info
        res.redirect('/register'); 
    }

    //middleware prevents this page from being accessed if user is logged in
    console.log(`\nnew user added:`);
    console.log(users);
});

//33:30
//the user needs a way to log out
app.delete('/logout', (req, res) => {
    req.logOut();   //passport has set this up for automatic use; clears session
    res.redirect('/login');

    //delete cannot be done directly from HTML
    //this route (and logOut method) needs TO use a form and POST to be called
    //need to add the method-override to our dependencies to be able to use DELETE method in a form
});

//30:15
//create f(x) protect routes for when users are not logged in
function checkAuthenticated(req, res, next){
    //middleware that checks to see if the user is authenticated
    //passport allows us to call some functions on-request
    if(req.isAuthenticated()){  //true if authenticated;
        return next();
    }

    //if it does return false (false = no user), redirect user
    res.redirect('/login');

    //this middleware can now be used above; mount it to other
}

//31:55
//if a user already exists in the system
function checkNotAuthenticated(req, res, next){
    //middleware is almost the exact same as above; CCP
    if(req.isAuthenticated()){
        //if they are already authenticated, send to home
        return res.redirect('/')
    }

    //if they are not authenticated, continue with route
    next();

    //in this project, users cannot go to login or register
    //if they are already authenitcated, user will be redirected
    //from redundant pages; no need to go to some pages once profile is est.
}

app.listen(3000);