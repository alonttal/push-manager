const express = require('express')
const HttpError = require('./HttpError')
const Notification = require('../models/notification')

const router = new express.Router()

router.post('/notification', async (req, res) => {
  try {
    const notification = req.body.notification
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

router.delete('/notification', async (req, res) => {
  try {
    const notificationId = req.body.id
    if (!notificationId) {
      throw HttpError.ofMissingParameter('id')
    }
    await Notification.findOneAndDelete(notificationId)
    res.sendStatus(200)
  } catch (e) {
    const error = HttpError.of(e)
    res.status(error.status).send(error.message)
  }
})

router.patch('/notification/:id', async (req, res) => {
  try {
    const notificationId = req.params.id
    if (!notificationId) {
      throw HttpError.ofMissingParameter('id')
    }

    const notification = await Notification.findById(notificationId)
    if (!notification) {
      throw HttpError.ofEntityNotFoundError(`notification '${notificationId}'`)
    }
    
    const data = req.body
    if (data) {
      await notification.update(data)
    }
    res.send(notification)
  } catch (e) {
    const error = HttpError.of(e)
    res.status(error.status).send(error.message)
  }
})

module.exports = router