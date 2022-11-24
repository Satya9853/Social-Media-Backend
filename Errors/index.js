const CustomApiError = require("./customApiError");
const BadRequestError = require("./bad-request");
const NotFoundError = require("./not-foundError");
const UnauthenticatedError = require("./unauthenticated");
const ForbiddenRequestError = require("./forbidden-request");

module.exports = {
  CustomApiError,
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  ForbiddenRequestError,
};
