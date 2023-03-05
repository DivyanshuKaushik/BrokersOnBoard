import React from "react";
import Private from "../components/layouts/Private";

export default function Clients() {
    return (
        <Private allow={["admin"]}>
            <main className="px-10 lg:px-20 py-10 space-y-6 bg-gray-50">
                <h1 className="text-xl lg:text-3xl text-gray-800">
                    Clients
                </h1>
            </main>
        </Private>
    );
}
