const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const path = require("path");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp").catch((error) => {
  console.log(error);
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});
mongoose.connection.on("connected", () => {
  console.log("Connected to DB");
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
});
