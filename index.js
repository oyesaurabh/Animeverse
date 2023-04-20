const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const path = require("path");
const cors = require("cors"); // to allow localhost:5173 to run with localhost:3000
const multer = require("multer"); //for storing images
require("dotenv").config();

const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");

/*** Middlewares ***/
app.use(express.json());
// This will allow requests from the origin 'http://localhost:5173'
// to access the API endpoint without triggering the CORS error.
app.use(
  cors({
    origin: true,
  })
);
app.use("/images", express.static(path.join(__dirname, "/images")));
/* END */

/*** multer ***/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/v1/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});
/** END ***/

/*** ROUTES ***/
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/category", categoryRoute);
/* END */

/*** SERVER ***/
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`started at ${port}`));
  } catch (err) {
    console.log(err);
  }
};
start();
