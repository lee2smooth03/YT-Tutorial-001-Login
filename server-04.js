//CREATING THE BASIC EXPRESS APPLICATION
const express = require('express');
const app = express();

app.set('view-engines', 'ejs')

app.get("/", (req, res) => {
    res.render('index-02.ejs', { name: 'Master' });
});

//server-04.js creates routes for the new pages:
app.get("/login", (req, res) => {       //login page
    res.render('login.ejs');
});

app.get("/register", (req, res) => {    //registration
    res.render('register.ejs');
});

app.listen(3000);