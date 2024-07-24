const router = require('express').Router()
const {login, register, profile} = require('../controllers/userController')
const middleware = require('../middleware/usermiddle')

router.post('/login', login)
router.post('/register',register)
router.get('/profile',middleware,profile)

module.exports = router