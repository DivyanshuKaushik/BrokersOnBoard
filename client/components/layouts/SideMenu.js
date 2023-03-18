import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { MdOutlineLogout } from "react-icons/md";
import { UserContext } from "../../context/UserProvider";
import { logout } from "../../services/auth";
import Drawer from "../utils/Drawer";

export default function SideMenu({ hero = true, menuItems }) {
    const [open, setOpen] = React.useState(false);
    const { pathname } = useRouter();
    const { user } = useContext(UserContext);

    async function logOut() {
        await logout();
        window.location.replace("/");
    }
    return (
        <>
            <div className="flex lg:hidden w-full justify-end pr-6">
                <button
                    className={
                        pathname === "/" && hero
                            ? "block lg:hidden text-white "
                            : "block lg:hidden text-gray-700"
                    }
                    onClick={() => setOpen(!open)}
                >
                    <HiOutlineMenu size={20} />
                </button>
            </div>
            <Drawer
                type="right"
                state={open}
                setState={setOpen}
                width={200}
                // styles={{ padding: "2em" }}
            >
                <div className="flex flex-col space-y-6 p-6">
                    <h3 className="text-primary font-semibold">Brokers On Board</h3>
                    <ul className="">
                        {menuItems.map(({ title, url, icon }, i) => (
                            <Link key={i} href={url}>
                                <li
                                    className={`flex items-center p-2 py-3 border-b ${
                                        pathname === url
                                            ? "text-primary"
                                            : "text-gray-800"
                                    } group hover:text-primary text-sm whitespace-nowrap  transition duration-200 ease-in`}
                                    onClick={() => setOpen(false)}
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
                        {user ? (
                            <li className="">
                                <button
                                    onClick={logOut}
                                    className="flex items-center p-2 space-x-4 text-gray-800 group hover:text-primary text-sm whitespace-nowrap transition duration-200 ease-in"
                                >
                                    <span className="text-secondary mr-3 group-hover:text-primary">
                                        <MdOutlineLogout size={20} />
                                    </span>
                                    Logout
                                </button>
                            </li>
                        ) : (
                            <ul className="flex flex-col space-y-2 mt-2">
                                <li className="w-full" onClick={() => setOpen(false)}>
                                    <Link href="/signin">
                                        <button className="w-full bg-primary text-white text-xs lg:text-base px-2 lg:px-4 py-1 rounded-sm hover:bg-gray-100 hover:text-gray-800 active:scale-90 transition-all duration-200 ease-in">
                                            Sign In
                                        </button>
                                    </Link>
                                </li>
                                <li className="w-full" onClick={() => setOpen(false)}>
                                    <Link href="/signup">
                                        <button className="w-full bg-primary text-white text-xs lg:text-base px-2 lg:px-4 py-1 rounded-sm hover:bg-gray-100 hover:text-gray-800 active:scale-90 transition-all duration-200 ease-in">
                                            Sign Up
                                        </button>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </ul>
                </div>
            </Drawer>
        </>
    );
}
