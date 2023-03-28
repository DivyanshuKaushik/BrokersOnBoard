import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdLockOutline, MdOutlineMail } from "react-icons/md";
import { DefaultError, OnError } from "../alerts";
import { login } from "../services/auth";

const fields = [
    { name: "email", icon: <MdOutlineMail size={24} /> },
    { name: "password", icon: <MdLockOutline size={24} /> },
];

export default function SignIn() {
    const router = useRouter();

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    function handleChange(e) {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    // sign in user
    const signin = async (e) => {
        e.preventDefault();
        const res = await login(userData.email, userData.password);
        if (res.error) {
            const err = res.error.response?.data.error;
            if (!err) return DefaultError();
            return OnError(err);
        }
        window.location.replace("/");
    };
    return (
        <main className="flex justify-center items-center p-4">
            <div className="border shadow-md rounded-md lg:m-4 p-6 lg:p-8">
                {/* logo  */}
                <h1 className="text-primary text-2xl font-semibold text-center">
                    Brokers On Board
                </h1>
                <h3 className="text-sm text-center text-secondary mt-2">Welcome, Please signin to explore our services</h3>
                {/* login form  */}
                <form className="space-y-4 mt-5" onSubmit={signin}>
                    {fields.map(({ name, icon }) => (
                        <div
                            key={name}
                            className="flex flex-col space-y-2 min-w-[400px]: lg:w-[400px]"
                        >
                            <label
                                htmlFor={name}
                                className="capitalize text-sm text-gray-800"
                            >
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
                                    placeholder={
                                        name === "password"
                                            ? "Password of minimum 8 characters"
                                            : "Enter your email"
                                    }
                                />
                            </div>
                        </div>
                    ))}
                    <div className="">
                        <button
                            className="bg-primary active:bg-red-400 text-white py-2 px-4 rounded-md w-full"
                            type="submit"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <div className="flex items-center justify-between text-sm text-secondary my-6">
                    {/* forget password  */}
                    <Link href="/forget-password">
                        <p className="">Forget Password?</p>
                    </Link>
                    {/* signup  */}
                    <Link href="/signup">
                        <p className="">Don't have an account? Sign Up</p>
                    </Link>
                </div>
            </div>
        </main>
    );
}
