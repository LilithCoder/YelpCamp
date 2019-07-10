var mongoose = require("mongoose");
var Comment = require("./comment");
var Review = require("./review");

var campgroundSchema = new mongoose.Schema({
	name: String,
	price: String,
	image: String,
	description: String,
	location: String,
   	lat: Number,
    lng: Number,
	createdAt: { type: Date, default: Date.now },
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	// the comment property should be an array of comment ID
	// we just embed ID and reference to comments
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			//The ref attribute corresponds to the model name that we pass into the mongoose.model() method:
			ref: "Comment"
		}
	],
	reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    rating: {
        type: Number,
        default: 0
    }
}); 

module.exports = mongoose.model("Campground", campgroundSchema);