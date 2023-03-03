const Request = require("../models/request.model");

async function addNewRequest(req,res){
    try{
        const {address,city,state,pincode,requestType,propertyType} = req.body;
        if(!(city && state && requestType && propertyType)){
            return res.status(400).json({error:"Please fill all the fields"});
        }
        const request = new Request({...req.body,user:req.user._id});
        await request.save();
        return res.status(200).json({msg:"Request added successfully"});
    }catch(err){
        return res.status(500).json({error:"Internal server error"});
    }
}

async function updateRequest(req,res){
    try{
        const {id} = req.params;
        const {address,city,state,pincode,requestType,propertyType} = req.body;
        if(!(city && state && requestType && propertyType)){
            return res.status(400).json({error:"Please fill all the fields"});
        }
        const request = await Request.findById(id);
        if(!request){
            return res.status(404).json({error:"Request not found"});
        }
        request.address = address;
        request.city = city;
        request.state = state;
        request.pincode = pincode;
        request.requestType = requestType;
        request.propertyType = propertyType;
        await request.save();
        return res.status(200).json({msg:"Request updated successfully"});
    }catch(err){
        return res.status(500).json({error:"Internal server error"});
    }
}

async function deleteRequest(req,res){
    try{
        const {id} = req.params;
        await Request.findByIdAndDelete(id);
        return res.status(200).json({msg:"Request deleted successfully"});
    }catch(err){
        return res.status(500).json({error:"Internal server error"});
    }
}

async function getUserRequests(req,res){
    try{
        let {page,limit} = req.query;
        page = parseInt(page);
        limit = parseInt(limit);
        const data = await Request.find({user:req.user._id}).sort({updatedAt:-1}).skip((page-1)*limit).limit(limit).select("-user -__v -createdAt -updatedAt");
        return res.status(200).json({data});
    }catch(err){
        console.log(err);
        return res.status(500).json({error:"Internal server error"});
    }
}

async function getRequestsByFilter(req,res){
    try{
        let {page,limit,requestType,propertyType,city,state,pincode,user} = req.query;
        page = parseInt(page);
        limit = parseInt(limit);   
        let query = {requestType,propertyType,city,state,pincode,user};
        // remove undefined query keys
        Array.from(Object.keys(query)).forEach(key=>{
            if(!query[key]){
                delete query[key];
            }
        }); 
        const data = await Request.find(query).sort({updatedAt:-1}).skip((page-1)*limit).limit(limit).populate("user","-password -__v -createdAt -updatedAt").select("-__v -createdAt -updatedAt");
        return res.status(200).json({data});
    }catch(err){
        console.log(err);
        return res.status(500).json({error:"Internal server error"});
    }
}

async function getRequestById(req,res){
    try {
        const {id} = req.params;
        const data = Request.findById(id).populate("user");
        if(!data){
            return res.status(404).json({error:"Request not found"});
        }
        return res.status(200).json({data});
    } catch (error) {
        return res.status(500).json({error:"Internal server error"});
    }
}

module.exports = {
    addNewRequest,
    updateRequest,
    deleteRequest,
    getUserRequests,
    getRequestsByFilter,
    getRequestById
}