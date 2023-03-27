const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        // required: true,
        trim: true,
        default: "",
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        // required: true,
        default: "BrokersonBoard@admin",
        trim: true,
    },
    visitingCard:{
        type:String,
    },
    role: {
        type: String,
        enum: ["user","broker","admin"],
        default: "user",
    },
},{timestamps:true});

// middleware to hash the password before saving to database using bcryptjs
userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12)
    }
    next();
})
// end hashing password middleware 

// compare password middleware
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}
// end  compare password middleware

// generate auth token for user authentication
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id,email:this.email,role:this.role},process.env.JWT_SECRET,{expiresIn:'10d'});
        return token;
    }
    catch(err){
        console.error(err)
    }
}
// end generate auth token for user authentication

const User = mongoose.model("User", userSchema);

module.exports = User;