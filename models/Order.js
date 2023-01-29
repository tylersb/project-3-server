const mongoose = require('mongoose')
const { Schema } = mongoose

const OrderSchema = Schema(
  {
    products: [
      {
        product: {
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
        street: {
          type: String
        },
        city: {
          type: String
        },
        state: {
          type: String
        },
        zip: {
          type: Number
      }
    },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Order', OrderSchema)
