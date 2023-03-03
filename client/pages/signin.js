import React, { useState } from "react";
import { MdLockOutline, MdOutlineMail } from "react-icons/md";
import {login} from "../services/auth"

const fields = [
    { name: "email", icon: <MdOutlineMail size={24} /> },
    { name: "password", icon: <MdLockOutline size={24} /> },
];

export default function SignIn() {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    function handleChange(e){
        setUserData({...userData, [e.target.name]: e.target.value});
    }

    // sign in user 
    const signin = async(e) => {
        e.preventDefault();
        console.log(userData);
        const res = await login(userData.email, userData.password);
        if(res.error){
            console.log(res.error.response?.data);
            return alert("dsjskf");
        }
        console.log(res);

    }
    return (
        <main className="flex justify-center items-center m-8">
            <div className="shadow-md rounded-md p-4">
                {/* logo  */}
                <h1 className="text-primary text-2xl font-semibold">
                    Brokers On Board
                </h1>
                {/* login form  */}
                <form className="space-y-4" onSubmit={signin}>
                    {fields.map(({name,icon}) => (
                        <div key={name} className="flex flex-col space-y-2 w-[350px] lg:w-[400px]">
                            <label htmlFor={name} className="capitalize text-sm text-gray-700">
                                {name}
                            </label>
                            <div className="flex items-center space-x-2 border rounded-md px-2 ">
                                <span className="text-primary">{icon}</span>
                                <input
                                    type={name}
                                    name={name}
                                    value={userData[name]}
                                    onChange={handleChange}
                                    className="outline-none bg-transparent p-2 w-full"
                                    placeholder={name === "password" ? "Password of minimum 8 characters" : "Enter your email"}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="">
                        <button className="bg-primary active:bg-red-400 text-white py-2 px-4 rounded-md w-full" type="submit">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
