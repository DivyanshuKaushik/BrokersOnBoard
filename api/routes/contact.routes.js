const {
    contactUs,
    getContacts,
} = require("../controllers/contact.controllers");
const { isAdmin, isAuthenticated } = require("../middlewares/auth.middleware");

const router = require("express").Router();

// contact us route @ /api/contact POST PUBLIC
router.post("/",isAuthenticated,contactUs);

// get all contacts route @ /api/contact GET ADMIN
router.get("/", isAdmin, getContacts);

module.exports = router;
