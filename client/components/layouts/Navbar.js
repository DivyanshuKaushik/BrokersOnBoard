import Link from "next/link";
import { useRouter } from "next/router";
import { BsHandIndex } from "react-icons/bs";
import { MdOutlineAttachMoney, MdAddCircleOutline } from "react-icons/md";
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/UserProvider";
import Menu from "./Menu";
import useScrollDirection from "../../hooks/useScrollDirection";
import SideMenu from "./SideMenu";

import {
    HiDotsVertical,
    HiOutlineHome,
    HiOutlineUserCircle,
    HiOutlineUserGroup,
} from "react-icons/hi";
import {
    MdOutlineHistory,
    MdOutlineLogout,
    MdOutlineMessage,
    MdOutlineRealEstateAgent,
    MdOutlineRequestQuote,
} from "react-icons/md";

const menuItems = [
    {
        title: "Home",
        url: "/",
        icon: "",
    },
    {
        title: "About Us",
        url: "/about-us",
        icon: "",
    },
    {
        title: "Contact Us",
        url: "/contact-us",
        icon: "",
    },
];

const userOptions = [
    {
        title: "Buy",
        url: "/services?tab=buy",
        icon: <BsHandIndex size={16} />,
    },
    {
        title: "Rent",
        url: "/services?tab=rent",
        icon: <MdOutlineAttachMoney size={18} />,
    },
];
const brokerOptions = [
    {
        title: "Sell",
        url: "/services?tab=sell",
        icon: <BsHandIndex size={16} />,
    },
    {
        title: "Rent",
        url: "/services?tab=rent",
        icon: <MdOutlineAttachMoney size={18} />,
    },
];
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
            icon: <MdOutlineHistory size={20} />,
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
        {
            title: "Messages",
            url: "/messages",
            icon: <MdOutlineMessage size={20} />,
        },
    ],
};

export default function Navbar() {
    const { pathname } = useRouter();
    const { user } = useContext(UserContext);
    const [bg, setBg] = useState("");
    const [hero, setHero] = useState(true);
    const navRef = useRef();
    navRef.current = bg;

    useEffect(() => {
        const handleScroll = () => {
            const show = window.scrollY > 400;
            if (show) {
                setBg("bg-white shadow-md");
                setHero(false);
            } else {
                setBg("bg-transparent");
                if (pathname === "/") {
                    setHero(true);
                }
            }
        };
        document.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollDirection = useScrollDirection();
    const navVisibility = scrollDirection === "down" ? "hidden" : "top-0";

    const lgFields = user?.role === "user" ? userOptions : brokerOptions

    const fields = user ? user?.role === "user" ? [...userOptions,...options[user.role]] : [...brokerOptions,...options[user.role]] : [];
    console.log(fields);
    return (
        <>
            <header
                className={
                    pathname === "/"
                        ? `z-50 fixed ${navVisibility} ${bg} grid grid-cols-2 lg:grid-cols-3 place-content-center place-items-center py-3 w-screen`
                        : "z-50 sticky top-0 bg-white shadow-md grid grid-cols-2 lg:grid-cols-3 place-content-center place-items-center py-3 w-screen"
                }
            >
                {/* logo  */}
                <div className="flex">
                    <Link href="/">
                        <h1 className="text-primary text-lg lg:text-2xl font-semibold">
                            Brokers On Board
                        </h1>
                    </Link>
                </div>
                {/* options  */}
                <SideMenu hero={hero} menuItems={[...menuItems,...fields]} />
                <nav className="hidden lg:block">
                    <ul className="flex space-x-4">
                        {menuItems.map(({ title, url, icon }, index) => (
                            <li key={index} className="">
                                <Link href={url}>
                                    <span
                                        className={`${
                                            pathname === url
                                                ? "text-primary font-semibold"
                                                : pathname === "/" && hero
                                                ? "text-white font-semibold"
                                                : "text-gray-700"
                                        } hover:text-primary transition duration-200 ease-in-out`}
                                    >
                                        {title}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                {user ? (
                    <>
                        {/* user personels  */}
                        <div className="flex items-center space-x-8 justify-end lg:justify-center mr-8 lg:mr-0 w-full">
                            <div className="hidden lg:flex items-center space-x-4">
                                {/* options */}
                                {lgFields.map(
                                    ({ title, url, icon }, index) => (
                                        <Link key={index} href={url}>
                                            <button className="flex items-center text-sm space-x-1">
                                               <span className="text-primary">{icon}</span> 
                                                <span
                                                    className={
                                                        pathname === "/" && hero
                                                            ? "text-white font-semibold hover:text-primary transition duration-200 ease-in"
                                                            : "text-gray-700"
                                                    }
                                                >
                                                    {title}
                                                </span>
                                            </button>
                                        </Link>
                                    )
                                )}
                            </div>
                            {/*  menu  */}
                            <Menu options={options} hero={hero} />
                        </div>
                    </>
                ) : (
                    <>
                        {/* auth buttons  */}
                        <div className="hidden lg:flex space-x-4">
                            <Link href="/signin">
                                <button className="bg-primary text-white text-xs lg:text-base px-2 lg:px-4 py-1 rounded-sm hover:bg-gray-100 hover:text-gray-800 active:scale-90 transition-all duration-200 ease-in">
                                    Sign In
                                </button>
                            </Link>
                            <Link href="/signup?as=user">
                                <button className="bg-primary text-white text-xs lg:text-base px-2 lg:px-4 py-1 rounded-sm hover:bg-gray-100 hover:text-gray-800 active:scale-90 transition-all duration-200 ease-in">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    </>
                )}
            </header>
        </>
    );
}
