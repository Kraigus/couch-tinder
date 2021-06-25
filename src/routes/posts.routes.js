const router = require('express').Router();
const Posts = require('../db/model/post.model');
const Users = require('../db/model/user.model');

router.get('/', async (req, res) => {
  let posts;
  let users;
  try {
    posts = await Posts.mostRecent();
    users = await Users.find();
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    });
  }
  return res.render('posts/index', { posts, users , showButton: true});
});

router.post('/', async (req, res) => {
  const newPost = new Posts({
    title: req.body.title,
    body: req.body.body,
    author: res.locals.userId,
  });

  try {
    await newPost.save();
  } catch (error) {
    res.render('error', {
      message: 'Не удалось добавить запись в базу данных.',
      error: {},
    });
  }

  return res.redirect(`/posts/${newPost._id}`);
});

router.get('/new', (req, res) => {
  if (res.locals.firstName) {
    res.render('posts/new');
  } else {
    res.render('posts/index');
  }
});

router.get('/allposts', async (req, res) => {
  let posts;
  let users;
  console.log(req.url);
  try {
    posts = await Posts.find().sort('createdAt').populate('author');
    users = await Users.find();
    console.log(posts);
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    });
  }

  return res.render('posts/index', { posts, users, showButton : false });
});

router.get('/:id', async (req, res) => {
  let post;
  let show;
  try {
    console.log(req.params.id);
    post = await Posts.findById(req.params.id);
    show = post.author == res.locals.userId;
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить запись из базы данных.',
      error: {},
    });
  }
  return res.render('posts/show', { post, show });
});

router.put('/:id', async (req, res) => {
  let post;

  try {
    post = await Posts.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
    });
  } catch (error) {
    return res.json({
      isUpdateSuccessful: false,
      errorMessage: 'Не удалось обновить запись в базе данных.',
    });
  }

  return res.json({ isUpdateSuccessful: true, entryID: post._id });
});

router.delete('/:id', async (req, res) => {
  try {
    console.log(res.locals.userId);
    if (res.locals.userId) {
      console.log('z nen');
      console.log(req.params.id);
      console.log(
        await Posts.find({
          _id: req.params.id,
          author: res.locals.userId,
        })
      );
      await Posts.findOneAndDelete({
        _id: req.params.id,
        author: res.locals.userId,
      });
      console.log('Z elfkbk');
    }
  } catch (error) {
    res.sendStatus(500);
  }
  console.log('Dct okey');
  return res.json({ isDeleteSuccessful: true });
});

router.get('/:id/edit', async (req, res) => {
  try {
    let post;
    if (res.locals.userId) {
      post = await Posts.findOne({
        _id: req.params.id,
        author: res.locals.userId,
      });
    }
    if (post) {
      res.render('posts/edit', { post });
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
