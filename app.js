const express = require("express");
const userRouter = require("./routes/userRoutes");
const reportRouter = require("./routes/reportRoutes");
const globalErrorHandler = require("./controller/errorController");

const app = express();
//MiddleWares
//Body parser Middleware: Reading data from the body into req.body.
app.use(express.json({ extended: false }));

//ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reports", reportRouter);

// app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/profile", profileRouter);
// app.use("/api/v1/post", postRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
