const router = require("express").Router();
const Post = require("../models/Post");

// CREATE NEW POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// READ(GET) ONE POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// READ POSTS by Category or by USERNAME or ALL
router.get("/", async (req, res) => {
  const { user: username, cat: category } = req.query;
  try {
    const query = username ? { username } : category ? { category } : {};
    const posts = await Post.find(query);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.username !== req.body.username) {
      return res.status(401).json("Unauthorized");
    }
    if (!post) {
      return res.status(404).json("Post not found");
    }
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json("Post not found");
    }
    if (post.username !== req.body.username) {
      return res.status(401).json("Unauthorized");
    }
    await Post.deleteOne({ _id: req.params.id });
    res.status(200).json("Post has been deleted...");
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
