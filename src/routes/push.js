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