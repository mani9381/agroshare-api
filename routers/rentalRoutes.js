const router = require('express').Router()
const rentalContoller = require('../controllers/rentalController')
const middleware = require('../middleware/usermiddle')

router.post('/request/:id', middleware, rentalContoller.sendRequest)
router.get('/myrequests', middleware, rentalContoller.getMyRequests)
router.get('/sentrequests', middleware, rentalContoller.getMySentRequests)
router.post('/accept/:id', middleware,rentalContoller.acceptRequest)
router.post('/reject/:id', middleware,rentalContoller.rejectRequest)
router.get('/',(req,res)=>{
    res.json({message:"rental routes"})
})

module.exports = router