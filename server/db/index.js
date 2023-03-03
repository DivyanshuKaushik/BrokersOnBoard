const mongoose = require("mongoose");
// const dotenv = require('dotenv')
// dotenv.config()
require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI;

async function connectMongoDB(){
    await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
};

module.exports = connectMongoDB;
