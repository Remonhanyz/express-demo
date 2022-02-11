// 12 bytes
    // 4 bytes: timestamp
    // 3 bytes: machine identifier
    // 2 bytes: process identifier
    // 3 bytes: counter

// Driver => mongoDB

const mongoose = require("mongoose")

const id = new mongoose.Types.ObjectId()

console.log(id.getTimestamp()) // to get the timestamp from id

const isValid = mongoose.Types.ObjectId.isValid("1234")
