const router = require("express").Router();
const User = require("../db/model/user.model");
const Post = require("../db/model/post.model");
const multer = require("multer");
const { nanoid } = require("nanoid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    console.log("CB ==>>");
    console.log(file);
    const newFileName = nanoid(10);
    const extension = file.originalname.split(".").slice(-1);
    console.log("extension=", extension);
    cb(null, newFileName + "." + extension);
  },
});

const upload = multer({ storage });

router.route("/").get(async (req, res) => {
  const user = await User.find({ level: "Мастер" });
 
  res.render("index", { user });
});

router.post("/upload", upload.single("image"), async (req, res) => {
  console.log(req.file.path);
  console.log(req.file.path.split("/").slice(-1)[0]);
  res.redirect("/");
});

module.exports = router;
