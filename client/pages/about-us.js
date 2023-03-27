import Image from "next/image";
import React from "react";
import img from '../public/1.jpeg'

export default function AboutUs() {
    return (
        <section id="about-us" className="py-8 px-8 lg:px-20">
            <div className="">
                <h2 className="text-3xl text-[#404040] font-bold text-center">
                    Our Mission Is To FindHouse
                </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
                {/* about us texts  */}
                <div className="p-4 text-gray-800 space-y-4">
                    <p className="font-semibold text-lg lg:text-xl text-primary">
                        Brokers On Board
                    </p>
                    <p className="text-sm leading-loose text-justify">
                    The first ever single click platform generated for wide spread real estate ,brokers in the country to help them increase the value with feasible resources saving the time and energy. It will help buyers and sellers to connect with the right broker at the time of need which will help them to generate more income out of there property investment and also it will increase more investment opportunities in different cities.We are creating a digital platform for the property dealer/brokers which will help them to expand their business with minimal use of time, efforts, with more effectively.The idea of employment generation is to create opportunities for people to grow in terms of technical and marketing skill.It will also help the end user to reduce the data exploitation,that is avoiding unnecessary contact and fraudulent activity.
                    </p>
                </div>
                {/* image  */}
                <div className="relative p-4 h-[300px] lg:h-full">
                    <Image src={img} fill className="rounded-md object-contain" alt="about" />
                </div>
            </div>
        </section>
    );
}
