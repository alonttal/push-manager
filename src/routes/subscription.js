const express = require('express')
const HttpError = require('./HttpError')
const Subscription = require('../models/subscription')

const router = new express.Router()

router.post('/subscription', async (req, res) => {
  try {
    const subscription = req.body.subscription
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

router.delete('/subscription', async (req, res) => {
  try {
    // try getting endpoint parameter from request or from subscription parameter
    let endpoint = req.body.endpoint;
    if (!endpoint && req.body.subscription) {
      endpoint = req.body.subscription.endpoint
    }
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

module.exports = router