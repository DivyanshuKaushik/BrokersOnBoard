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
        const { fisrtName, lastName, email, password, confirmPassword } = user;
        if (!(fisrtName && lastName && email && password && confirmPassword)) {
            return (res.error = "Please fill all the fields");
        }
        if (user.password === user.confirmPassword) {
            return (res.error = "Passwords do not match");
        }
        res.data = (
            await api.post("/auth/user/signup", {
                fisrtName,
                lastName,
                email,
                password,
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
            fisrtName,
            lastName,
            email,
            password,
            confirmPassword,
            visitingCard,
        } = broker;
        if (
            !(
                fisrtName &&
                lastName &&
                email &&
                password &&
                confirmPassword &&
                visitingCard
            )
        ) {
            return (res.error = "Please fill all the fields");
        }
        if (broker.password === broker.confirmPassword) {
            return (res.error = "Passwords do not match");
        }
        const formData = new FormData();

        formData.append("visitingCard", visitingCard);
        formData.append("fisrtName", fisrtName);
        formData.append("lastName", lastName);
        formData.append("email", email);
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

export async function getAllUsers() {
    let res = {};
    try{
        res.data = (await api.get("/auth/users")).data.data;
    }
    catch(err){
        res.error = err;
    }
    return res;
}

export async function getAllBrokers() {
    let res = {};
    try{
        res.data = (await api.get("/auth/brokers")).data.data;
    }
    catch(err){
        res.error = err;
    }
    return res;
}