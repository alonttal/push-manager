const path = require('path')
const express = require('express')
require('./db/mongoose')
const pushRouter = require('./routes/push')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(pushRouter)

module.exports = app