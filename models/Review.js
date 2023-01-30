const mongoose = require('mongoose')
const { Schema } = mongoose

const ReviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 0.5,
      max: 5
    },
    comment: {
      type: String
    },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Review', ReviewSchema)
