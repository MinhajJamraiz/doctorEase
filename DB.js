const mongoose = require("mongoose");
const dotenv = require("dotenv");

const logger = require("./utils/logger");

//UNCAUGHT EXCEPTION
process.on("uncaughtException", (err) => {
  logger.error(`${err.name}  , ${err.message} , ${err.stack}`);
  logger.info("UNCAUGHT EXCEPTION. Shutting Down.......");
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

const connectDB = () => {
  // try {
  //   await mongoose.connect(DB);
  //   logger.info("DB Connection Successfull");
  // } catch (err) {
  //   console.log(err);
  //   logger.error(`'DB Connection Unsuccessfull'`);
  //   process.exit(1);
  // }
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
    })
    .then((con) => {
      logger.info("DB Connection Successfull");
    })
    .catch((ex) => {
      logger.error(`'DB Connection Unsuccessfull'`);
      process.exit(1);
    });
};

module.exports = connectDB;
