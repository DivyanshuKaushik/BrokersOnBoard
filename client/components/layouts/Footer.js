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
    { data: "Raipur, Chhattisgarh, India", icon: <MdOutlineLocationOn size={20} /> },
    { data: "Mon to Fri ( 10 AM - 8 PM )", icon: <MdAccessTime size={20} /> },
    { data: "+91 8959796969", icon: <HiOutlinePhone size={20} /> },
];

const socials = [
    <BsFacebook size={26} />,
    <BsTwitter size={26} />,
    <BsInstagram size={26} />,
];
export default function Footer() {
    return (
        <footer className="w-screen">
            <div className="bg-purple-700 px-10 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:justify-items-center gap-4 py-4 lg:py-10">
                <div className="">
                    <div className="">
                        <Image src="/assets/logo_light.png" width={300} height={50} />
                    </div>
                    <p className="text-white text-justify text-sm leading-6">
                    The first ever single click platform generated for wide spread real estate ,brokers in the country to help them increase the value with feasible resources saving the time and energy.
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
                                className="flex space-x-2 items-center text-white"
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
                            <li key={index} className="text-white">
                                <Link href="/">{link}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="bg-purple-700 px-10 py-8 flex items-center justify-center space-x-4 flex-wrap">
                {/* <div className="relative h-32 w-full lg:w-96">
                    <Image src="/assets/footer-art.png" fill alt="footer" />
                </div> */}
                <h3 className="text-white text-center mt-4 font-semibold lg:mt-0">
                    © {new Date().getFullYear()} by Brokers On Board. All rights reserved. Developed by Tecxhos
                </h3>
            </div>
        </footer>
    );
}
