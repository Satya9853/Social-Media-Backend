const notFoundMiddleware = (req, res, next) => {
  res.status(404).json("Route does not exist");
};

module.exports = notFoundMiddleware;
