import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { MdAccessTime, MdOutlineLocationOn } from "react-icons/md";

const quickLinks = [
    "Home",
    "About Us",
    "Contact Us",
    "Terms & Conditions",
    "Privacy Policy",
];

const contact = [
    { data: "info@brokeronboard.com", icon: <HiOutlinePhone size={20} /> },
    { data: "Bilaspur CG India", icon: <MdOutlineLocationOn size={20} /> },
    { data: "Mon - Fri 9:00 - 18:00", icon: <MdAccessTime size={20} /> },
    { data: "+91 1234567890", icon: <HiOutlinePhone size={20} /> },
];

const socials = [
    <BsFacebook size={26} />,
    <BsTwitter size={26} />,
    <BsInstagram size={26} />,
];
export default function Footer() {
    return (
        <footer className="w-screen">
            <div className="bg-slate-700 px-10 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:justify-items-center gap-4 py-4 lg:py-10">
                <div className="">
                    <h3 className="text-white text-xl font-semibold my-4">
                        Brokers On Board
                    </h3>
                    <p className="text-slate-400 text-justify text-xs leading-6">
                        We’re reimagining how you buy, sell and rent. It’s now
                        easier to get into a place you love. So let’s do this,
                        together. Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Dolor quibusdam nam nisi possimus,
                        unde harum ab voluptates fuga nihil eos, adipisci sit
                        officia doloribus. Quisquam, quod. Quisquam, quod.
                    </p>
                </div>
                {/* <div className="">
                    <h3 className="text-white font-semibold my-4">
                        Quick Links
                    </h3>
                    <ul className="space-y-2">
                        {quickLinks.map((link, index) => (
                            <li key={index} className="text-slate-400 text-xs">
                                {link}
                            </li>
                        ))}
                    </ul>
                </div> */}
                <div className="">
                    <h3 className="text-white font-semibold my-4">
                        Contact Us
                    </h3>
                    <ul className="space-y-4">
                        {contact.map(({ data, icon }, index) => (
                            <li
                                key={index}
                                className="flex space-x-2 items-center text-slate-400"
                            >
                                <span className="">{icon}</span>{" "}
                                <span className="text-sm">{data}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="">
                    <h3 className="text-white font-semibold my-4">Follow Us</h3>
                    <ul className="flex space-x-4">
                        {socials.map((link, index) => (
                            <li key={index} className="text-slate-400">
                                <Link href="/">{link}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="bg-slate-800 px-10 py-8 flex items-center justify-center space-x-4 flex-wrap">
                <div className="relative h-32 w-full lg:w-96">
                    <Image src="/assets/footer-art.png" fill alt="footer" />
                </div>
                <h3 className="text-slate-400 text-center mt-4 lg:mt-0">
                    © 2023 by Brokers On Board. All rights reserved.
                </h3>
            </div>
        </footer>
    );
}
