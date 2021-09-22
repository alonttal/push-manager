const request = require('supertest')
const app = require('../src/app')
const VapidKey = require('../src/models/vapidKey')
const { setupDatabase, vapidKeyOne } = require('./fixtures/db.js')

beforeEach(setupDatabase)

test('Should generate and create vapid key', async () => {
  await testVapidKeyCreation(undefined)
})

test('Should create vapid key from existing data', async () => {
  const body = {
    publicKey: '12345',
    privateKey: '54321'
  }
  await testVapidKeyCreation(body)
})

const testVapidKeyCreation = async (body) => {
  const response = await request(app)
  .post('/vapidkey')
  .send(body)
  .expect(201)
  expect(response.body.vapidKey).toBeTruthy()

  const savedVapidKey = await VapidKey.findOne({ publicKey: response.body.vapidKey.publicKey })
  expect(savedVapidKey).not.toBeNull()
}

test('Should fail to create vapid key with missing keys', async () => {
  await request(app)
  .post('/vapidkey')
  .send({ publicKey: 'justarandomstring' })
  .expect(400)

  await request(app)
  .post('/vapidkey')
  .send({ privateKey: 'thisisaprivatekeystring' })
  .expect(400)
})

test('Should delete vapid key', async () => {
  await request(app)
  .delete('/vapidkey')
  .send({
    publicKey: vapidKeyOne.publicKey
  })
  .expect(200)

  const savedVapidKey = await VapidKey.findOne({ publicKey: vapidKeyOne.publicKey })
  expect(savedVapidKey).toBeNull()
})

test('Should fail to delete vapid key if public key not specified', async () => {
  await request(app)
  .delete('/vapidkey')
  .send()
  .expect(400)
})

test('Should return status `OK` when trying to delete unexisting vapid key', async () => {
  await request(app)
  .delete('/vapidkey')
  .send({
    publicKey: 'unexistingPublicKey'
  })
  .expect(200)
})