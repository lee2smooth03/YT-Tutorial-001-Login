//CREATING THE BASIC EXPRESS APPLICATION
const express = require('express');
const app = express();

//@11:35 include bcrypt for password hashing
const bcrypt = require('bcrypt');       //access to the variable


//@10:45 empty array created to store users in lieu of db
const users = [];

app.set('view-engines', 'ejs');
//getting info from userforms requires the:
app.use(express.urlencoded({ extended: false }));
//now we can access form data in POST req variable 

app.get("/", (req, res) => {
    res.render('index-02.ejs', { name: 'Master' });
});

app.get("/login", (req, res) => {
    res.render('login.ejs');
});

app.get("/register", (req, res) => {
    res.render('register.ejs');
});

//server-05.js creates POST routes for the new pages:
app.post("/login", (req, res) => {

});

app.post("/register", async (req, res) => {
    //whatever value after "req.body" corresponds to name values from form
    //11:50 create a new user with the correct hashed password

    //12:00 the callback function is now described by "async"    
    //use a try-catch block because we are using async code
    try {
        //create a hashed password using bcrypt, which requires:
        //1st argument = the data or password to be hashed
        //2nd argument = the number of times data is hashed (more times is more secure)

        //in an ansynchronous call, the values must be waited on
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        
        //13:00 push a new user to the array (eventual database)
        users.push({
            id: Date.now().toString(),  //automatcally generated
            name: req.body.name, 
            email: req.body.email, 
            password: hashedPassword
        });

        //13:45 if all is successful, redirect user back to login
        //they can now login with an account they just registered
        res.redirect('/login');
    } catch {

        //13:50 if there is an err, user goes back to register
        res.redirect('/register'); 
    }
//this is the entire application for registering users/people
console.log(`new user added:`);
console.log('\n'+ users);
});

app.listen(3000);