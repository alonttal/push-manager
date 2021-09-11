const mongoose = require('mongoose')
const validator = require('validator');

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  body: {
    type: String,
    trim: true
  },
  icon: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return validator.isURL(v, {protocols: ['https'], require_protocol: true})
      }
    }
  },
  badge: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return validator.isURL(v, {protocols: ['https'], require_protocol: true})
      }
    }
  }
}, {
  timestamps: true
});

notificationSchema.statics.create = async (data) => {
  const notification = new Notification(data)
  await notification.save()
  return { notification }
}

const Notification = mongoose.model('Notification', notificationSchema)

module.exports = Notification