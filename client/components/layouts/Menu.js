import Link from "next/link";
import React, { useContext } from "react";
import { HiOutlineUser } from "react-icons/hi";
import { UserContext } from "../../context/UserProvider";

const commonOptions = [
    { title: "Profile", url: "/profile", icon: <HiOutlineUser size={24} /> },
];

const options = {
    user: [
        ...commonOptions,
        {
            title: "My Requests",
            url: "/my-requests",
            icon: <HiOutlineUser size={24} />,
        },
    ],
    broker: [
        ...commonOptions,
        {
            title: "My Properties",
            url: "/my-properties",
            icon: <HiOutlineUser size={24} />,
        },
    ],
    admin: [
        ...commonOptions,
        {
            title: "Properties",
            url: "/properties",
            icon: <HiOutlineUser size={24} />,
        },
        {
            title: "Client Requests",
            url: "/client-requests",
            icon: <HiOutlineUser size={24} />,
        },
        {
            title: "Clients",
            url: "/clients",
            icon: <HiOutlineUser size={24} />,
        },
        {
            title: "Brokers",
            url: "/brokers",
            icon: <HiOutlineUser size={24} />,
        },
    ],
};

export default function Menu() {
    const { user } = useContext(UserContext);
    return (
        <div className="absolute top-[10%] right-8 z-40 bg-white p-2">
            <ul className="flex flex-col space-y-2">
            
                {options[user.role].map(({ title, icon, url }, i) => (
                    <Link key={i} href={url}>
                        <li className="flex items-center space-x-2 p-2 border-b">
                            <span className="text-secondary">{icon}</span>
                            {title}
                        </li>
                    </Link>
                ))}
            </ul>
            <h3 className="text-white">menjhdfjhs</h3>
        </div>
    );
}
