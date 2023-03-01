import Link from "next/link";
import { useRouter } from "next/router";
import { HiOutlineHeart, HiOutlineShoppingBag, HiUser } from "react-icons/hi";
import { BsHandIndex } from "react-icons/bs";
import { MdOutlineAttachMoney, MdOutlineHistory } from "react-icons/md";
import React from "react";

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
    // {
    //     title: "Wishlist",
    //     url: "/wishlist",
    //     icon: <HiOutlineHeart size={18} className="text-primary" />,
    // },
    {
        title: "Buy",
        url: "/buy",
        icon: <BsHandIndex size={16} className="text-primary" />,
    },
    {
        title: "Sell",
        url: "/sell",
        icon: <MdOutlineAttachMoney size={18} className="text-primary" />,
    },
    {
        title: "Requests",
        url: "/requests",
        icon: <MdOutlineHistory size={18} className="text-primary" />,
    },
];
export default function Navbar() {
    const { pathname } = useRouter();
    const user = true;
    return (
        <header className="grid grid-cols-2 lg:grid-cols-3 place-content-center place-items-center py-3 shadow-md w-screen">
            {/* logo  */}
            <div className="flex">
                <Link href="/">
                    <h1 className="text-primary text-2xl font-semibold">
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
                    <div className="flex items-center space-x-4 justify-end lg:justify-center mr-8 lg:mr-0 w-full">
                        <div className="hidden lg:flex items-center space-x-4">
                            {/* wishlist | orders  */}
                            {userOptions.map(({ title, url, icon }, index) => (
                                <Link key={index} href={url}>
                                    <button className="flex items-center text-sm space-x-1">
                                        {icon}
                                        <span className="text-gray-700">
                                            {title}
                                        </span>
                                    </button>
                                </Link>
                            ))}

                        </div>
                        {/* user avatar menu  */}
                        <div className="rounded-full p-2 bg-gray-100">
                            <HiUser size={24} className="text-secondary" />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {/* auth buttons  */}
                    <div className="flex space-x-4">
                        <button className="bg-primary text-white px-4 py-1 rounded-sm hover:bg-gray-100 hover:text-gray-800 active:scale-90 transition-all duration-200 ease-in">
                            Login
                        </button>
                        <button className="bg-primary text-white px-4 py-1 rounded-sm hover:bg-gray-100 hover:text-gray-800 active:scale-90 transition-all duration-200 ease-in">
                            Register
                        </button>
                    </div>
                </>
            )}
        </header>
    );
}
