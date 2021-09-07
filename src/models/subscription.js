const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({
  endpoint: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  keys: {
    p256dh: {
      type: String,
      required: true,
      trim: true
    },
    auth: {
      type: String,
      required: true,
      trim: true
    }
  }
}, {
  timestamps: true
});

subscriptionSchema.statics.create = async (data) => {
  const subscription = new Subscription(data)
  await subscription.save()
  return { subscription }
}

const Subscription = mongoose.model('Subscription', subscriptionSchema)

module.exports = Subscription