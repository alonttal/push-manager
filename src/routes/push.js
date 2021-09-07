const express = require('express')
const webpush = require('web-push')
const Subscription = require('../models/subscription')
const VapidKey = require('../models/vapidKey')

const pushRouter = new express.Router()

pushRouter.post('/subscription', async (req, res) => {
  const subscription = req.body.subscription;

  try {
    if (!subscription) {
      throw new Error('Missing subscription info')
    }
    const subscriptionInfo = await Subscription.create(subscription)
    res.status(201).send(subscriptionInfo)
  } catch (e) {
    res.sendStatus(400)
  }
})

pushRouter.delete('/subscription', async (req, res) => {
  const subscription = req.body.subscription;
  const endpoint = subscription ? subscription.endpoint : req.body.endpoint
  
  try {
    if (!endpoint) {
      throw new Error('Missing endpoint')
    }
    await Subscription.deleteOne({ endpoint })
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(400)
  }
})

pushRouter.post('/vapidkey', async (req, res) => {
  try {
    const vapidKeyInfo = await VapidKey.create()
    res.status(201).send(vapidKeyInfo)
  } catch (e) {
    res.sendStatus(500)
  }
})

pushRouter.delete('/vapidkey', async (req, res) => {
  const publicKey = req.body.publicKey;

  try {
    if (!publicKey) {
      throw new Error('Missing publicKey')
    }
    await VapidKey.deleteOne({ publicKey })
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(400)
  }
})

module.exports = pushRouter