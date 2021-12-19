// Build a web server
const startupDebugger = require('debug')('app:startup') //to define the name space for debugging (use: 'export DEBUG=app:startup' to define the name sapce)
const dbDebugger = require('debug')('app:db') //to define the name space for debugging
const config = require("config")
const helmet = require("helmet");
const morgan = require('morgan')
const express = require("express");
const app = express();
const log = require("./middleware/logger");
const courses = require('./routes/courses')
const home = require('./routes/home');

app.set('view engine', 'pug') //to set the view engine for rendering HTML
app.set('views', './views') //to specify where the HTML files (views) are

console.log(`NODE_ENV: ${process.env.NODE_ENV}`); //returns the state of current inviroment (returns undefined by default)
console.log(`app: ${app.get('env')}`) //returns the state of current inviroment (returns development by default)

app.use(express.json()); //important middleware that converts body to JSON
app.use(log);
app.use(express.urlencoded({ extended: true })); // do the same thing as express.json but with html forms
app.use(express.static("public")); //middleware to serve static files (such as css & images ..etc) to the root of the site
app.use(helmet()) //for security purposes
app.use('/api/courses', courses) // use the router 'courses' for any request related to the api 'api/courses'
app.use('/', home);

//Configuration
console.log('Application Name: ' + config.get('name'))
console.log('Mail Server: ' + config.get('mail.host'))
console.log('Mail Password: ' + config.get('mail.password')) //it reads the password from the enviroment variables (the enviroment variable is app_password and it was maped to password in the file custom-enviroment-variables.json) (you better store passwords in an enviroment variable than in a config file) (use export app_password in the terminal to set the enviroment variable)

if (app.get('env') == 'development') {
  app.use(morgan('tiny')) //logging http requests
  startupDebugger('Morgan enabled...')
}

//database debugging
dbDebugger('Connected to the database...')

// Listen on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
