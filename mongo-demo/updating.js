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

async function updateCourses(id) {
	const course = await Course.findById(id);
	if (!course) return;

	// course.isPublished = true;
	// course.author = "Another Author";
	course.set({
		isPublished: true,
		author: "Another Author"
	});

	const result = await course.save();
	console.log(result);
}

updateCourses("5a68fdc3615eda645bc6bdec");
