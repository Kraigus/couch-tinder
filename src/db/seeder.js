const { connect, disconnect } = require('../db/config/connect');
const Specialization = require('../db/model/specialization.model');
const Level = require('../db/model/level.model');
const Posts = require('../db/model/post.model');
const User = require('../db/model/user.model');

async function main() {
  await Specialization.deleteMany();
  await Level.deleteMany();
  await Posts.deleteMany();

  const specialization = [
    { name: 'Астрология' },
    { name: 'Таро' },
    { name: 'Психология' },
    { name: 'Гештальт' },
    { name: 'Нумерология' },
    { name: 'Нутрициология' },
    { name: 'Йога' },
    { name: 'Эзотерика' },
    { name: 'Психотерпаия' },
  ];
  const level = [
    { name: 'Начинающий' },
    { name: 'Практикующий' },
    { name: 'Мастер' },
    { name: 'Обучающий' },
  ];
  const posts = [
    {
      title: 'Salsify Taro Catsear Garlic',
      body: 'Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.',
    },
    {
      title: 'Kohlrabi Radish Okra Azuki',
      body: 'Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale.',
    },
    {
      title: 'Lotus Root Water Spinach',
      body: 'Celery potato scallion desert raisin horseradish spinach carrot soko. Lotus root water spinach fennel kombu maize bamboo shoot green bean swiss chard seakale pumpkin onion chickpea gram corn pea.',
    },
    {
      title: 'Bean Swiss Chard Seakale',
      body: 'Nori grape silver beet broccoli kombu beet greens fava bean potato quandong celery. Bunya nuts black-eyed pea prairie turnip leek lentil turnip greens parsnip. Sea lettuce lettuce water chestnut eggplant winter purslane fennel azuki bean earthnut pea sierra leone bologi leek soko chicory celtuce parsley',
    },
    {
      title: 'Magis Kohlrabi Welsh Onion',
      body: 'Celery quandong swiss chard chicory earthnut pea potato. Salsify taro catsear garlic gram celery bitterleaf wattle seed collard greens nori. Grape wattle seed kombu beetroot horseradish carrot squash brussels sprout chard.',
    },
    {
      title: 'Parsley Shallot Courgette Tatsoi',
      body: 'Beetroot water spinach okra water chestnut ricebean pea catsear courgette summer purslane. Water spinach arugula pea tatsoi aubergine spring onion bush tomato kale radicchio turnip chicory salsify pea sprouts fava bean.',
    },
    {
      title: 'Bean Mustard Tigernut',
      body: 'Soko radicchio bunya nuts gram dulse silver beet parsnip napa cabbage lotus root sea lettuce brussels sprout cabbage. Catsear cauliflower garbanzo yarrow salsify chicory garlic bell pepper napa cabbage lettuce tomato kale arugula melon sierra leone bologi rutabaga tigernut.',
    },
    {
      title: 'Aubergine Spring Onion',
      body: 'Sea lettuce gumbo grape kale kombu cauliflower salsify kohlrabi okra sea lettuce broccoli celery lotus root carrot winter purslane turnip greens garlic. JÃ­cama garlic courgette coriander radicchio plantain scallion cauliflower fava bean desert raisin spring onion chicory bunya nuts.',
    },
    {
      title: 'Chicory Celtuce Parsley',
      body: 'Soko radicchio bunya nuts gram dulse silver beet parsnip napa cabbage lotus root sea lettuce brussels sprout cabbage. Catsear cauliflower garbanzo yarrow salsify chicory garlic bell pepper napa cabbage lettuce tomato kale arugula melon sierra leone bologi rutabaga tigernut.',
    },
    {
      title: 'Coriander Yarrow Sweet Pepper',
      body: 'Water spinach arugula pea tatsoi aubergine spring onion bush tomato kale radicchio turnip chicory salsify pea sprouts fava bean. Dandelion zucchini burdock yarrow chickpea dandelion sorrel courgette turnip greens tigernut soybean radish artichoke wattle seed endive groundnut broccoli arugula.',
    },
  ];
  await Specialization.insertMany(specialization);
  await Level.insertMany(level);
  await Posts.insertMany(posts);
}

main().then(() => {
  disconnect();
});
