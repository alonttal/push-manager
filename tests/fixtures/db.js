const mongoose = require('mongoose')
const Subscription = require('../../src/models/subscription')
const Notification = require('../../src/models/notification')
const VapidKey = require('../../src/models/vapidKey')

const subscriptionOne = {
  endpoint: 'subscriptionOne',
  keys: {
    p256dh: 'p256dh',
    auth: 'auth'
  }
}

const notificationOneId = new mongoose.Types.ObjectId()
const notificationOne = {
  _id: notificationOneId,
  title: 'notificationOne',
  body: 'meBody',
  icon: 'https://example.com/icon',
  badge: 'https://example.com/badge',
}

const vapidKeyOne = {
  publicKey: 'randomPublicKey',
  privateKey: 'randomPrivateKey'
}

const setupDatabase = async () => {
  await Subscription.deleteMany()
  await Notification.deleteMany()
  await VapidKey.deleteMany()
  await Subscription.create(subscriptionOne)
  await Notification.create(notificationOne)
  await VapidKey.create(vapidKeyOne)
}

module.exports = {
  setupDatabase,
  subscriptionOne,
  notificationOne,
  vapidKeyOne
}