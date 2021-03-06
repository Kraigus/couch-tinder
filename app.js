require('dotenv').config();
const express = require('express');
const { connect } = require('./src/db/config/connect');
// const morgan = require("morgan");
const path = require('path');
const hbs = require('hbs');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const indexRouter = require('./src/routes/index.routes');
const userRouter = require('./src/routes/user.router');
const lkRouter = require('./src/routes/lk.router');
const coachRouter = require('./src/routes/coaches.routes');
const postsRouter = require('./src/routes/posts.routes');

const app = express();
const { PORT, mongoUrl, secret } = process.env;
console.log({ PORT, mongoUrl, secret });

hbs.registerPartials(path.join(__dirname, 'src', 'views', 'partials'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src', 'views'));
// app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    store: MongoStore.create({ mongoUrl }),
  })
);

app.use((req, res, next) => {
  res.locals.firstName = req.session.firstName;
  res.locals.lastName = req.session.lastName;
  res.locals.userId = req.session.userId;
  res.locals.isAdmin = req.session.isAdmin;
  next();
});

app.use('/', indexRouter);
app.use('/lk', lkRouter);
app.use('/users', userRouter);
app.use('/posts', postsRouter);
app.use('/coaches', coachRouter);

app.listen(PORT, () => {
  console.log(`Server has ben started on PORT ${PORT}`);
  connect();
});
