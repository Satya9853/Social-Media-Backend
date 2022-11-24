const Router = require("express").Router();
const userController = require("../controller/user-controller");

Router.route("/user").get(userController.getUser);
Router.route("/follow/:id").post(userController.followUser);
Router.route("/unfollow/:id").post(userController.unfollowUser);

Router.route("/login").get();

module.exports = Router;
