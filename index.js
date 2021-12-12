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
    const result = validayeCourse(req.body);
    console.log(result);

    if(result.error) {
        //400 bad request
        res.status(400).send(result.error.details[0].message);
        return;
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

//update a course
app.put('/api/courses/:id', (req, res) =>{
    // Look up the course
    // if doesn't exist return 404
        //search the array for the requested id
    let course = courses.find(c => c.id === parseInt(req.params.id));
        //return a status code 404 if id is not found
    if (!course) {
        res.status(404).send('The course with the given ID was not found')
        return;
    }
    
    //validate
    // if in valid return 404
    const result = validayeCourse(req.body);
    if(result.error) {
        //400 bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    //update course
    course.name = req.body.name;
    //return updated course to client
    res.send(course);

})

app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    // if doesn't exist return 404
        //search the array for the requested id
    let course = courses.find(c => c.id === parseInt(req.params.id));
        //return a status code 404 if id is not found
    if (!course) {
        res.status(404).send('The course with the given ID was not found')
        return;
    }
    //delete the course
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    //return updated course to client
    res.send(course);
})

// search in database
//eg: localhost:5000/api/courses/1
app.get('/api/courses/:id', (req, res) => {
    //search the array for the requested id
    let course = courses.find(c => c.id === parseInt(req.params.id));
    //return a status code 404 if id is not found
    if (!course) {
        res.status(404).send('The course with the given ID was not found')
        return;
    }
    //return data
    res.send(course);
})

function validayeCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

// Listen on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));