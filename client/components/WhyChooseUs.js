import Image from "next/image";
import React from "react";
import {
    HiOutlineCalculator,
    HiOutlineHome,
    HiOutlineUserGroup,
} from "react-icons/hi";

const options = [
    {
        title: "Trusted by Many",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        icon: <HiOutlineUserGroup size={42} className="text-primary" />,
    },
    {
        title: "Wide Range Of Properties",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        icon: <HiOutlineHome size={42} className="text-primary" />,
    },
    {
        title: "Financing Made Easy",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        icon: <HiOutlineCalculator size={42} className="text-primary" />,
    },
];
export default function WhyChooseUs() {
    return (
        <section id="why-choose-us" className="py-8 px-8 lg:px-20">
            <div className="">
                <h2 className="text-3xl text-[#404040] font-bold text-center">
                    We Provide full service at every step
                </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 py-8">
                {options.map((option, index) => (
                    <ChooseUsCard
                        key={index}
                        title={option.title}
                        description={option.description}
                        icon={option.icon}
                    />
                ))}
            </div>
        </section>
    );
}

function ChooseUsCard({ title, description, icon }) {
    return (
        <div className="shadow-md px-4 py-8 bg-white rounded-md">
            {/* image  */}
            <div className="flex items-center justify-center">
                <div className="p-6 bg-red-200 rounded-full">
                    {icon}
                </div>
            </div>
            {/* content  */}
            <div className="text-center text-gray-700 space-y-3 mt-6">
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm leading-6">{description}</p>
            </div>
        </div>
    );
}
