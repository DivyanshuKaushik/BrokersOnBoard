import api from "./api";

export async function addNewProperty(property) {
    let res = {};
    try {
        const {
            title,
            description,
            sqft,
            price,
            address,
            city,
            state,
            pincode,
            propertyType,
            requestType,
            images,
        } = property;
        if (
            !(
                title &&
                description &&
                sqft &&
                price &&
                address &&
                city &&
                state &&
                pincode &&
                propertyType &&
                requestType &&
                images
            )
        ) {
            throw Error("Please fill all the fields");
        }
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("sqft", sqft);
        formData.append("price", price);
        formData.append("address", address);
        formData.append("city", city.toLowerCase());
        formData.append("state", state.toLowerCase());
        formData.append("pincode", pincode);
        formData.append("propertyType", propertyType);
        formData.append("requestType", requestType);
        [...property.images].forEach(image => {
            formData.append("images", image);
        });
        res.data = (
            await api.post("/property/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
        ).data;
    } catch (err) {
        console.log(err,"api");
        res.error = err;
    }
    return res;
}

export async function updateProperty(id,property){
    let res = {};
    try {
        const {
            title,
            description,
            sqft,
            price,
            address,
            city,
            state,
            pincode,
            propertyType,
            requestType,
        } = property;
        if (
            !(
                title &&
                description &&
                sqft &&
                price &&
                address &&
                city &&
                state &&
                pincode &&
                propertyType &&
                requestType
            )
        ) {
            throw Error("Please fill all the fields");
        }
        res.data = (
            await api.put(`/property/update/${id}`, property)
        ).data;
    } catch (err) {
        res.error = err;
    }
    return res;
}

export async function deleteProperty(propertyId){
    let res = {};
    try {
        res.data = (
            await api.delete(`/property/delete/${propertyId}`)
        ).data;
    } catch (err) {
        res.error = err;
    }
    return res;
}

export async function getMyProperties(){
    let res = {};
    try {
        res.data = (
            await api.get("/property/my")
        ).data.data;
    } catch (err) {
        res.error = err;
    }
    return res;
}

export async function getProperties(query){
    let res = {};
    try {
        Array.from(Object.keys(query)).forEach(key => {
            if(query[key] === ""){
                delete query[key];
            }
        });
        res.data = (
            await api.get("/property",{params:query})
        ).data.data;
    } catch (err) {
        res.error = err;
    }
    return res;
}