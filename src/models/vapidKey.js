const mongoose = require('mongoose')
const webpush = require('web-push')

const vapidKeySchema = new mongoose.Schema({
  publicKey: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  privateKey: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
})

vapidKeySchema.statics.create = async () => {
  const vapidKey = new VapidKey(webpush.generateVAPIDKeys())
  await vapidKey.save()
  return { vapidKey }
}

const VapidKey = mongoose.model('VapidKey', vapidKeySchema)

module.exports = VapidKey