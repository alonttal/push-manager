const request = require('supertest')
const app = require('../src/app')
const Subscription = require('../src/models/subscription')
const Notification = require('../src/models/notification')
const VapidKey = require('../src/models/vapidKey')
const { setupDatabase, subscriptionOne } = require('./fixtures/db.js')

beforeEach(setupDatabase)

test('Should create subscription', async () => {
  const subscription = {
    endpoint: 'somefakeendpoint',
    keys: {
      p256dh: 'p256dh',
      auth: 'x2pytLMzPPErni8M3OPhSw'
    }
  }

  const response = await request(app)
  .post('/subscription')
  .send({ subscription })
  .expect(201)
  expect(response.body).toMatchObject({ subscription });

  const savedSubscription = await Subscription.findOne({ endpoint: 'somefakeendpoint' })
  expect(savedSubscription).not.toBeNull()
})

test('Should delete subscription', async () => {
  await request(app)
  .delete('/subscription')
  .send({
    subscription: subscriptionOne
  })
  .expect(200)

  const savedSubscription = await Subscription.findOne({ endpoint: subscriptionOne.endpoint })
  expect(savedSubscription).toBeNull()
})

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

