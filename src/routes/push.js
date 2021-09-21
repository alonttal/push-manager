const express = require('express')
const HttpError = require('./HttpError')
const Subscription = require('../models/subscription')
const Notification = require('../models/notification')
const pushService = require('../services/pushService')

const pushRouter = new express.Router()

pushRouter.post('/subscription', async (req, res) => {
  const subscription = req.body.subscription

  try {
    if (!subscription) {
      throw HttpError.ofMissingParameter('subscription')
    }
    const subscriptionInfo = await Subscription.create(subscription)
    res.status(201).send(subscriptionInfo)
  } catch (e) {
    const error = HttpError.of(e)
    res.status(error.status).send(error.message)
  }
})

pushRouter.delete('/subscription', async (req, res) => {
  const subscription = req.body.subscription
  const endpoint = subscription ? subscription.endpoint : req.body.endpoint
  
  try {
    if (!endpoint) {
      throw HttpError.ofMissingParameter('endpoint')
    }
    await Subscription.deleteOne({ endpoint })
    res.sendStatus(200)
  } catch (e) {
    const error = HttpError.of(e)
    res.status(error.status).send(error.message)
  }
})

pushRouter.post('/notification', async (req, res) => {
  const notification = req.body.notification

  try {
    if (!notification) {
      throw HttpError.ofMissingParameter('notification')
    }
    const notificationInfo = await Notification.create(notification)
    res.status(201).send(notificationInfo)
  } catch (e) {
    const error = HttpError.of(e)
    res.status(error.status).send(error.message)
  }
})

pushRouter.post('/push', async (req, res) => {
  try {
    await pushService.push(req.body)
    res.sendStatus(200)
  } catch (e) {
    const statusCode = e.statusCode || 400
    if (statusCode === 410) { // The subscriber has unsbscribed to the service
      await Subscription.deleteOne({ endpoint: req.body.endpoint })
    }
    res.status(statusCode).send(error.json(e))
  }
})

// TODO remove
pushRouter.get('/temp', (req, res) => {
  // console.log(req.headers.origin)
  // console.log(req.headers['x-forward-for'])
  // console.log(req.socket.remoteAddress)
  // console.log(req.hostname)
  // console.log(req.headers.host)
})

module.exports = pushRouter