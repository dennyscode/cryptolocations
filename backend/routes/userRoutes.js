const express = require('express')
const router = express.Router()
const { 
    registerUser, 
    loginUser, 
    getMe,
    getAll,
    confirmationPost,
    resendTokenPost
} = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/all', protect, getAll)
router.post('/confirmation/', protect, confirmationPost);
router.post('/resend', resendTokenPost);

module.exports = router