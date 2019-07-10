require('dotenv').config();
var express        = require("express"),
	app 	       = express(),
	mongoose       = require("mongoose"),
	Campground     = require("./models/campground"),
	Comment	       = require("./models/comment"),
	seedDB	       = require("./seeds"),
	bodyParser     = require("body-parser"),
	methodOverride = require("method-override"),
	passport       = require("passport"),
	flash	       = require("connect-flash"),
	LocalStrategy  = require("passport-local"),
	User           = require("./models/user");

// requiring routes
var commentRoutes    = require("./routes/comments"),
	reviewRoutes     = require("./routes/reviews"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes      = require("./routes/index");

// seedDB();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
mongoose.set("useFindAndModify", false);

app.locals.moment = require('moment');

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "I am handsome and rich",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(reviewRoutes);

port = process.env.PORT || process.env.IP;
app.listen(port, function(){
	console.log("The YelpCamp Server Has Been Started");
});
