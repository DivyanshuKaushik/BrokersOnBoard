const User = require("../models/user.model");
const validator = require("validator");
const { uploadImage } = require("../utils/s3");

async function userSignUp(req,res){
    try{
        const {firstName,lastName,email,phone,password} = req.body;
        if(!firstName || !lastName || !phone || !email || !password){
            return res.status(422).json({error:"Please fill all the fields"});
        }
        if(!validator.isEmail(email)){
            return res.status(422).json({error:"Please enter a valid email"});
        }
        if(password.length < 8){
            return res.status(422).json({error:"Password must be atleast 8 characters long"});
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(422).json({error:"User already exists"});
        }
        const newUser = new User({firstName,lastName,email,password,phone});
        await newUser.save();
        return res.status(201).json({message:"User created successfully"});

    }catch(err){
        return res.status(500).json({error:"Internal server error"});
    }
}

async function brokerSignUp(req,res){
    try{
        if(!req.file){
            return res.status(422).json({error:"Please upload a visiting card"});
        }
        const {firstName,lastName,email,phone,password} = req.body;
        if(!firstName || !lastName || !email || !phone || !password){
            return res.status(422).json({error:"Please fill all the fields"});
        }
        if(!validator.isEmail(email)){
            return res.status(422).json({error:"Please enter a valid email"});
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(422).json({error:"User already exists"});
        }
        const newUser = new User({firstName,lastName,email,phone,password,role:"broker"});
        const saved = await newUser.save();
        const img_name = `visitingCards/${saved._id}`;
        const img_url = await uploadImage(
            req.file?.buffer,
            img_name
        );
        await User.findByIdAndUpdate(saved._id,{visitingCard:img_url});
        return res.status(201).json({message:"User created successfully"});
    }catch(err){
        console.log(err);
        return res.status(500).json({error:"Internal server error"});
    }
}

async function login(req,res){
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(422).json({error:"Please fill all the fields"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(422).json({error:"User does not exist"});
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(422).json({error:"Invalid credentials"});
        }
        const token = await user.generateAuthToken();
        res.cookie('accessToken',token,{expiresIn:'10d',httpOnly:true,secure:true,sameSite:'none'})
        return res.status(200).json({token});

    }catch(err){
        console.log(err);
        return res.status(500).json({error:"Internal server error"});
    }
}

async function getAuthUser(req,res){
    try{
        const user = await User.findById(req.user._id).select('-password').select('-createdAt').select('-updatedAt').select('-__v');
        return res.status(200).json({data:user});
    }catch(err){
        return res.status(500).json({error:"Internal server error"});
    }
}

async function createAdmin(req,res){
    try{
        const {firstName,lastName,email,phone,password} = req.body;
        if(!firstName || !lastName || !phone || !email || !password){
            return res.status(422).json({error:"Please fill all the fields"});
        }
        if(!validator.isEmail(email)){
            return res.status(422).json({error:"Please enter a valid email"});
        }
        const newUser = new User({firstName,lastName,email,password,phone,role:"admin"});
        await newUser.save();
        return res.status(201).json({message:"User created successfully"});

    }catch(err){
        return res.status(500).json({error:"Internal server error"});
    }
}

async function getAllUsers(req,res){
    try{
        const data = await User.find({role:"user"}).select('-password').select('-createdAt').select('-updatedAt').select('-__v');
        return res.status(200).json({data});
    }catch(err){
        return res.status(500).json({error:"Internal server error"});
    }
}

async function getAllBrokers(req,res){
    try{
        const data = await User.find({role:"broker"}).select('-password').select('-createdAt').select('-updatedAt').select('-__v');
        return res.status(200).json({data});
    }catch(err){
        return res.status(500).json({error:"Internal server error"});
    }
}

module.exports = {
    userSignUp,
    brokerSignUp,
    login,
    getAuthUser,
    createAdmin,
    getAllUsers,
    getAllBrokers
}