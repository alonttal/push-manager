const request = require('supertest')
const app = require('../src/app')
const Subscription = require('../src/models/subscription')
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

  const savedSubscription = await Subscription.findOne({ endpoint: response.body.subscription.endpoint })
  expect(savedSubscription).not.toBeNull()
})

test('Should fail to create subscription with missing info', async () => {
  await request(app)
    .post('/subscription')
    .send({
      subscription: {
        keys: {
          p256dh: 'p256dh',
          auth: 'x2pytLMzPPErni8M3OPhSw'
        }
      }
    })
    .expect(400)

  await request(app)
    .post('/subscription')
    .send({
      subscription: {
        endpoint: 'somefakeendpoint',
        keys: {
          auth: 'x2pytLMzPPErni8M3OPhSw'
        }
      }
    })
    .expect(400)

  await request(app)
    .post('/subscription')
    .send({
      subscription: {
        endpoint: 'somefakeendpoint',
        keys: {
          p256dh: 'p256dh',
        }
      }
    })
    .expect(400)

    await request(app)
    .post('/subscription')
    .send({})
    .expect(400)
})

test('Should delete subscription by sending subscription', async () => {
  await request(app)
    .delete('/subscription')
    .send({
      subscription: subscriptionOne
    })
    .expect(200)

  const savedSubscription = await Subscription.findOne({ endpoint: subscriptionOne.endpoint })
  expect(savedSubscription).toBeNull()
})

test('Should delete subscription by sending endpoint', async () => {
  await request(app)
    .delete('/subscription')
    .send({
      endpoint: subscriptionOne.endpoint
    })
    .expect(200)

  const savedSubscription = await Subscription.findOne({ endpoint: subscriptionOne.endpoint })
  expect(savedSubscription).toBeNull()
})

test('Should fail to delete subscription when not specifying info', async () => {
  await request(app)
    .delete('/subscription')
    .send({})
    .expect(400)
})

test('Should return status OK when trying to delete unexisting subscription', async () => {
  await request(app)
    .delete('/subscription')
    .send({
      endpoint: 'unexistingSubscriptionEndpoint'
    })
    .expect(200)
})