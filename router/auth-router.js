const Router = require("express").Router();
const authController = require("../controller/auth-controller");

Router.route("/register").post(authController.register);

Router.route("/login").post(authController.login);

Router.route("/authenticate").post(authController.login);

module.exports = Router;
