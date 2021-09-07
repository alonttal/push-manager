const path = require('path')
const express = require('express')
require('./db/mongoose')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))
app.use(express.json())

module.exports = app