const router = require('express').Router()
const requests = require('../controllers/rentalController')
const middleware = require('../middleware/usermiddle')

router.post('/request/:id', middleware, requests.sendRequest)
router.get('/myrequests', middleware, requests.getMyRequests)
router.get('/sentrequests', middleware, requests.getMySentRequests)
router.post('/accept/:id', middleware,requests.acceptRequest)
router.post('/reject/:id', middleware,requests.rejectRequest)


module.exports = router