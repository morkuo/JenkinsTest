const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

app.get('/', (req, res) => {
  console.log('Here!');
  res.send('Here!');
});

app.get('/rolldice', (req, res) => {
  const number = getRandomNumber(1, 6).toString();
  console.log(number);
  res.send(number);
});

const server = app.listen(PORT, () => {
  console.log('running');
});

module.exports = { server, getRandomNumber };
