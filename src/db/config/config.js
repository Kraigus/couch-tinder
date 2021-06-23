const dbUrl = "mongodb://localhost:27017/tinder";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

module.exports = { dbUrl, options };
