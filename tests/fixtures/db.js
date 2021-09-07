const mongoose = require('mongoose')
const Subscription = require('../../src/models/subscription')

const subscriptionOne = {
  endpoint: 'subscriptionOne',
  keys: {
    p256dh: 'p256dh',
    auth: 'auth'
  }
}

const setupDatabase = async () => {
  await Subscription.deleteMany()
  await Subscription.create(subscriptionOne)
}

module.exports = {
  setupDatabase,
  subscriptionOne
}