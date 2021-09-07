const express = require('express')
const webpush = require('web-push')
const Subscription = require('../models/subscription')

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

module.exports = pushRouter