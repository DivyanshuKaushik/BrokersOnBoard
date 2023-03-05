import Link from "next/link";
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
                        <div className="flex flex-col space-y-4">
                            {Array.from(Object.keys(user)).map((key, index) => {
                                if (key === "visitingCard") {
                                    return (
                                        <div
                                        key={index}
                                        className="grid grid-cols-2 text-sm lg:text-base border-b p-2"
                                    >
                                        <h3 className="capitalize">
                                            {key.toLowerCase()}
                                        </h3>
                                        <Link href={user[key]} target="_blank">
                                            <span className="text-primary">
                                                View Card
                                            </span>
                                        </Link>
                                    </div>
                                    );
                                }
                                return (
                                    <div
                                        key={index}
                                        className="grid grid-cols-2 text-sm lg:text-base border-b p-2"
                                    >
                                        <h3 className="capitalize">
                                            {key.toLowerCase()}
                                        </h3>
                                        <p className="">{user[key]}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </main>
            </Private>
        )
    );
}
