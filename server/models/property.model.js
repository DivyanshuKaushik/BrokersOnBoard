const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    phone:{
        type: String,
        required: true,
        trim: true,
    },
    title:{
        type: String,
        // required: true,
        trim: true,
    },
    description:{
        type: String,
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
        default: "land",
    },
    requestType:{
        type: String,
        enum: ["sale","rent"],
        default: "sale",
    },
    // broker:{
    //     type: mongoose.Types.ObjectId,
    //     ref:'User'
    // }
},{timestamps:true});


const Property = mongoose.model("Property", propertySchema);

module.exports = Property;