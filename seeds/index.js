const mongoose = require("mongoose");
const Campground = require("../models/Campground");
const { descriptors, places } = require("./seedHelpers");
const cities = require("./cities");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp").catch((error) => {
  console.log(error);
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});
mongoose.connection.on("connected", () => {
  console.log("Connected to DB");
});

const random = (array) => Math.floor(Math.random() * array.length);

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    await Campground.create({
      location: `${cities[random(cities)].city}, ${
        cities[random(cities)].state
      }`,
      title: `${random(descriptors)} ${random(places)}`,
    });
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
