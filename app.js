const express = require("express");
const app = express();
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const path = require("path");

// Connect to local MongoDB for YelpCamp
mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp").catch((error) => {
  console.log(error);
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});
mongoose.connection.on("connected", () => {
  console.log("Connected to DB");
});

// Express config and routes
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

// Home view
app.get("/", (req, res) => {
  res.render("home");
});

// Campground view
app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
});

// Render form to add a new campground
app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

// Create a new campground
app.post("/campgrounds", async (req, res) => {
  const campground = await Campground.create(req.body);
  res.redirect(`/campgrounds/${campground._id}`);
});

// Show campground details
app.get("/campgrounds/:id", async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/show", { campground });
});

// Render form to edit a campground
app.get("/campgrounds/:id/edit", async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/edit", { campground });
});

// Update a campground
app.put("/campgrounds/:id", async (req, res) => {
  const campground = await Campground.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    { runValidators: true }
  );
  res.redirect(`/campgrounds/${campground._id}`);
});
