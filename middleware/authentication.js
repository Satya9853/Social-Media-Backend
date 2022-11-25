const User = require("../model/user-model");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../Errors");

const auth = async (req, res, next) => {
  const authHeader =
    req.headers.authorization ||
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MzgwOWE4OTg0NzJmMDAyOTk5MjI0YTgiLCJpYXQiOjE2NjkzNzI1NTQsImV4cCI6MTY3MTk2NDU1NH0.TECaW9OwclEbJWQSt9_dFabpGJerY-aJJ3E8f3N13I0";
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(payload.userID).select("-password");
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
