const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Tour = require("../../Models/tourModel");
const User = require("../../Models/userModel");
const Review = require("../../Models/reviewModel");
const { logger } = require("../../utils/logger");

dotenv.config({ path: `${__dirname}/../../config.env` });

const DB = process.env.MONGO_URL.replace(
  "<PASSWORD>",
  process.env.MONGO_Password
);
mongoose.connect(DB).then(() => logger.info("Database connected successfully"));

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`), "utf-8");
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`), "utf-8");
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`),
  "utf-8"
);

const loadData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    logger.info("Data Loaded");
  } catch (err) {
    logger.info(err);
    logger.info("Loading Failed");
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    logger.info("Data Deleted");
  } catch (err) {
    logger.info("Deleting Failed");
  }
};

async function reset() {
  await deleteData();
  await loadData();
}
if (process.argv[2] == "--load") {
  loadData();
} else if (process.argv[2] == "--delete") {
  deleteData();
  process.exit();
} else if (process.argv[2] == "--reset") {
  reset();
}
