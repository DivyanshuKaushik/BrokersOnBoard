const { brokerSignUp, userSignUp, login, getAuthUser, createAdmin, getAllUsers, getAllBrokers } = require('../controllers/auth.controllers');
const upload = require('../middlewares/upload');
const {isAuthenticated, isAdmin} = require('../middlewares/auth.middleware');

const router = require('express').Router();

// sign up routes /auth/user/signup and /auth/broker/signup @access Public - POST
router.post('/user/signup',userSignUp)
router.post('/broker/signup',upload.single('visitingCard'),brokerSignUp)

// login routes /auth/user/login and /auth/broker/login @access Public - POST
router.post('/login',login)

// get auth user details /auth/user @access Private - GET
router.get('/user',isAuthenticated,getAuthUser)

// create admin user /auth/admin/signup @access Private (Admin) - POST
router.post('/admin/signup',isAdmin,createAdmin)

// get all users /auth/users @access Private (Admin) - GET
router.get('/users',isAdmin,getAllUsers)

// get all brokers /auth/brokers @access Private (Admin) - GET
router.get('/brokers',isAdmin,getAllBrokers)

router.post('/logout', (req, res) => {
    res.clearCookie('accessToken');
    res.redirect('/');
});

module.exports = router