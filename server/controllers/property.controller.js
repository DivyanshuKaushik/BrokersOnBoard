const Property = require("../models/property.model");
const {uploadImage, deleteImage} = require("../utils/s3");

const generateId = () => {
    let date = new Date().toLocaleDateString().split("/").reverse().join("");
    let time = new Date().toTimeString().split(" ")[0].split(":").join("");
    return date.concat(time);
};

async function addNewProperty(req, res) {
  try {
    const { title,description, sqft, price, address, city, state, pincode, propertyType, requestType } = req.body;
    if (!title || !description || !sqft || !price || !address || !city || !state || !pincode || !propertyType || !requestType) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }
    if(req.files.length === 0){
        return res.status(400).json({error:"Please upload atleast one image"});
    }
    const images = await Promise.all(req.files.map(async (file) => {
        const img_name = "property/" + generateId();
        const img_url = await uploadImage(file.buffer, img_name);
        return img_url;
    }))
    const property = new Property({...req.body,broker:req.user._id,images});
    await property.save();
    res.status(200).json({ msg: "Property added successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function updateProperty(req,res){
    try{
        const {id} = req.params;
        const {title,description, sqft, price, address, city, state, pincode, propertyType, requestType } = req.body;
        if (!title || !description || !sqft || !price || !address || !city || !state || !pincode || !propertyType || !requestType) {
            return res.status(400).json({ error: "Please fill all the fields" });
        }
        const property = await Property.findById(id);
        if(!property){
            return res.status(404).json({error:"Property not found"});
        }
        // if(req.files.length !== 0){
        //     const images = await Promise.all(req.files.map(async (file) => {
        //         const img_name = "property/" + generateId();
        //         const img_url = await uploadImage(file, img_name);
        //         return img_url;
        //     }))
        //     property.images = images;
        // }
        property.title = title;
        property.description = description;
        property.sqft = sqft;
        property.price = price;
        property.address = address;
        property.city = city;
        property.state = state;
        property.pincode = pincode;
        property.propertyType = propertyType;
        property.requestType = requestType;
        await property.save();
        res.status(200).json({ msg: "Property updated successfully" });
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
}

async function deleteProperty(req,res){
    try{
        const {id} = req.params;
        const property = await Property.findById(id);
        if(!property){
            return res.status(404).json({error:"Property not found"});
        }
        await Promise.all(property.images.map(async (img) => {
            const img_name = img.split(".com").pop();
            await deleteImage(img_name);
        }))

        await Property.findByIdAndDelete(id);   
        return res.status(200).json({ msg: "Property deleted successfully" });
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
}

async function getAllProperties(req,res){
    try{
        let {page,limit} = req.query;
        page = parseInt(page);
        limit = parseInt(limit);
        const properties = await Property.find().sort({updatedAt:-1}).skip((page-1)*limit).limit(limit).populate("broker");
        return res.status(200).json({data:properties});
    }catch(err){
        res.status(500).json({error:"Internal server error"});
    }
}

async function getPropertyById(req,res){
    try{
        const {id} = req.params;
        const property = await Property.findById(id).populate("broker");
        if(!property){
            return res.status(404).json({error:"Property not found"});
        }
        return res.status(200).json({data:property});
    }catch(err){
        res.status(500).json({error:"Internal server error"});
    }
}

async function getPropertyByBroker(req,res){
    try{
        let {page,limit} = req.query;
        page = parseInt(page);
        limit = parseInt(limit);
        const data = await Property.find({broker:req.user._id}).sort({updatedAt:-1}).skip((page-1)*limit).limit(limit).select("-broker -__v -createdAt -updatedAt");
        return res.status(200).json({data});

    }catch(err){
        res.status(500).json({error:"Internal server error"});
    }
}


async function getPropertiesByFilter(req,res){
    try{
        let {page,limit,requestType,propertyType,city,state,pincode,broker} = req.query;
        page = parseInt(page);
        limit = parseInt(limit);   
        let query = {requestType,propertyType,city,state,pincode,broker};
        // remove undefined query keys
        Array.from(Object.keys(query)).forEach(key=>{
            if(!query[key]){
                delete query[key];
            }
        });  
        const data = await Property.find(query).sort({updatedAt:-1}).skip((page-1)*limit).limit(limit).populate("broker","-password -createdAt -updatedAt -__v").select("-__v -createdAt -updatedAt");
        return res.status(200).json({data});
    }catch(err){
        res.status(500).json({error:"Internal server error"});
    }

}

module.exports = {
    addNewProperty,
    updateProperty,
    deleteProperty,
    getPropertyByBroker,
    getAllProperties,
    getPropertyById,
    getPropertiesByFilter
};