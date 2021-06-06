//this file holds all of the passport-related info
//it willl need to be required by any file that uses it

//17:00
//get the strategy (class) from local version of passport
const LocalStrategy = require('passport-local').Strategy;

//20:20
//use bcrypt to make sure the user's p/w matches
const bcrypt = require('bcrypt');

//21:50
//need to pass in the getUserByEmail function

//26:50
//need to add async in front of finitialize function
function initialize (passport, getUserByEmail) {
    //initialize our passport...which will be passed to this f(x)
    //can do all of our configuration of passport inside this file

    //18:00
    //define a function that passport.use can use to authenticate
    //this functinon will act as the second variable passed
    const authenticateUser = async (email, password, done) => {

        //19:10
        //make sure email and p/w are correct
        const user = getUserByEmail(email)  //function will be created
        if (user == null) {
            //if no user is found
            return done(null, false, { message: 'user not found'});
            //done function returns the following
            //(the error, the user that was found, a message)
        }

        //20:30
        //using bcrypt to compare passwords
        //bcrypt is asynchronous so it uses try|catch
        try {
            //check the p/w that user sent in w/form @line19
            if (await bcrypt.compare(password, user.password)){
                //authenticated user if true, return user
                done(null, user);
            } else {
                //user p/w did not match
                done(null, false, {message: 'password incorrect'});
                //done(no err, no user, our message back)
            }
            
        } catch(error) {
            //error with the application
            done(error);
        }
    }

    //17:25
    //use the local strategy here
    //the strategy takes options:
        //1st option: what is our u/n called in our app? (default is u/n; we call it 'email');
        //2nd option: what is our p/w called? (by default, it's p/w; we are using the default);
    passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser)); //no need to specify p/w
    //2nd variable in use is a function to authenticate user that we must create

    //18:45
    //set up passport for de/serializing our user to store in-session
    passport.serializeUser((user, done) => { });

    passport.deserializeUser((id, done) => { });
}

//22:00
//make sure we export the initialize function to be used elsewhere
module.exports = initialize;