const express = require('express')
const HttpError = require('./HttpError')
const pushService = require('../services/pushService')

const pushRouter = new express.Router()

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