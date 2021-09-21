const webpush = require('web-push')
const Subscription = require('../models/subscription')
const VapidKey = require('../models/vapidKey')

const push = async (data) => {
  const endpoint = data.endpoint
  if (!endpoint) {
    throw new Error('Missing endpoint')
  }

  const publicKey = data.publicKey
  if (!publicKey) {
    throw new Error('Missing publicKey')
  }

  const notification = data.notification
  if (!notification || !notification.title) {
    const notificationId = data.notificationId
    if (!notificationId) {
      throw new Error('Missing notification ID')
    }
    // TODO: get notification from db
    if (!notification) {
      throw new Error('Bad notification')
    }
  }

  const subscription = await Subscription.findOne({ endpoint })
  if (!subscription) {
    throw new Error('Bad endpoint')
  }

  const vapidKey = await VapidKey.findOne({ publicKey })
  if (!vapidKey) {
    throw new Error('Bad public key')
  }

  const options = {
    vapidDetails: {
      subject: 'mailto:alontalmor@gmail.com', // TODO: get mailto from vapid key owner
      publicKey: vapidKey.publicKey,
      privateKey: vapidKey.privateKey
    }
  }

  const payloadObj = { notification }
  
  if (data.date) {
    try {
      dateObj = new Date(data.date)
      payloadObj.time = dateObj
    } catch (e) {
      throw new Error('Bad date format')
    }
  }

  payload = JSON.stringify(payloadObj)

  const response = await webpush.sendNotification(
    subscription,
    payload,
    options
  )
}

module.exports = {
  push
}