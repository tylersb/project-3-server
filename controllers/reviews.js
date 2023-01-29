const router = require('express').Router()
const db = require('../models')

const errorChecking = async (req, res, next) => {
  try {
    if (!req.body.restaurantId) {
      throw new Error('No restaurantId provided')
    }
    if (!req.body.userId) {
      throw new Error('No userId provided')
    }
    if (!req.body.rating) {
      throw new Error('No rating provided')
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Server Error' })
  }
}

// POST /reviews
router.post('/', errorChecking, async (req, res) => {
  try {
    if (
      db.Review.find({
        restaurantId: req.body.restaurantId,
        userId: req.body.userId
      }).length > 0
    ) {
      throw new Error('You have already reviewed this restaurant')
    }
    const newReview = await db.Review.create(req.body)
    res.json(newReview)
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Server Error' })
  }
})

// PUT /reviews/:id
router.put('/:id', errorChecking, async (req, res) => {
  try {
    const updatedReview = await db.Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(updatedReview)
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Server Error' })
  }
})

// GET /reviews/restaurants/:id
router.get('/restaurants/:id', async (req, res) => {
  try {
    const reviews = await db.Review.find({ restaurantId: req.params.id })
    res.json(reviews)
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Server Error' })
  }
})

module.exports = router
