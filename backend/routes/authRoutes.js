const express = require('express')
const { AuthController } = require('../controllers')
const {login, signup} = AuthController

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)

module.exports = router 