import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";

const btns = [
    { name: "Buy", img: "/assets/buy.png", url: "/services?tab=buy" },
    { name: "Sell", img: "/assets/sell.png", url: "/services?tab=sell" },
    { name: "Rent", img: "/assets/rent.png", url: "/services?tab=rent" },
];

export default function RegisterSection() {
    const { user } = useContext(UserContext);
    return (
        <section id="services" className="px-8 lg:px-20 py-10 lg:py-12">
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-4 place-content-center place-items-center rounded-lg">
                {/* btns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                            <Link  href="/register?as=broker">
                                <div className="flex flex-col justify-center w-full items-center bg-white p-10 lg:py-8 lg:px-10 shadow-md border rounded-md transform hover:-translate-y-2 hover:shadow-xl hover:shadow-red-100  transition-all duration-200 ease-in">
                                    <Image
                                        src="/assets/broker.png"
                                        height={60}
                                        width={60}
                                        className="object-contain"
                                        alt="broker"
                                    />
                                    <span className=" text-secondary mt-2 whitespace-nowrap">
                                        Register as a Broker
                                    </span>
                                </div>
                            </Link>
                            <Link  href="/register?as=builder">
                                <div className="flex flex-col justify-center w-full items-center bg-white p-10 lg:py-8 lg:px-10 shadow-md border rounded-md transform hover:-translate-y-2 hover:shadow-xl hover:shadow-red-100 transition-all duration-200 ease-in">
                                    <Image
                                        src="/assets/user.png"
                                        height={60}
                                        width={60}
                                        className="object-contain"
                                        alt="user"
                                    />
                                    <span className=" text-secondary mt-2 whitespace-nowrap">
                                        Register as a Builder
                                    </span>
                                </div>
                            </Link>
                </div>
                {/* image  */}
                <div className="text-secondary flex flex-col justify-start text-justify">
                    {/* <h3 className="text-2xl lg:text-4xl mb-2">
                        Take the first step
                    </h3>
                    <p className="text-lg">
                        Select your goal and we'll guide you on your journey.
                    </p> */}
                    <div className="relative h-[200px] w-[200px] lg:h-[300px] lg:w-[300px] mt-8">
                        <Image
                            src="/assets/register.jpg"
                            fill
                            className=""
                            alt="image"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

