import Link from "next/link";
import { useRouter } from "next/router";
import { BsHandIndex } from "react-icons/bs";
import { MdOutlineAttachMoney,MdAddCircleOutline } from "react-icons/md";
import React, { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import Menu from "./Menu";

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
        url: "/buy",
        icon: <BsHandIndex size={16} className="text-primary" />,
    },
    {
        title: "Rent",
        url: "/sell",
        icon: <MdOutlineAttachMoney size={18} className="text-primary" />,
    },
];
export default function Navbar() {
    const { pathname } = useRouter();
    const { user } = useContext(UserContext);
    return (
        <>
            <header className="z-50 bg-white sticky top-0 grid grid-cols-2 lg:grid-cols-3 place-content-center place-items-center py-3 shadow-md w-screen">
                {/* logo  */}
                <div className="flex">
                    <Link href="/">
                        <h1 className="text-primary text-lg lg:text-2xl font-semibold">
                            Brokers On Board
                        </h1>
                    </Link>
                </div>
                {/* options  */}
                <nav className="hidden lg:block">
                    <ul className="flex space-x-4">
                        {menuItems.map(({ title, url, icon }, index) => (
                            <li key={index} className="">
                                <Link href={url}>
                                    <span
                                        className={`${
                                            pathname === url
                                                ? "text-primary"
                                                : "text-gray-700"
                                        } hover:text-primary transition duration-200 ease-in-out`}
                                    >
                                        {title}
                                    </span>{" "}
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
                                {user.role === "user" ? (
                                    userOptions.map(
                                        ({ title, url, icon }, index) => (
                                            <Link key={index} href={url}>
                                                <button className="flex items-center text-sm space-x-1">
                                                    {icon}
                                                    <span className="text-gray-700">
                                                        {title}
                                                    </span>
                                                </button>
                                            </Link>
                                        )
                                    )
                                ) : (
                                    <Link href="/add-new-property">
                                        <button className="flex items-center text-sm space-x-1">
                                        <MdAddCircleOutline size={20} className="text-primary" />
                                            <span className="text-gray-700">
                                                New Property
                                            </span>
                                        </button>
                                    </Link>
                                )}
                            </div>
                            {/*  menu  */}
                            <Menu />
                        </div>
                    </>
                ) : (
                    <>
                        {/* auth buttons  */}
                        <div className="flex space-x-4">
                            <Link href="/signin">
                                <button className="bg-primary text-white text-xs lg:text-base px-2 lg:px-4 py-1 rounded-sm hover:bg-gray-100 hover:text-gray-800 active:scale-90 transition-all duration-200 ease-in">
                                    Sign In
                                </button>
                            </Link>
                            <Link href="/signup">
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
