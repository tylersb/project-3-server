const router = require('express').Router()
const db = require('../models')

// GET /restaurants
router.get('/', async (req, res) => {
  try {
    const allRestaurants = await db.Restaurant.find()
    res.json(allRestaurants)
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Server Error' })
  }
})

// GET /restaurants/:id
router.get('/:id', async (req, res) => {
  try {
    const foundRestaurant = await db.Restaurant.findById(req.params.id)
    res.json(foundRestaurant)
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Server Error' })
  }
})

module.exports = router
