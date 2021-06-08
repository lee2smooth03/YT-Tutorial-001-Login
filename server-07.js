//CREATING THE BASIC EXPRESS APPLICATION

if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

const app = express();

const initializePassport = require('./passport-config');
initializePassport(passport, 
    //this will be a database search in live version
    email   => users.find(user => user.email === email),

    //28:45
    //this function is the getUserById argument passed in config
    //peep the syntax of the modified functions
    id      => users.find(user => user.id === id)
);     

//in lieu of a database...
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

//ROUTES
app.get("/", (req, res) => {
    //29:30
    //update the name to be the registered name from the form
    //res.render('index-02.ejs', { name: 'People' });
    console.log(req.user)
    res.render('index-02.ejs', { name: req.user.name });
});

app.get("/login", (req, res) => {
    res.render('login.ejs');
});

app.get("/register", (req, res) => {
    res.render('register.ejs');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true

    //successful redirect seems like it could have an array of options
    //depending on the role, this is where I'd want different pages set
    //ex: redirect if you're an admin, redirect if you are an expert, user 
}));

app.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
    
        users.push({
            id: Date.now().toString(),
            name: req.body.name, 
            email: req.body.email, 
            password: hashedPassword
        });

        res.redirect('/login');
    } catch {
        res.redirect('/register'); 
    }

console.log(`\nnew user added:`);
console.log(users);
});

app.listen(3000);