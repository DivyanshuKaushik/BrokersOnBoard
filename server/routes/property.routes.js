const { addNewProperty, updateProperty, deleteProperty, getPropertiesByFilter, getAllProperties, getPropertyById, getPropertyByBroker } = require('../controllers/property.controller');
const { isBroker, isAdmin } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload');

const router = require('express').Router();

/** broker routes - start */
// add new property /property/add @access Private (Broker) - POST
router.post('/add',upload.array("images"),addNewProperty);

// update property /property/update/:id @access Private (Broker) - PUT 
router.put('/update/:id',isBroker,updateProperty);
// delete property /property/delete/:id @access Private (Broker) - DELETE
router.delete('/delete/:id',isBroker,deleteProperty);

// broker properties /property/my @access Private (Broker) - GET
router.get('/my',isBroker,getPropertyByBroker);
/** broker routes - end */

/** admin routes - start */
// get property by filters (rent | sale) or broker /property @access Private (Admin) - GET
router.get('/',getPropertiesByFilter);

// get all properties /property/all @access Private (Admin) - GET
router.get('/all',isAdmin,getAllProperties);

// get property by id /property/:id @access Private (Admin) - GET
router.get('/:id',isAdmin,getPropertyById);
/** admin routes - end */


module.exports = router;