const path = require('path')
const express = require('express')
require('./db/mongoose')
const vapidKeyRouter = require('./routes/vapidkey')
const subscriptionRouter = require('./routes/subscription')
const pushRouter = require('./routes/push')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(vapidKeyRouter)
app.use(subscriptionRouter)
app.use(pushRouter)

module.exports = app