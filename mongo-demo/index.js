const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now}, //data type is Date and the default value is now (this way you don't have to specify a date when you declare this object)
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema) // a Course class

async function createCourse() {
    const course = new Course({
        name: 'Node.js Course',
        author: 'Mosh',
        tags: ['node', 'backend'],
        isPublished: true
    }) // an object of the class Course

    const result = await course.save() //return the course object that is saved in database (id is added automatically)
    console.log(result)
}

async function getCourses() {
    const courses = await Course
        .find({ author: 'Mosh' }) // returns list of documents with the given filters
        .limit(10) // limit the list to 10 results
        .sort({ name: 1 }) // sort the list in ascending (1) or descending (-1) order based on a key value
        .select({ name: 1, tags: 1 }) // select the set of properties that you want to return from the schema (id is always returned  by default)
    
}
createCourse()