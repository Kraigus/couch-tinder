const router = require("express").Router();
const User = require("../db/model/user.model");
const Specialization = require("../db/model/specialization.model");
const Level = require("../db/model/level.model");
const multer = require("multer");
const { nanoid } = require("nanoid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const newFileName = nanoid(10);
    const extension = file.originalname.split(".").slice(-1);
    cb(null, newFileName + "." + extension);
  },
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  const { userId } = req.session;
  const { firstName, lastName, middleName, specialization, level, image } = await User.findById(userId);

  const specList = await Specialization.find().lean();
  const levelList = await Level.find().lean();
  const levelForSelect = levelList.map(({ name }) => ({
    name,
    level: level === name,
  }));
  const specForSelect = specList.map(({ name }) => ({
    name,
    spec: specialization === name,
  }));

  res.render("lk", { firstName, lastName, middleName, specialization, level, userId, specForSelect, levelForSelect, image });
});

router.put("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  try {
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.middleName = req.body.middleName;
    user.specialization = req.body.specialization;
    user.level = req.body.level;
    await user.save();
    res.status(200).end();
  } catch (error) {
    res.status(500).end();
  }
});

router.post("/upload", upload.single("image"), async (req, res) => {
  const image = req.file.path.split("/").slice(-1)[0];
  const newImage = await User.updateOne({ _id: req.session.userId }, { $set: { image: req.file.path } }, { upsert: true });
  res.redirect("/lk");
});

module.exports = router;
