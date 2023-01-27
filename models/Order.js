// require mongoose ODM
const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema(
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
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    dropoffAddress: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Order', OrderSchema)
