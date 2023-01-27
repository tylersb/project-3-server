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
    dropOffAddress: {
      type: String
    },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }
  },
  {
    timestamps: true
  }
)

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    phoneNumber: {
      type: Number
    },
    address: {
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
    orders: [OrderSchema]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', UserSchema)
