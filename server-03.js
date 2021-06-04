//CREATING THE BASIC EXPRESS APPLICATION
const express = require('express');
const app = express();

//server-03.js tells the server that we are usng .ejs files...
//by setting the view-engine to ejs (makes use of dependency)
app.set('view-engines', 'ejs')  //can now use ejs in the template

app.get("/", (req, res) => {    //as an example, pass down a name
    res.render('index-02.ejs', { name: 'Master' });

    //IDK if the name can be passed down BECAUSE of ejs or if
    //passing down a variable in this way would be allowed in
    //traditional uses of res.# methods.
});

app.listen(3000);                       //basic app running on localhost PORT 3000 