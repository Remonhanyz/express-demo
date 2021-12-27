const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost/mongo-exercises")
	.then(() => console.log("Connected to MongoDB..."))
	.catch((err) => console.log(err));

const courseSchema = mongoose.Schema({
	tags: [String],
	date: {
		type: Date,
		default: Date.now()
	},
	name: String,
	author: String,
	isPublished: Boolean,
	price: Number
});

const Course = mongoose.model("Course", courseSchema);

// the previous method returns a whole document which you can then check for a condition in it and then update it
// here the document is not returned but updated on the database immediatly

async function updateCourses(id) {
	// this doesn't return the document but updates the document directly on the database returns the number of documents that was modified
	// const result = await Course.updateOne({ _id: id }, {
	// 	$set: {
	// 		author: 'Mosh',
	// 		isPublished: false
	// 	}
	// });
	
	// this update the document and returns the updated document
	const result = await Course.findByIDAndUpdate(id , {
		$set: {
			author: 'Mosh',
			isPublished: false
		}
	}, { new: true });
	console.log(result);
}

updateCourses("5a68fdc3615eda645bc6bdec");
