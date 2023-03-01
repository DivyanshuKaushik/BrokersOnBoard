const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    sqft:{
        type: Number,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
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
        required:true,
    },
    images:[
        {
            type:String
        }
    ],
    propertyType:{
        type: String,
        enum: ["house","apartment","condo","townhouse","land","other"],
        default: "land",
    },
    broker:{
        type: mongoose.Types.ObjectId,
        ref:'User'
    }
});


const Property = mongoose.model("Property", propertySchema);

module.exports = Property;