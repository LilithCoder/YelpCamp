var mongoose   = require("mongoose"),
	Campground = require("./models/campground"),
	Comment    = require("./models/comment");

var data = [
	{
		name: "Grand Canyon Camp",
		image: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60", 
		description: "There are total of 50 campsites most of which are sized to accommodate tents or smaller RVs or Travel Trailers. No utility, water, or sewer hook-ups. Each site has a campfire grill for fires and cooking use and a picnic table. Only restroom avaliable."
	},
	{
		name: "Yellowstone National Park", 
		image: "https://images.unsplash.com/photo-1559637942-becc087f42ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60", 
		description: "Yellowstone offers 12 campgrounds with over 2,000 sites."
	},
	{
		name: "Yosemite National Park", 
		image: "https://images.unsplash.com/photo-1516173953256-444587fcd3ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60", 
		description: "Not just a great valley, but a shrine to human foresight, the strength of granite, the power of glaciers, the persistence of life, and the tranquility of the High Sierra. First protected in 1864, Yosemite National Park is best known for its waterfalls, but within its nearly 1,200 square miles, you can find deep valleys, grand meadows, ancient giant sequoias, a vast wilderness area, and much more."
	},
	{
		name: "San Bernardino Forest", 
		image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60", 
		description: "The San Bernardino National Forest is a nearby oasis for millions of Southern Californians who want to escape for the weekend and go camping. Many campgrounds are adjacent to beautiful natural areas and you can find solitude on quiet wilderness trails."
	}
];

function seedDB(){
	//Remove all Campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		} else {
			console.log("All campgrounds removed!");
		}
		Comment.remove({}, function(err){
			if(err){
				console.log(err);
			} else {
				console.log("Comments Removed!");
				//Add campgrounds
				data.forEach(function(seed){
					Campground.create(seed, function(err, campground){
						if(err){
							console.log(err);
						} else {
							console.log("One Campground Created!");
							// add a comment for one campground
							Comment.create(
								{
									text: "This is the best place for camping! Highly Recommended!",
									author: "nameless"
								}, function(err, comment){
								if(err){
									console.log(err);
								} else {
									campground.comments.push(comment);
									campground.save();
									console.log("New Comment Created!");
								}
							});
						}
					});
				});
			}
		});
	});
}

module.exports = seedDB;