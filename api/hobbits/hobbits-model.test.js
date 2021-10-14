const db = require('.')

test('environment', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

beforeEach(async () => {
  await db.migrate
})
