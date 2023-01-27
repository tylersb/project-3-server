const router = require('express').Router()
const db = require('../models')

// POST /orders
router.post('/', async (req, res) => {
  try {
    const newOrder = await db.Order.create(req.body)
    res.json(newOrder)
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Server Error' })
  }
})

// GET /orders/:id
router.get('/:id', async (req, res) => {
  try {
    const foundOrder = await db.Order.findById(req.params.id)
    res.json(foundOrder)
  } catch (err) {
    console.log(err)
    if (err.name === 'CastError') {
      return res.status(400).json({ msg: 'Invalid Order ID' })
    }
    res.status(500).json({ msg: 'Server Error' })
  }
})

// PUT /orders/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedOrder = await db.Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, upsert: true }
    )
    res.json(updatedOrder)
  } catch (err) {
    console.log(err)
    if (err.name === 'CastError') {
      return res.status(400).json({ msg: 'Invalid Order ID' })
    }
    res.status(500).json({ msg: 'Server Error' })
  }
})

// DELETE /orders/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedOrder = await db.Order.findByIdAndDelete(req.params.id)
    res.json(deletedOrder)
  } catch (err) {
    console.log(err)
    if (err.name === 'CastError') {
      return res.status(400).json({ msg: 'Invalid Order ID' })
    }
    res.status(500).json({ msg: 'Server Error' })
  }
})

module.exports = router
