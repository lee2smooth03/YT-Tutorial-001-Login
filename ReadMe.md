# YouTube Tutorial: Login Page #
Teacher: (http://www.dotcom.com)  
Login pages help legitimize sites that act as business conduits. Separating a site's inner content from its basic advertising draws/previews that are found on the main landing pages offer exclusive user experiences.  

__*come join our community: log in...*__

### Technologies
In this demonstration //the teacher// uses the following:
- an .ejs file is a reusable file component with variables
- bcrypt allows developers to hash passwords, then compare
- passport (https://www.passportjs.org/) is authentication middleware
- express-sessions to validate a user across different pages
- express-flash displays msg (in passport) for wrong info

### Goals
1. simply complete the tutorial as demonstrated above
2. (stretch) then use CSS to imporove the working result
3. (stretch) create a login page that determines route based on user roles:
    + administrator
    + expert roles
    + user roles
4. (probable) revert from .ejs back to "regular" for the long-term solution
5. (stretch) when people register, store their names in an online database

__*my stretch goals may be executed in separate projects*__

## Boilerplate Template for a Login System
### Project Overview
- three pages:
    1. registration
        * create name
        * create password
        * enter (valid) email
    2. login page
        * enter email
        * enter password
    3. "welcome"
        * "hello (name)"
- five inputs:
    1. (x1) name
        * welcome page
    2. (x2) email
        * registration page
        * login page
    3. (x2) password
        * registration page
        * login page
- two buttons:
    1. register
        * saves the user's data (into a database)
    2. login
        * validates the user's data (to gain access)
- two hyperlinks:
    1. register
        * links user to the registration page
    2. login
        * links user to the login page
### Project Set-up (by Time)
#### @01:30
- initialize the project (with default values)
- using npm to store all of the dependencies in .json
    + CLI | npm init  

#### @01:55
- installing the first two packages needed for this project
    + npm i express ejs
        * express is the application server
        * ejs is the templating language for views  

#### @02:15
- installing development packages (used in development only)
    + npm i --save-dev nodemon dotenv
        * nodemon allows automatic restarts to the server
        * dotenv allow us to use|save environment variables  

#### @02:30
- creates .env and .gitignore
    + CLI | touch .env .gitignore
        * environment variables go in the .env
        * the ignore file names node modules, the .env, and any other files that contain sensitive information  

#### @02:55
- configure the package.json to start server inside "scripts"
    + within the "scripts" property, add the following... 
    ```
    "scripts" : { "devStart" : "nodemon server.js" }
    ```
- create server.js and run it using npm
    + CLI | touch server.js
    + CLI | npm run devStart    //check json to see devStart  
    (every saved change restarts the server and rerun code)  

#### @03:35
- setting up the basic express application(s)
    + @03:50 go to the "server-01.js" file
    + @04:00 go to the "server-02.js" file  

#### @04:30
- server-02.js renders an .ejs file that does not yet exist
- the eventual .ejs file resides in a folder called "views"
    + CLI | mkdir views
    + CLI | touch views/index.ejs  

#### @04:45
- save the /h1/ text in the file, then refresh the webpage
- to use .ejs syntax, the server needs to be explicitely told
    + @04:50 go to the "server-03.js" file

#### @05:35
- with successful rendering (server-03) set up other pages
- create the login page and the register page under "views"
    + CLI | touch views/login.ejs views/register.ejs
    + @05:45 go to the "server-04.js" file
    + @06:15 add text to identify new page

#### @06:30
- the server-04 file delivers rendered pages without issue
- details will be added to those respective pages

#### @07:05
- new server file will include POST routes for new views
    + @07:05 go to the "server-05.js" file

#### @10:30
- the demonstration does not include a database connection
- in lieu of the db connection, the demo uses an array var
    + @10:45 go to the "server-05.js" file

- users' passwords will be hashed using a new technology
- bcrypt allows us to hash users' passwords then compare
    + CLI | (hit "+" to open a new terminal)
    + CLI | npm i bcrypt
    + @11:15 go to the "server-05.js" file

#### @14:25
- the registration code works, but in a limited condition:
- everytime the server restarts, users[] is reset to empty
- login functionality will work by matching users' u/n & p/w

- persist users across different requests is really involved
- passport.js is imported to assist in authentication
    + CLI | npm i passport passport-local (for u/n and p/w)

- the local version allows the use of u/n and p/w for login
- passport has several ways to login (Google, Facebook, etc)
- to store and persist user across different pages: sessions
    + CLI | npm i express-sessions
    + CLI | npm i express-flash

#### @16:00
- create a separate file to keep the server file manageable
    + CLI | touch passport-config.js

#### @28:00
- app registration is functional with server-06.js
- messages (wrong info) are displayed on the login page, but
- correct user entries do not redirect user to the main page
    + Kyle (teacher) is getting an error that I am not
    + @28:00 go to the "server-07.js" file

#### @29:15
- registration and login sequence bring you to homepage
    + welcome page still displays generic name (corrected)
    + problem is that we can GO to index page w/ no user
        * the "/" route should not be accessible w/ no user

#### @30:05
- protect the routes for when a user is not logged in
    + @28:00 go to the "server-08.js" file

- when a user does not exist, they are redirected to login
- when a registered user goes to login, they are sent home

#### @33:30
- user needs a way to log out

https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet