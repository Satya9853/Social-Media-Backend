const customApiError = require("./customApiError");
const { StatusCodes } = require("http-status-codes");

class ForbiddenRequestError extends customApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = ForbiddenRequestError;
