// Build a web server
const Joi = require('joi'); //used for input validation, it returns a class
const express = require('express');
const app = express();

app.use(express.json()); //important middleware

//create dummy database
const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
]

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {

    if(!req.body.name || req.body.name.length < 3) {
        //400 bad request
        res.status(400).send('Name is required and should be min 3 characters');
    }

    const course = {
        id: courses.length+1,
        name: req.body.name
    };
    //add the new data to database
    courses.push(course);
    //return the added data to the user 
    res.send(course);
});


// search in database
//eg: localhost:5000/api/courses/1
app.get('/api/courses/:id', (req, res) => {
    //search the array for the requested id
    let course = courses.find(c => c.id === parseInt(req.params.id));
    //return a status code 404 if id is not found
    if (!course) res.status(404).send('The course with the given ID was not found')
    //return data
    res.send(course);
})

// Listen on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));