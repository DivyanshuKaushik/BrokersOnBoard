import api from "./api";

export async function login(email, password) {
    let res = {};
    try {
        res.data = (await api.post("/auth/login", { email, password })).data;
    } catch (err) {
        res.error = err;
    }
    return res;
}

export async function userSignUp(user) {
    let res = {};
    try {
        const { firstName, lastName, email,phone, password, confirmPassword } = user;
        if (!(firstName && lastName  && phone)) {

            throw Error("Please fill all the fields");
        }
        // if (user.password !== user.confirmPassword) {
        //     throw Error("Passwords do not match");
        // }
        res.data = (
            await api.post("/auth/user/signup", {
                firstName,
                lastName,
                phone,
                // email,
                // password,
            })
        ).data;
    } catch (err) {
        res.error = err;
    }
    return res;
}

export async function brokerSignUp(broker) {
    let res = {};
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            password,
            confirmPassword,
            visitingCard,
        } = broker;
        if (
            !(
                firstName &&
                lastName &&
                // email &&
                phone &&
                // password &&
                // confirmPassword &&
                visitingCard
            )
        ) {
            throw Error("Please fill all the fields");
        }
        // if (broker.password !== broker.confirmPassword) {
        //     throw Error("Passwords do not match");
        // }
        const formData = new FormData();

        formData.append("visitingCard", visitingCard);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("password", password);

        res.data = (
            await api.post("/auth/broker/signup", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
        ).data;

    } catch (err) {
        res.error = err;
    }
    return res;
}

export async function getAuthUser() {
    let res = {};
    try{
        res.data = (await api.get("/auth/user")).data.data;
    }
    catch(err){
        res.error = err;
    }
    return res;
}

export async function getAllUsers(query) {
    let res = {};
    try{
        Array.from(Object.keys(query)).forEach(key => {
            if(query[key] === ""){
                delete query[key];
            }
        });
        res.data = (await api.get("/auth/users",{params:query})).data.data;
    }
    catch(err){
        res.error = err;
    }
    return res;
}

export async function getAllBrokers(query) {
    let res = {};
    try{
        Array.from(Object.keys(query)).forEach(key => {
            if(query[key] === ""){
                delete query[key];
            }
        });
        res.data = (await api.get("/auth/brokers",{params:query})).data.data;
    }
    catch(err){
        res.error = err;
    }
    return res;
}
export async function logout() {
    await api.post("/auth/logout");
    return true;
}