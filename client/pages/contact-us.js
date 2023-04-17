import Image from "next/image";
import React, { useState } from "react";
import { HiOutlineMail, HiOutlinePhone, HiOutlineUser } from "react-icons/hi";
import { MdOutlineMessage } from "react-icons/md";
import Input from "../components/utils/Input";
import { contact } from "../services/contact";
import Head from "next/head";
import { DefaultError, OnError, Success } from "../alerts";

const fields = [
    { name: "name", icon: <HiOutlineUser size={24} />, type: "text" },
    { name: "email", icon: <HiOutlineMail size={24} />, type: "email" },
    { name: "phone", icon: <HiOutlinePhone size={24} />, type: "phone" },
    { name: "message", icon: <MdOutlineMessage size={24} />, type: "textbox" },
];
export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await contact(formData);
        if (res.error) {
            const err = res.error.response?.data.error || res.error;
            if (!err) return DefaultError();
            return OnError(err);
        }
        setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
        });
        Success();
    }

    return (
        <>
            <Head>
                <title>
                    Brokers On Board | Contact Us - Best Real State Services
                </title>
            </Head>
            <section className="px-6 lg:px-20 py-4 lg:py-10">
                <main className="bg-white border rounded-lg shadow-md p-4 grid grid-cols-1 lg:grid-cols-2">
                    {/* contact us image  */}
                    <div className="relative">
                        <h3 className="block lg:hidden text-primary text-center text-xl">
                            Contact Us
                        </h3>
                        <Image
                            src="/assets/contact.png"
                            width={500}
                            height={500}
                        />
                    </div>
                    {/* contact us form  */}
                    <div className="">
                        <h3 className="hidden lg:block text-primary text-center text-xl">
                            Contact Us
                        </h3>
                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 gap-3 w-full"
                        >
                            {fields.map(({ name, icon, type }) =>
                                type === "textbox" ? (
                                    <Input
                                        key={name}
                                        name={name}
                                        icon={icon}
                                        type={type}
                                        value={formData[name]}
                                        textbox
                                        row={4}
                                        handleChange={handleChange}
                                    />
                                ) : (
                                    <Input
                                        key={name}
                                        name={name}
                                        icon={icon}
                                        type={type}
                                        value={formData[name]}
                                        handleChange={handleChange}
                                    />
                                )
                            )}
                            {/* send btn  */}
                            <button
                                type="submit"
                                className="bg-primary text-white font-semibold py-2 rounded-lg mt-4"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </main>
            </section>
        </>
    );
}
