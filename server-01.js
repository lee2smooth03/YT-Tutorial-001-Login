//CREATING THE BASIC EXPRESS APPLICATION
const express = require('express');     //importing express
const app = express();                  //get 'app' variable; calling the express function

app.listen(3000);                       //basic app running on localhost PORT 3000

//this app returns "CANNOT GET /" because has no routes set up
//@04:00 go over to server-02.js