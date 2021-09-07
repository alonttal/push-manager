const mongoose = require('mongoose')
const Subscription = require('../../src/models/subscription')
const VapidKey = require('../../src/models/vapidKey')

const subscriptionOne = {
  endpoint: 'subscriptionOne',
  keys: {
    p256dh: 'p256dh',
    auth: 'auth'
  }
}

const vapidKeyOne = {
  publicKey: 'randomPublicKey',
  privateKey: 'randomPrivateKey'
}

const setupDatabase = async () => {
  await Subscription.deleteMany()
  await VapidKey.deleteMany()
  await Subscription.create(subscriptionOne)
  await VapidKey.create(vapidKeyOne)
}

module.exports = {
  setupDatabase,
  subscriptionOne,
  vapidKeyOne
}