const router = require("express").Router();
const User = require("../db/model/user.model");
const Specialization = require("../db/model/specialization.model");
const Level = require("../db/model/level.model");
// const multer  = require('multer')
// const upload = multer({ storage: './public/images' })

router.get("/", async (req, res) => {
  const { userId } = req.session;
  const { firstName, lastName, middleName, specialization, level } = await User.findById(userId);

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

  // console.log(specForSelect, "=specForSelect");
  res.render("lk", {
    firstName,
    lastName,
    middleName,
    specialization,
    level,
    userId,
    specForSelect,
    levelForSelect,
  });
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

// router.post('/:id', upload.single('image'), async (req, res, next) => {
//   console.log(req.body);
//   console.log(req.file);
// })

module.exports = router;
