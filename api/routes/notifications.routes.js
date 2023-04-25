const router = require("express").Router();
const admin = require("../firebase");

const tokens = [];

router.post("/register", async(req, res) => {
    console.log("Registering FCM Token: ", req.body.token);
    tokens.push(req.body.token);
    return res.status(200).json({ message: "Successfully registered FCM Token!" });
});

router.post("/", async (req, res) => {
    try {
        const { title, body, imageUrl } = req.body;
        await admin.messaging().sendMulticast({
            tokens,
            notification: {
                title:"hello",
                body:"hello",
                // imageUrl,
            },
        });
        res.status(200).json({ message: "Successfully sent notifications!" });
    } catch (err) {
        console.log(err);
        res.status(err.status || 500).json({
            message: err.message || "Something went wrong!",
        });
    }
});


module.exports = router;