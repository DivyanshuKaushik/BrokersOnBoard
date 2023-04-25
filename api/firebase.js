const admin = require("firebase-admin");

const serviceAccount = require("./config/firebase-admin.json");

// initialize firebase app with admin credentials
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
