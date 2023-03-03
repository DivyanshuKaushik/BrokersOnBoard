const jwt = require("jsonwebtoken");
const errors = require("http-errors");

async function isAuthenticated(req, res, next) {
    try {
        const token = req.headers.authorization || req.cookies.accessToken;
        if (!token) {
            return res.status(401).json({error:"unauthorized"});
        }
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if (!user) {
            return res.status(401).json({error:"unauthorized"});
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({error:"Internal Server Error"});
    }
}

async function isBroker(req, res, next) {
    try {
        const token = req.headers.authorization || req.cookies.accessToken;
        if (!token) {
            return res.status(401).json({error:"unauthorized"});
        }
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if (!user || !(user.role === "broker" || user.role === "admin")) {
            return res.status(401).json({error:"unauthorized"});
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({error:"Internal Server Error"});
    }
}

async function isUser(req, res, next) {
    try {
        const token = req.headers.authorization || req.cookies.accessToken;
        if (!token) {
            return res.status(401).json({error:"unauthorized"});
        }
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if (!user || !(user.role === "user" || user.role === "admin")) {
            return res.status(401).json({error:"unauthorized"});
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({error:"Internal Server Error"});
    }
}

async function isAdmin(req, res, next) {
    try {
        const token = req.headers.authorization || req.cookies.accessToken;
        if (!token) {
            return res.status(401).json({error:"unauthorized"});
        }
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if (!user || user.role !== "admin") {
            return res.status(401).json({error:"unauthorized"});
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({error:"Internal Server Error"});
    }
}

module.exports = {
    isAuthenticated,
    isBroker,
    isUser,
    isAdmin,
};