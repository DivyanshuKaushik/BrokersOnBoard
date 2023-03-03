import api from "./api";

export async function addNewRequest(request) {
    let res = {};
    try {
        const {
            city,
            state,
            requestType,
            propertyType,
        } = request;
        if (
            !(
                city &&
                state &&
                requestType &&
                propertyType
            )
        ) {
            throw Error("Please fill all the fields");
        }
        res.data = (
            await api.post("/request/add", request)
        ).data;
    } catch (err) {
        res.error = err;
    }
    return res;
}

export async function updateRequest(id,request){
    let res = {};
    try {
        const {
            city,
            state,
            requestType,
            propertyType,
        } = request;
        if (
            !(
                city &&
                state &&
                requestType &&
                propertyType
            )
        ) {
            throw Error("Please fill all the fields");
        }
        res.data = (
            await api.put(`/request/update/${id}`, request)
        ).data;
    } catch (err) {
        res.error = err;
    }
    return res;
}

export async function deleteRequest(requestId){
    let res = {};
    try {
        res.data = (
            await api.delete(`/request/delete/${requestId}`)
        ).data;
    } catch (err) {
        res.error = err;
    }
    return res;
}

export async function getMyRequests(){
    let res = {};
    try {
        res.data = (
            await api.get("/request/my")
        ).data.data;
    } catch (err) {
        res.error = err;
    }
    return res;
}

export async function getRequests(query){
    let res = {};
    try {
        Array.from(Object.keys(query)).forEach(key => {
            if(query[key] === ""){
                delete query[key];
            }
        });
        res.data = (
            await api.get("/request",{params:query})
        ).data.data;
    } catch (err) {
        res.error = err;
    }
    return res;
}