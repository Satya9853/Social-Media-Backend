const Post = require("../model/post-model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError, ForbiddenRequestError } = require("../Errors/index");

// create a post
exports.createPost = async (req, res, next) => {
  const postData = req.body;
  if (!postData) throw new BadRequestError("Please provide the required details");
  postData.userID = req.user._id;
  const newPost = await Post.create(postData);
  res.status(StatusCodes.CREATED).json(newPost);
};

// Delete a post
exports.deletePost = async (req, res, next) => {
  const post = Post.findById({ _id: req.params.id, userID: req.user._id });
  if (!post) throw new NotFoundError("Post not found");
  await post.deleteOne();
  res.status(StatusCodes.OK).json({ message: "Post deleted" });
};

// like a post
exports.likePost = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new NotFoundError("Post not Found");
  const loggedUser = req.user._id;

  if (post.likes.includes(loggedUser)) throw new ForbiddenRequestError("Already Liked the Post");

  await post.updateOne({ $push: { likes: loggedUser } });
  res.status(StatusCodes.OK).json({ message: "post has been liked" });
};
// unlike a post
exports.dislikePost = async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) throw new NotFoundError("Post does not Exist");

  const loggedUser = req.user._id;
  if (!post.likes.includes(loggedUser)) throw new ForbiddenRequestError("The user has not liked the post");

  await post.updateOne({ $pull: { likes: loggedUser } });
  res.status(StatusCodes.OK).json({ message: "post has been unliked" });
};

// add comment
exports.addComment = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new NotFoundError("post does not exist");
  const comment = req.body;
  comment.user = req.user._id;
  await post.updateOne({ $push: { comments: comment } });
  res.status(StatusCodes.OK).json(comment);
};

// get a post
exports.getPost = async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) throw new NotFoundError("post does not exist");

  const finalData = {
    title: post.title,
    description: post.description,
    comments: post.comments.length,
    likes: post.comments.length,
  };
  res.status(StatusCodes.OK).json(finalData);
};

// get all post
exports.getAllPost = async (req, res, next) => {
  const allPosts = await Post.find({ userID: req.user._id }).sort("createdAt").select("_id title description createdAt comments likes");
  if (allPosts.length !== 0) {
    allPosts.forEach((post) => {
      post["likes"] = post.likes.length;
    });
  }
  res.status(StatusCodes.OK).json(allPosts);
};
