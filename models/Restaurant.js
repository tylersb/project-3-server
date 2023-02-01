const mongoose = require('mongoose')

// child model to child model
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    price: {
      type: Number
    },
    description: {
      type: String
    }
  },
  { timestamps: true }
)

// child model
const MenuSchema = new mongoose.Schema(
  {
    sectionName: {
      type: String
    },
    products: [ProductSchema]
  },
  { timestamps: true }
)

// parent model
const RestaurantSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String
    },
    restaurantDescription: {
      type: String
    },
    accountHolderName: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    menu: [MenuSchema],
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
    phone: {
      type: Number
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }

)

module.exports = mongoose.model('Restaurant', RestaurantSchema)
