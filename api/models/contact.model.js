const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
},{timestamps:true});


const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;