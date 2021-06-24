const { connect, disconnect } = require('../db/config/connect');
const Specialization = require('../db/model/specialization.model');

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
  await Specialization.insertMany(specialization);
}
connect();
main().then(() => {
  disconnect();
});
