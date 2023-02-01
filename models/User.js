// require mongoose ODM
const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema(
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
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    restaurant: [{ type: Schema.Types.ObjectId, ref: 'Restaurant' }]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', UserSchema)
