const express = require('express')
const router = express.Router()
const { 
    getCryptoshops,
    getMyCryptoshops,
    setCryptoshop, 
    updateCryptoshop, 
    deleteCryptoshop 
} = require('../controllers/cryptoshopControllers')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getCryptoshops).post(protect, setCryptoshop)
// equals to --> router.get('/', getCryptoshops) + router.post('/', setCryptoshops)

router.route('/my').get(getMyCryptoshops).post(protect, setCryptoshop)

router.route('/:id').put(protect, updateCryptoshop).delete(protect, deleteCryptoshop)
// equals to --> router.put('/:id', updateCryptoshop) + router.delete('/:id', deleteCryptoshop)

module.exports = router
