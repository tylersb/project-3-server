const router = require('express').Router()
const db = require('../models')

// GET /orders/:id
router.get('/:id', async (req, res) => {
  try {
    const foundOrder = await db.Order.findById(req.params.id)
    res.json(foundOrder)
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Server Error' })
  }
})

// POST /orders
router.post('/', async (req, res) => {
  try {
    const user = await db.User.findById(req.body.userId)

    const newOrder = {
      products: req.body.products,
      dropoffAddress: req.body.dropoffAddress,
      restaurantId: req.body.restaurantId
    }

    user.orders.push(newOrder)
    await user.save()
    res.json(user)
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Server Error' })
  }
})

module.exports = router
