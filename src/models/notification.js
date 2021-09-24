const mongoose = require('mongoose')
const validator = require('validator');
const _ = require('lodash');
const { InvalidArgumentError } = require('../general/errors/error');

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
      validator: function (v) {
        return validator.isURL(v, { protocols: ['https'], require_protocol: true })
      }
    }
  },
  badge: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        return validator.isURL(v, { protocols: ['https'], require_protocol: true })
      }
    }
  }
}, {
  timestamps: true
});

notificationSchema.statics.create = async (data) => {
  if (!_.isObject(data)) {
    throw new InvalidArgumentError(data)
  }
  const notification = new Notification(data)
  await notification.save()
  return { notification }
}

notificationSchema.methods.update = async function (data) {
  if (!_.isObject(data)) {
    throw new InvalidArgumentError(data)
  }
  delete data._id, delete data.createdAt, delete data.updatedAt, delete data.__v
  const clone = _.cloneDeep(this)
  Object.assign(clone, data)
  const updated = await clone.save()
  Object.assign(this, updated)
}

const Notification = mongoose.model('Notification', notificationSchema)

module.exports = Notification