const { addNewRequest, updateRequest, deleteRequest, getRequestsByFilter, getUserRequests } = require('../controllers/request.controller');
const { isUser, isAdmin } = require('../middlewares/auth.middleware');

const router = require('express').Router();
/** user routes - start */
// add new (buy | rent) request /request/add @access Private (User) - POST
router.post('/add',isUser,addNewRequest);
// update request /request/update/:id @access Private (User) - PUT
router.put('/update/:id',isUser,updateRequest);
// delete request /request/delete/:id @access Private (User) - DELETE
router.delete('/delete/:id',isUser,deleteRequest);

// user requests /request/my @access Private (User) - GET
router.get('/my',isUser,getUserRequests);
/** user routes - end */

/** admin routes - start */
// get request by filters (buy | rent) /request @access Private (Admin) - GET
router.get('/',isAdmin,getRequestsByFilter);

module.exports = router;