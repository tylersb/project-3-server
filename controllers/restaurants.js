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

//POST /restaurants / creates restaurant
router.post('/', async (req, res) => {
  try {
    
    const newRestaurant = await db.Restaurant.findOneAndUpdate(
      { restaurantName: req.body.restaurantName }, 
      { accountHolderName: req.body.accountHolderName, 
        restaurantDescription: req.body.restaurantDescription,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        menu: req.body.menu,
      },
      { new: true, upsert: true }
    )
    res.json(newRestaurant)
  } catch (err) {
    console.log('error on restaurnt POST', err)
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
