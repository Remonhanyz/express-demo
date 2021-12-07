// Build a web server
const express = require('express');
const app = express();

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
})

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