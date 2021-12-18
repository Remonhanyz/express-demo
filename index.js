// Build a web server
const startupDebugger = require('debug')('app:startup') //to define the name space for debugging (use: 'export DEBUG=app:startup' to define the name sapce)
const dbDebugger = require('debug')('app:db') //to define the name space for debugging
const config = require("config")
const helmet = require("helmet");
const morgan = require('morgan')
const Joi = require("joi"); //used for input validation, it returns a class
const express = require("express");
const app = express();
const log = require("./logger");

app.set('view engine', 'pug') //to set the view engine for rendering HTML
app.set('views', './views') //to specify where the HTML files (views) are

console.log(`NODE_ENV: ${process.env.NODE_ENV}`); //returns the state of current inviroment (returns undefined by default)
console.log(`app: ${app.get('env')}`) //returns the state of current inviroment (returns development by default)

app.use(express.json()); //important middleware that converts body to JSON
app.use(log);
app.use(express.urlencoded({ extended: true })); // do the same thing as express.json but with html forms
app.use(express.static("public")); //middleware to serve static files (such as css & images ..etc) to the root of the site
app.use(helmet()) //for security purposes

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

//create dummy database
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
    res.render('index', {title: 'My Express App', message: 'Hello'}) //to render a specific HTML file
});

app.post("/api/courses", (req, res) => {
  const result = validateCourse(req.body);
  console.log(result);

  if (result.error) {
    //400 bad request
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  //add the new data to database
  courses.push(course);
  //return the added data to the user
  res.send(course);
});

//update a course
app.put("/api/courses/:id", (req, res) => {
  // Look up the course
  // if doesn't exist return 404
  //search the array for the requested id
  let course = courses.find((c) => c.id === parseInt(req.params.id));
  //return a status code 404 if id is not found
  if (!course) {
    res.status(404).send("The course with the given ID was not found");
    return;
  }

  //validate
  // if in valid return 404
  const result = validateCourse(req.body);
  if (result.error) {
    //400 bad request
    res.status(400).send(result.error.details[0].message);
    return;
  }

  //update course
  course.name = req.body.name;
  //return updated course to client
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  // Look up the course
  // if doesn't exist return 404
  //search the array for the requested id
  let course = courses.find((c) => c.id === parseInt(req.params.id));
  //return a status code 404 if id is not found
  if (!course) {
    res.status(404).send("The course with the given ID was not found");
    return;
  }
  //delete the course
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  //return updated course to client
  res.send(course);
});

// search in database
//eg: localhost:5000/api/courses/1
app.get("/api/courses/:id", (req, res) => {
  //search the array for the requested id
  let course = courses.find((c) => c.id === parseInt(req.params.id));
  //return a status code 404 if id is not found
  if (!course) {
    res.status(404).send("The course with the given ID was not found");
    return;
  }
  //return data
  res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}

// Listen on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
