const Router = require("express").Router();
const postController = require("../controller/post-controller");

Router.route("/posts").post(postController.createPost);

Router.route("/posts/:id").get(postController.getPost);

Router.route("/all_posts").get(postController.getAllPost);

Router.route("/posts/:id").delete(postController.deletePost);

Router.route("/like/:id").post(postController.likePost);

Router.route("/unlike/:id").post(postController.dislikePost);

Router.route("/comment/:id").post(postController.addComment);

module.exports = Router;
