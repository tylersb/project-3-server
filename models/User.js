// require mongoose ODM
const mongoose = require('mongoose')

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
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', UserSchema)
