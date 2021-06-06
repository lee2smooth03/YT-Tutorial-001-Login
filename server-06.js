//CREATING THE BASIC EXPRESS APPLICATION

//23:55
//load in the environment variables
if (process.env.NODE_ENV !== 'production'){ //meaning we're in development
    require('dotenv').config();             //this is the development dependency

    //this line loads in all diff environment variables
    //sets them inside process.env
}
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

//16:45
//create the passport variable using imported library
const passport = require('passport');

//23:00
const flash = require('express-flash');
const flash = require('express-session');

//16:25
//require the function that initializes passport from external
const initializePassport = require('./passport-config');
initializePassport(passport, email => {
    //16:40 - call function and pass in passport
    //22:10 - after passport-config mods, pass in email

    //22:20 - return user whose email is the passed-in email
    return users.find(user => user.email === email);
    //22:40 - this line represents the getUserByEmail fx in config file
});     

const users = [];

app.set('view-engines', 'ejs');
app.use(express.urlencoded({ extended: false }));

//22:45
//add some use statements to that our server knows how to use passport
app.use(flash());
app.use(session({
    //session takes a few options
    secret: process.env.SESSION_SECRET, //a random string (representing a key)
                                        //found in the .env variables

    //other properties to be set:                                    
    resave: false,              //answer to: resave session variable if nothing changes?
    saveUninitialized: false    //answer to: do you want to save an empty value in the session if there is none?
}));

//24:45
//set up passport
app.use(passport.initialize()); //sets up some of the basics
app.use(passport.session());    //store variables tb be persistent across session; 
                                //works with app.use(session())

app.get("/", (req, res) => {
    res.render('index-02.ejs', { name: 'Master' });
});

app.get("/login", (req, res) => {
    res.render('login.ejs');
});

app.get("/register", (req, res) => {
    res.render('register.ejs');
});

//15:55
//set up the login to work with passport
//app.post("/login", (req, res) => {}});

//25:10
//POST route to login rewritten to simply use passport middleware
app.post('/login', passport.authenticate('local', {
    //pass it a list of things to be modified
    successRedirect: '/',       //if login is successful
    failureRedirect: '/login',
    failureFlash: true          //a message displays (passport config)

    //successful redirect seems like it could have an array of options
    //depending on the role, this is where I'd want different pages set
    //redirect if you're an admin, redirect if you are an expert, user 
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