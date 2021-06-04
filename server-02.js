//CREATING THE BASIC EXPRESS APPLICATION
const express = require('express');
const app = express();

//server-01.js returns "CANNOT GET /" because it has no routes set up
//server-02.js establishes the homepage route that logging in returns

app.get("/", (req, res) => {    //homepage route that logging in gets
    //@04:20 this route sends a page that we create (index.ejs)
    res.render('index.ejs')

});

app.listen(3000);                       //basic app running on localhost PORT 3000 