import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";

const btns = [
    { name: "Buy", img: "/assets/buy.png", url: "/services?tab=buy" },
    { name: "Sell", img: "/assets/sell.png", url: "/services?tab=sell" },
    { name: "Rent", img: "/assets/rent.png", url: "/services?tab=rent" },
];

const Services = () => {
    const {user} = useContext(UserContext);
    return (
        <section id="services" className="px-10 lg:px-20 py-10 lg:py-12">
            <div className="bg-slate-50 p-6 grid grid-cols-1 lg:grid-cols-2 gap-4 place-content-center place-items-center rounded-lg">
                {/* image  */}
                <div className="text-secondary flex flex-col justify-start text-justify">
                    <h3 className="text-4xl mb-2">Take the first step</h3>
                    <p className="text-lg">
                        Select your goal and we'll guide you on your journey.
                    </p>
                    <div className="relative h-[150px] w-[350px] lg:h-[200px] lg:w-[400px] mt-8">
                        <Image src="/assets/house.png" fill className="" alt="image" />
                    </div>
                </div>
                {/* btns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {btns.map((btn) => {
                        if (user?.role === "user" && btn.name === "Sell") {
                            return null;
                        }
                        return <Link key={btn.name} href={btn.url}>
                            <div  className="flex flex-col justify-center items-center bg-white py-6 px-10 shadow-md border rounded-md transform hover:-translate-y-2 hover:shadow-xl transition-all duration-200 ease-in">
                                <Image
                                    src={btn.img}
                                    height={60}
                                    width={60}
                                    className="object-contain"
                                    alt={btn.name}
                                />
                                <span className="text-sm text-secondary mt-2">{btn.name}</span>
                            </div>

                        </Link>
                    }

                    )}
                </div>
            </div>
        </section>
    );
};

export default Services;
