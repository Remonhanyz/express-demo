const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost/mongo-exercises")
	.then(() => console.log("Connected to MongoDB..."))
	.catch((err) => console.log(err));

const courseSchema = mongoose.Schema({
	name: { type: String, required: true },
	tags: [String],
	date: {
		type: Date,
		default: Date.now()
	},
	author: String,
	isPublished: Boolean,
	price: Number
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
	const course = new Course({
		name: "Angular Course",
		author: "Mosh",
		tags: ["angular", "backend"],
		isPublished: true,
		price: 15
	});
	try {
		// await course.validate(); //checks if the given course (document) data is valid
		const result = await course.save();
		console.log(result);
	}
	catch (ex) {
		console.log(ex.message)
	}
}

async function updateCourses(id) {
	const result = await Course.findByIDAndUpdate(id , {
		$set: {
			author: 'Mosh',
			isPublished: false
		}
	}, { new: true });
	console.log(result);
}


async function removeCourses(id) {
	const result = await Course.findByIdAndRemove(id); //returns the document then delete it
	console.log(result);
}

// removeCourses("5a68fdc3615eda645bc6bdec");
