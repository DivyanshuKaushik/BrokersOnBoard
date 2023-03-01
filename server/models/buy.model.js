const mongoose = require("mongoose");

const buySchema = new mongoose.Schema({
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
    requestType:{
        type: String,
        enum: ["buy","rent"],
        default: "buy",
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
});

const Buy = mongoose.model("Buy", buySchema);

module.exports = Buy;