const Contact = require("../models/contact.model");

async function contactUs(req,res){
    try{
        const {name,phone,message} = req.body;
        if(!name || !phone || !message){
            return res.status(422).json({error:"Please fill all the fields"});
        }
        const newContact = new Contact({name,phone,message,user:req.user._id});
        await newContact.save();
        return res.status(201).json({message:"Message sent successfully"});
    }catch(err){
        return res.status(500).json({error:"Internal server error"});
    }
}

async function getContacts(req,res){
    try{
        let {page,limit} = req.query;
        if(page && limit){
            page = parseInt(page);
            limit = parseInt(limit);
        }
        const contacts = await Contact.find().sort({updatedAt:-1}).skip((page-1)*limit).limit(limit).select('-createdAt').select('-updatedAt').select('-__v');
        return res.status(200).json({data:contacts});
    }catch(err){
        return res.status(500).json({error:"Internal server error"});
    }
};

module.exports = {
    contactUs,
    getContacts
}