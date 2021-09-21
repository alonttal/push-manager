const express = require('express')
const HttpError = require('./HttpError')
const VapidKey = require('../models/vapidKey')

const router = new express.Router()

router.post('/vapidkey', async (req, res) => {
  try {
    const publicKey = req.body.publicKey
    const privateKey = req.body.privateKey
    
    if (publicKey && !privateKey) {
      throw HttpError.ofMissingParameter('privateKey') 
    }
    if (!publicKey && privateKey) {
      throw HttpError.ofMissingParameter('publicKey')
    }

    const data = (publicKey && privateKey) ? { publicKey, privateKey } : null
    const vapidKeyInfo = await VapidKey.create(data)
    res.status(201).send(vapidKeyInfo)
  } catch (e) {
    const error = HttpError.of(e)
    res.status(error.status).send(error.message)
  }
})

router.delete('/vapidkey', async (req, res) => {
  try {
    const publicKey = req.body.publicKey
    if (!publicKey) {
      throw error.MissingParameterError('publicKey')
    }
    await VapidKey.deleteOne({ publicKey })
    res.sendStatus(200)
  } catch (e) {
    const error = HttpError.of(e)
    res.status(error.status).send(error.message)
  }
})

module.exports = router