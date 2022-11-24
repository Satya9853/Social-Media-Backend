const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Types.ObjectId,
      required: [true, "user id is missing"],
    },
    title: {
      type: String,
      required: [true, "Please Provide a Title for Your Post"],
      max: 100,
    },
    description: {
      type: String,
      max: 500,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        comment: {
          type: String,
          require: [true, "Please Provide Your Comment"],
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
