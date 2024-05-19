const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const reportRouter = require("./routes/reportRoutes");
const watsonRouter = require("./routes/watsonRoutes");
const intentRouter = require("./routes/intentRoutes");

const viewRouter = require("./routes/viewRoutes");
const globalErrorHandler = require("./controller/errorController");
const AppError = require("./utils/appError");

const app = express();
//MiddleWares
//Body parser Middleware: Reading data from the body into req.body.
app.use(express.json({ extended: false }));
app.use(cors());
app.use(cookieParser());

// app.set("view engine", "jade");
//ROUTES
// app.use("/", viewRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/report", reportRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/watson", watsonRouter);
app.use("/api/v1/intent", intentRouter);

// app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/profile", profileRouter);
// app.use("/api/v1/post", postRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
