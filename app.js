// environment variable
require("dotenv").config();

// handling async errors
require("express-async-errors");

// security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

// required packages
const express = require("express");
const bodyParser = require("body-parser");

// local imports
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connectDB");
const authMiddleware = require("./middleware/authentication");
const userRouter = require("./router/user-router");
const authRouter = require("./router/auth-router");
const postRouter = require("./router/post-router");

const app = express();

// package middleware
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// Route Middlewares
app.use("/api/", authRouter);
app.use(authMiddleware);
app.use("/api/", userRouter);
app.use("/api/", postRouter);

/// error handling middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// starting server
const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
