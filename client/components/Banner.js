import Image from "next/image";
import Link from "next/link";
import React from "react";
import banner from "../public/banner.jpeg";
import Search from "./Search";
export default function Banner() {
    return (
        <section className="container">
            <div className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] 2xl:h-[800px] w-screen">
                <Image src={banner} fill className="brightness-75" />
                <div className="absolute bottom-[20%] md:bottom-[30%] lg:bottom-[40%] text-center w-full space-y-3">
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <h1 className="text-white text-lg md:text-2xl lg:text-5xl opacity-90 font-semibold">
                            Find Your Dream Home
                        </h1>
                        <h3 className="text-white text-sm md:text-lg lg:text-xl opacity-90">
                            Starting from Rs 999 per month only.
                        </h3>
                    </div>
                    {/* <Search /> */}
                    {/* buy and sell btns  */}
                    <div className="space-x-4">
                        <Link href="/buy">
                            <button className="bg-primary py-2 px-6 rounded-md text-white hover:bg-white hover:text-gray-700 transition duration-200 ease-in active:scale-75">
                                Buy
                            </button>
                        </Link>
                        <Link href="/sell">
                            <button className="bg-primary py-2 px-6 rounded-md text-white hover:bg-white hover:text-gray-700 transition duration-200 ease-in active:scale-75">
                                Sell
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
