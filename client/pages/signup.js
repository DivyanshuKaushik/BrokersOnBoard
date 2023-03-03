import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { HiOutlineUser } from "react-icons/hi";
import {
    MdLockOutline,
    MdOutlineFileUpload,
    MdOutlineMail,
    MdOutlinePhone,
} from "react-icons/md";
import { brokerSignUp, userSignUp } from "../services/auth";

const fields = [
    { name: "firstName", icon: <HiOutlineUser size={24} /> },
    { name: "lastName", icon: <HiOutlineUser size={24} /> },
    { name: "email", icon: <MdOutlineMail size={24} /> },
    { name: "phone", icon: <MdOutlinePhone size={24} /> },
    { name: "password", icon: <MdLockOutline size={24} /> },
    { name: "confirmPassword", icon: <MdLockOutline size={24} /> },
];

export default function SignUp() {
    const router = useRouter();

    // state for user | broker registration
    const [broker, setBroker] = useState(false);

    // form data state
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        visitingCard: "",
    });

    function handleChange(e) {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    function handleImage(e) {
        setUserData({ ...userData, visitingCard: e.target.files[0] });
    }

    // sign in user
    const signup = async (e) => {
        e.preventDefault();
        let res;
        if (broker) {
            res = await brokerSignUp(userData);
        } else {
            res = await userSignUp(userData);
        }

        if (res.error) {
            const err = res.error.response?.data.error || res.error;
            if (!err) return alert("something went wrong");
            return alert(err);
        } else {
            router.push("/signin");
        }
    };
    return (
        <main className="flex justify-center items-center p-4 lg:m-8">
            <div className="border shadow-md rounded-md p-4 lg:p-8">
                {/* logo  */}
                <h1 className="text-primary text-2xl font-semibold text-center">
                    Brokers On Board
                </h1>
                <h3 className="text-sm text-center text-secondary mt-2">
                    Welcome, Please create a account to explore our services
                </h3>
                {/* login form  */}
                <form
                    className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4 place-items-center place-content-center"
                    onSubmit={signup}
                >
                    {fields.map(({ name, icon }) => (
                        <div
                            key={name}
                            className="flex flex-col space-y-2 lg:w-[400px]"
                        >
                            <label
                                htmlFor={name}
                                className="capitalize text-sm text-gray-800"
                            >
                                {name === "confirmPassword"
                                    ? "confirm password"
                                    : name.toLowerCase()}
                            </label>
                            <div className="flex items-center space-x-2 border rounded-md px-2 ">
                                <span className="text-primary">{icon}</span>
                                <input
                                    type={
                                        name === "confirmPassword" ||
                                        name === "password"
                                            ? "password"
                                            : name === "email"
                                            ? "email"
                                            : "text"
                                    }
                                    name={name}
                                    value={userData[name]}
                                    onChange={handleChange}
                                    className="outline-none bg-transparent p-2 w-full text-gray-800"
                                    placeholder={
                                        name === "password"
                                            ? "Password of minimum 8 characters"
                                            : name === "confirmPassword"
                                            ? "Confirm password"
                                            : `Enter your ${name.toLowerCase()}`
                                    }
                                />
                            </div>
                        </div>
                    ))}
                    {broker && (
                        <div className="w-full">
                            <label
                                htmlFor="visitingCard"
                                className="capitalize text-sm text-gray-800"
                            >
                                Upload your visiting card
                            </label>
                            <div className="flex items-center space-x-2 border rounded-md px-2 relative p-2 mt-2">
                                <span className="text-primary">
                                    <MdOutlineFileUpload size={24} />
                                </span>
                                <span className="text-gray-800">
                                    {userData.visitingCard
                                        ? userData.visitingCard.name
                                        : "Upload image"}
                                </span>
                                <input
                                    type="file"
                                    accept=".png,.jpeg,.jpg,.webp"
                                    name="visitingCard"
                                    onChange={handleImage}
                                    className="absolute z-10 top-0 bottom-0 left-0 right-0 opacity-0 cursor-pointer w-full"
                                />
                            </div>
                        </div>
                    )}
                    <div className="w-full lg:col-span-2 flex justify-center">
                        <button
                            className="bg-primary active:bg-red-400 text-white py-2 px-4 rounded-md w-1/2"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className="flex items-center justify-around text-sm text-secondary my-6">
                    {/* signin  */}
                    <Link href="/signin">
                        <p className="">Already have an account? Sign Up</p>
                    </Link>
                    {/* register as broker or client  */}
                    <button className="" onClick={() => setBroker(!broker)}>
                        <p className="">
                            <strong>
                                {broker
                                    ? "Register as Client?"
                                    : "Register as Broker?"}
                            </strong>{" "}
                        </p>
                    </button>
                </div>
            </div>
        </main>
    );
}
