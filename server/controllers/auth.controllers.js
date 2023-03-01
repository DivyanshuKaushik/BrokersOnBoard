const User = require("../models/user.model");

async function userSignUp(req,res){
    try{
        const {firstName,lastName,email,password} = req.body;
        if(!firstName || !lastName || !email || !password){
            return res.status(422).json({error:"Please fill all the fields"});
        }
        const newUser = new User({firstName,lastName,email,password});
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
        const {firstName,lastName,email,password} = req.body;
        if(!firstName || !lastName || !email || !password){
            return res.status(422).json({error:"Please fill all the fields"});
        }
        const newUser = new User({firstName,lastName,email,password,role:"broker"});
        const saved = await newUser.save();
        const img_name = `visitingCards/${saved._id}`;
        const img_url = await uploadImage(
            req.file?.buffer,
            img_name
        );
        await User.findByIdAndUpdate(saved._id,{visitingCard:img_url});
        return res.status(201).json({message:"User created successfully"});
    }catch(err){
        return res.status(500).json({error:"Internal server error"});
    }
}

async function login(req,res){
    try{

    }catch(err){
        return res.status(500).json({error:"Internal server error"});
    }
}
module.exports = {
    userSignUp,
    brokerSignUp,
}