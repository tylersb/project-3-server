const mongoose = require('mongoose')

//child model to child model
const ProductsSchema = new mongoose.Schema({ 
    name: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
}, {timestamps: true})

//child model
const MenuSchema = new mongoose.Schema({
    sectionName: {
        type: String
    },
    products: [ProductsSchema]
}, {timestamps: true})


//parent model
const RestaurantSchema = new mongoose.Schema({
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
  }, {
    timestamps: true
  })

  module.exports = mongoose.model('Restaurant', RestaurantSchema)