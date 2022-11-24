const User = require("../model/user-model");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, ForbiddenRequestError } = require("../Errors/index");

// get a user
exports.getUser = async (req, res, next) => {
  const user = req.user;
  const finalData = {
    username: user.username,
    followers: user.followers.length,
    followings: user.followings.length,
  };

  return res.status(StatusCodes.OK).json(finalData);
};

// follow a user
exports.followUser = async (req, res, next) => {
  if (req.user._id === req.params.id) throw new ForbiddenRequestError("you cant follow yourself");

  const Founduser = await User.findById(req.params.id);
  if (!Founduser) throw new NotFoundError("User does not Exist");

  const loggedUser = await User.findById(req.user._id);

  if (Founduser.followers.includes(loggedUser._id)) throw new ForbiddenRequestError("already following");
  console.log(Founduser.followers.includes(loggedUser));

  await Founduser.updateOne({ $push: { followers: loggedUser._id } });
  await loggedUser.updateOne({ $push: { followings: Founduser._id } });
  res.status(StatusCodes.OK).json({ message: "user has been followed" });
};

// unfollow a user
exports.unfollowUser = async (req, res, next) => {
  if (req.user._id === req.params.id) throw new ForbiddenRequestError("you cant unfollow yourself");

  const Founduser = await User.findById(req.params.id);
  if (!Founduser) throw new NotFoundError("User does not Exist");

  const loggedUser = await User.findById(req.user._id);

  if (!Founduser.followers.includes(loggedUser._id)) throw new ForbiddenRequestError("Not Following the user");

  await Founduser.updateOne({ $pull: { followers: loggedUser._id } });
  await loggedUser.updateOne({ $pull: { followings: Founduser._id } });
  res.status(StatusCodes.OK).json({ message: "user has been unfollowed" });
};
