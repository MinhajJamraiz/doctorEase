const connectDB = require("./DB");
const logger = require("./utils/logger");
const app = require("./app");

//DATABASE CONNECTION
connectDB();

//SERVER HOSTING
app.get("/", (req, res) => res.send("API Running !!"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Application listening on port ${PORT}!`);
});
//UNHANDLED REJECTIONS
process.on("unhandeledRejection", (err) => {
  logger.error(`${err.name}  , ${err.message}`);
  logger.info("UNHANDLED REJECTION. Shutting Down.......");
  server.close(() => {
    process.exit(1);
  });
});
