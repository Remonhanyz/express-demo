// Build a web server
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
})

// Rout Parameters

// // returns back the id of this specific course
// app.get('/api/courses/:id', (req, res) => {
//     res.send(req.params.id);
// })

// // returns back the year & month as object based on the requested URL of this specific course
// //eg: localhost:5000/api/courses/2018/1
// app.get('/api/courses/:year/:month', (req, res) => {
//     res.send(req.params);
// })

// query stream parameters

// returns back the query stream parameters as an object based on URL
//eg: localhost:5000/api/courses/2018/1?sortBy=name
app.get('/api/courses/:id', (req, res) => {
    res.send(req.query);
})

// Listen on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));