const { brokerSignUp, userSignUp } = require('../controllers/auth.controllers');
const upload = require('../middlewares/upload');

const router = require('express').Router();

// sign up routes /auth/user/signup and /auth/broker/signup @access Public - POST
router.post('/user/signup',userSignUp)
router.post('/broker/signup',upload.single('visitingCard'),brokerSignUp)

// login routes /auth/user/login and /auth/broker/login @access Public - POST
router.post('/login')

// get auth user details /auth/user @access Private - GET
router.get('/user')

module.exports = router