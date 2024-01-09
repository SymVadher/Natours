const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { logger } = require("./utils/logger");

process.on("uncaughtException", (err) => {
  logger.error("Unhandled Exception!!!");
  logger.error(err.name, err.message);
  process.exit(1);
});
dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.MONGO_URL.replace(
  "<PASSWORD>",
  process.env.MONGO_Password
);
mongoose.connect(DB).then(() => logger.info("Database connected successfully"));

const server = app.listen(8000, () => {
  logger.info("Server Started");
});

process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection!!! Shutting Down...", err);
  server.close(() => {
    process.exit(1);
  });
});
