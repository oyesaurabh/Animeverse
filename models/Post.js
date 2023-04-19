const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", PostSchema);
