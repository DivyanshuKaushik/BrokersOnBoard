import React from "react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

const quickLinks = ["Home", "About Us", "Contact Us" , "Terms & Conditions", "Privacy Policy"]

const contact  = ["info@brokeronboard.com","Bilaspur CG India", "Mon - Fri 9:00 - 18:00","+91 1234567890","+91 1234567890"]

const socials = [<BsFacebook size={20} />, <BsTwitter size={20} />, <BsInstagram size={20} />]
export default function Footer() {
    return (
        <footer className="">
            <div className="bg-slate-700 px-10 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:justify-items-center gap-4 py-4">
                <div className="">
                    <h3 className="text-white font-semibold my-4">
                        About Site
                    </h3>
                    <p className="text-slate-400 text-xs leading-6">
                        We’re reimagining how you buy, sell and rent. It’s now
                        easier to get into a place you love. So let’s do this,
                        together.
                    </p>
                </div>
                <div className="">
                    <h3 className="text-white font-semibold my-4">
                        Quick Links
                    </h3>
                   <ul className="space-y-2">
                        {quickLinks.map((link, index) => (<li key={index} className="text-slate-400 text-xs">{link}</li>))}
                   </ul>
                </div>
                <div className="">
                    <h3 className="text-white font-semibold my-4">
                        Contact Us
                    </h3>
                   <ul className="space-y-2">
                        {contact.map((link, index) => (<li key={index} className="text-slate-400 text-xs">{link}</li>))}
                   </ul>
                </div>
                <div className="">
                    <h3 className="text-white font-semibold my-4">
                        Follow Us
                    </h3>
                   <ul className="flex space-x-2">
                        {socials.map((link, index) => (<li key={index} className="text-slate-400 text-xs">{link}</li>))}
                   </ul>
                </div>
            </div>
            <div className="bg-slate-800 px-10 py-8"><h3 className="text-slate-400 text-center">© 2023 by Brokers On Board. All rights reserved.</h3></div>
        </footer>
    );
}
