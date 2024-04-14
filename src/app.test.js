const { server, getRandomNumber } = require('./app');

//input min and max values, output random number between min and max
test('the number should be between 1 and 6', () => {
  expect(getRandomNumber(1, 6)).toBeGreaterThanOrEqual(1);
  expect(getRandomNumber(1, 6)).toBeLessThanOrEqual(6);
});

afterAll(() => {
  server.close();
});
