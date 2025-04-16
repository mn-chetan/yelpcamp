const mongoose = require("mongoose");
const Campground = require("../models/campground");
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
    const randomCityIndex = random(cities);
    await Campground.create({
      location: `${cities[randomCityIndex].city}, ${cities[randomCityIndex].state}`,
      title: `${descriptors[random(descriptors)]} ${places[random(places)]}`,
    });
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
