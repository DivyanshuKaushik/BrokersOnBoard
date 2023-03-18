import api from "./api";

export async function contact(contact) {
    let res = {};
    try {
        const {
            name,
            email,
            phone,
            message,
        } = contact;
        if (
            !(
                name &&
                email &&
                phone &&
                message
            )
        ) {
            throw Error("Please fill all the fields");
        }
        res.data = (
            await api.post("/contact", contact)
        ).data.data;
    } catch (err) {
        res.error = err;
    }
    return res;
}

export async function getContacts(query){
    let res = {};
    try {
        res.data = (
            await api.get(`/contact`,{params:query})
        ).data.data;
    } catch (err) {
        res.error = err;
    }
    return res;
}