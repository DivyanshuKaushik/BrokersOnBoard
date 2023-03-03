const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    address: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    pincode:{
        type:Number,
    },
    propertyType:{
        type: String,
        default: "land",
    },
    requestType:{
        type: String,
        enum: ["buy","rent"],
        default: "buy",
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;