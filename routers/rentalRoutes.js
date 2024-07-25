const router = require('express').Router()
const requests = require('../controllers/rentalController')
const middleware = require('../middleware/usermiddle')

router.post('/request/:id',middleware,requests.sendRequest)
router.get('/myrequests')
router.post('/accept/:id')
router.post('/reject/:id')
router.delete('/delete/:id')



module.exports = router