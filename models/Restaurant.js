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
    name: {
      type: String
    },
    menu: [MenuSchema],
    address: {
      type: String
    },
    phone: {
      type: Number
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Restaurant', RestaurantSchema)
