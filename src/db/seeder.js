const { connect, disconnect } = require('../db/config/connect');
const Specialization = require('../db/model/specialization.model');
const Level = require('../db/model/level.model');

async function main() {
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
  // await Specialization.deleteMany();
  await Specialization.insertMany(specialization);
  await Level.insertMany(level);
}
connect();
main().then(() => {
  disconnect();
});
