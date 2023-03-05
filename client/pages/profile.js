import React, { useContext } from "react";
import Private from "../components/layouts/Private";
import { UserContext } from "../context/UserProvider";

export default function Profile() {
    const { user } = useContext(UserContext);
    return (
        user && (
            <Private allow={["admin", "user", "broker"]}>
                <main className="flex justify-center items-center shadow-md rounded-lg border p-6">
                    <div className="">
                        <h1 className="text-2xl font-semibold">Profile</h1>
                        <div className="flex flex-col space-y-4 even:bg-gray-100">
                            {Array.from(Object.keys(user)).map((key, index) => (
                                <div key={index} className="grid grid-cols-2">
                                    <h3 className="capitalize">{key.toLowerCase()}</h3>
                                    <p className="">{user[key]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </Private>
        )
    );
}
