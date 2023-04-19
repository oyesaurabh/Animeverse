const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

// UPDATE
// router.put("/:id", async (req, res) => {
//   if (req.body.userId === req.params.id) {
//     if (req.body.password) {
//       const salt = await bcrypt.genSalt(10);
//       req.body.password = await bcrypt.hash(req.body.password, salt);
//     }
//     try {
//       const updatedUser = await User.findByIdAndUpdate(
//         req.params.id,
//         {
//           $set: req.body,
//         },
//         { new: true }
//       );
//       return res
//         .status(200)
//         .json({ message: "Updated successfully", updatedUser });
//     } catch (err) {
//       return res.status(500).json({ error: err.message });
//     }
//   } else {
//     res.status(401).json("Unauthorized");
//   }
// });

//DELETE
// router.delete("/:id", async (req, res) => {
//   if (req.body.userId === req.params.id) {
//     try {
//       const user = await User.findById(req.params.id);
//       try {
//         await Post.deleteMany({ username: user.username }); // deleting post
//         await User.findByIdAndDelete(req.params.id); // deleting user data
//         res.status(200).json("User Deleted Successfully");
//       } catch (err) {
//         res
//           .status(500)
//           .json({ message: "Error while deleting User", error: err.message });
//       }
//     } catch (err) {
//       return res
//         .status(500)
//         .json({ message: "User not found", error: err.message });
//     }
//   } else {
//     res.status(401).json("Unauthorized");
//   }
// });

// GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json({
      message: "Something happened jo umeed nhi thi",
      error: err.message,
    });
  }
});

module.exports = router;
