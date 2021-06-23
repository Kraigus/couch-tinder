const express = require("express");
const { connect } = require("./src/db/config/connect");
const { dbUrl } = require("./src/db/config/config");
const morgan = require("morgan");
const path = require("path");
const hbs = require("hbs");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const indexRouter = require("./src/routes/index.routes");

const app = express();
const PORT = 3000;

connect();
hbs.registerPartials(path.resolve('views', 'partials'));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "kuku1234",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: MongoStore.create({ mongoUrl: dbUrl }),
  })
);

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Server has ben started on PORT ${PORT}`);
});
