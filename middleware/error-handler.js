const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (error, req, res, next) => {
  let customError = {
    //default error
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || "Something went wrong please try again later",
  };
  return res.status(customError.statusCode).json({ message: customError.message });
};

module.exports = errorHandlerMiddleware;
