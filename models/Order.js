const mongoose = require('mongoose')
const { Schema } = mongoose

const OrderSchema = Schema(
  {
    products: [
      {
        name: {
          type: String
        },
        quantity: {
          type: Number
        },
        price: {
          type: Number
        }
      }
    ],
    dropOffAddress: {
      type: String
    },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Order', OrderSchema)
