const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt"); // to encrypt user password.

// Register
router.post("/register", async (req, res) => {
  try {
    /* to encrypt user password before saving into DB */
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
      profilePic: req.body.profilePic,
    });
    const user = await newUser.save();
    res.status(200).json({ message: "User has been created!", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
/*
The HTTP POST method is used for sending sensitive information to the server as 
it sends data in the request body rather than in the URL 
*/
router.post("/login", async (req, res) => {
  try {
    //checking if username exists.
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json("No Username");

    // checking password with the hashed passwords in DB.
    const validate = await bcrypt.compare(req.body.password, user.password);
    if (!validate) return res.status(400).json("Wrong Password");

    // create a new object with all properties of user except password
    const { password, ...data } = user._doc;
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
