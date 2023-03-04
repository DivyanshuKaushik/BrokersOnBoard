import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
    HiDotsVertical,
    HiOutlineHome,
    HiOutlineUserCircle,
    HiOutlineUserGroup,
} from "react-icons/hi";
import {
    MdOutlineLogout,
    MdOutlineRealEstateAgent,
    MdOutlineRequestQuote,
} from "react-icons/md";
import { UserContext } from "../../context/UserProvider";

const commonOptions = [
    {
        title: "Profile",
        url: "/profile",
        icon: <HiOutlineUserCircle size={20} />,
    },
];

const options = {
    user: [
        ...commonOptions,
        {
            title: "My Requests",
            url: "/my-requests",
            icon: <MdOutlineRequestQuote size={20} />,
        },
    ],
    broker: [
        ...commonOptions,
        {
            title: "My Properties",
            url: "/my-properties",
            icon: <HiOutlineHome size={20} />,
        },
    ],
    admin: [
        ...commonOptions,
        {
            title: "Properties",
            url: "/properties",
            icon: <HiOutlineHome size={20} />,
        },
        {
            title: "Client Requests",
            url: "/client-requests",
            icon: <MdOutlineRequestQuote size={20} />,
        },
        {
            title: "Clients",
            url: "/clients",
            icon: <HiOutlineUserGroup size={20} />,
        },
        {
            title: "Brokers",
            url: "/brokers",
            icon: <MdOutlineRealEstateAgent size={20} />,
        },
    ],
};

export default function Menu(props) {
    const [openMenu, setOpenMenu] = useState(false);

    const { user } = useContext(UserContext);

    const { pathname } = useRouter();

    const ref = useRef(null);

    function onClickOutside() {
        setOpenMenu(false);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside && onClickOutside();
            }
        };
        document.addEventListener("click", handleClickOutside, true);

        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [onClickOutside]);

    return (
        <div className="relative">
            <div className="">
                <button
                    className="flex items-center"
                    onClick={() => setOpenMenu(!openMenu)}
                >
                    <HiDotsVertical size={24} className="text-secondary" />
                </button>
            </div>
            {openMenu && (
                <div
                    ref={ref}
                    className="absolute top-12 right-6 z-40 bg-white p-5 rounded-2xl shadow-md border"
                >
                    <ul className="flex flex-col space-y-2 w-full">
                        {options[user.role].map(({ title, icon, url }, i) => (
                            <Link key={i} href={url}>
                                <li
                                    className={`flex items-center p-2 border-b ${
                                        pathname === url
                                            ? "text-primary"
                                            : "text-gray-800"
                                    } group hover:text-primary text-sm whitespace-nowrap  transition duration-200 ease-in`}
                                    onClick={() => setOpenMenu(false)}
                                >
                                    <span
                                        className={`${
                                            pathname === url
                                                ? "text-primary"
                                                : "text-gray-800"
                                        } mr-3 group-hover:text-primary`}
                                    >
                                        {icon}
                                    </span>
                                    {title}
                                </li>
                            </Link>
                        ))}
                        <li className="">
                            <button className="flex items-center p-2 space-x-4 text-gray-800 group hover:text-primary text-sm whitespace-nowrap transition duration-200 ease-in">
                                <span className="text-secondary mr-3 group-hover:text-primary">
                                    <MdOutlineLogout size={20} />
                                </span>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
