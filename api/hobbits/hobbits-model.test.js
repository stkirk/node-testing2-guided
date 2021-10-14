const db = require('../../data/dbConfig')

test('environment', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

beforeEach(async () => {
  await db.migrate.rollback()
})
