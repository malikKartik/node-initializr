const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  productId: {
    type: String,
    required: true,
    unique: false
  },
})

module.exports = mongoose.model('Order', orderSchema)