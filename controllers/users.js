const router = require('express').Router()
const db = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authLockedRoute = require('./authLockedRoute')

// GET /users - test endpoint
router.get('/', async(req, res) => {
  const findUser = await db.User.findOne({
    email: res.locals.user
  })
  console.log(findUser, "GET TEST")
  res.json(findUser)
})

// POST /users/register - CREATE new user
router.post('/register', async (req, res) => {
  try {
    // check if user exists already
    const findUser = await db.User.findOne({
      email: req.body.email
    })

    // don't allow emails to register twice
    if (findUser) return res.status(400).json({ msg: 'email exists already' })

    // hash password
    const password = req.body.password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    
    //create the user address
    // const newAddress = 
    // create new user
    const newUser = new db.User(
      {email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address
      })
    console.log(newUser)

    await newUser.save()

    // create jwt payload
    const payload = {
      name: newUser.name,
      email: newUser.email,
      id: newUser.id,
      phoneNumber: newUser.phoneNumber,
      address: newUser.address
    }

    // sign jwt and send back
    const token = await jwt.sign(payload, process.env.JWT_SECRET)

    res.json({ token })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'server error' })
  }
})

// POST /users/login -- validate login credentials
router.post('/login', async (req, res) => {
  try {
    // try to find user in the db
    const foundUser = await db.User.findOne({
      email: req.body.email
    })

    const noLoginMessage = 'Incorrect username or password'

    // if the user is not found in the db, return and sent a status of 400 with a message
    if (!foundUser) return res.status(400).json({ msg: noLoginMessage })

    // check the password from the req body against the password in the database
    const matchPasswords = await bcrypt.compare(
      req.body.password,
      foundUser.password
    )

    // if provided password does not match, return an send a status of 400 with a message
    if (!matchPasswords) return res.status(400).json({ msg: noLoginMessage })

    // create jwt payload
    const payload = {
      name: foundUser.name,
      email: foundUser.email,
      id: foundUser.id,
      phoneNumber: foundUser.phoneNumber,
      address: foundUser.address
    }

    // sign jwt and send back
    const token = await jwt.sign(payload, process.env.JWT_SECRET)

    res.json({ token })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'server error' })
  }
})

// GET /auth-locked - will redirect if bad jwt token is found
router.get('/auth-locked', authLockedRoute, (req, res) => {
  // we know that if we made it here, the res.locals contains an authorized user
  console.log('this user has been authorized:', res.locals.user)
  res.json({ msg: 'welcome to the private route!' })
})

module.exports = router
