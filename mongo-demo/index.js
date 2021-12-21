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

// Schema Types are:
    // String
    // Number
    // Date
    // Buffer (for binary values)
    // Boolean
    // ObjectID
    // Array