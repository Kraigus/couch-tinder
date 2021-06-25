// const dbUrl = "mongodb://localhost:27017/tinder";
const dbUrl = "mongodb+srv://di:123@cluster0.ib7e5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

module.exports = { dbUrl, options };
