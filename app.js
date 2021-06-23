const express = require("express");
// const { connect } = require("./db/config/connect");
const morgan = require("morgan");
const path = require("path");
const hbs = require("hbs");
// const { dbUrl } = require("../db/config/config");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();
const PORT = 3000;


app.listen(PORT, ()=> {
  console.log(`Server has ben started on PORT ${PORT}`)
});
