const { model } = require("mongoose");

const Post = model("Post", {
  title: String,
  body: String,
  createdAt: String,
  updatedAt: Date,
});

module.exports = Post;
