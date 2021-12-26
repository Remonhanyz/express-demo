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

createCourse()