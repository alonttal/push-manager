const request = require('supertest')
const app = require('../src/app')
const Notification = require('../src/models/notification')
const { setupDatabase } = require('./fixtures/db.js')

beforeEach(setupDatabase)

test('Should create notification', async () => {
  const notification = {
    title: 'title is a must',
    body: 'some body is optional',
    icon: 'https://mustbehttpsiconurl.com',
    badge: 'https://mustbehttpsbadgeurl.com'
  }

  const response = await request(app)
  .post('/notification')
  .send({ notification })
  .expect(201)
  expect(response.body).toMatchObject({ notification });

  const savedNotification = await Notification.findById(response.body.notification._id)
  expect(savedNotification).not.toBeNull()
})

