# YouTube Tutorial: Login Page #
Teacher: (http://www.dotcom.com)  
Login pages help legitimize sites that act as business conduits. Separating a site's inner content from its basic advertising draws/previews that are found on the main landing pages offer exclusive user experiences.  

__*come join our community: log in...*__

### Technologies
In this demonstration //the teacher// uses the following:
- an .ejs file is a reusable file component with variables
- passport (https://www.passportjs.org/) is authentication middleware

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

https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet