import Image from "next/image";
import Link from "next/link";
import React from "react";
// import hero from "../assets/hero.mp4";

export default function Hero() {
    return (
        <section className="relative h-[400px] md:[600px] lg:h-screen w-screen top-0">
            {/* <div className=""> */}
                <Image src="/assets/banner.jpg" fill className="brightness-75" />
                {/* <video src="/assets/hero.mp4" autoPlay loop muted className="object-cover h-full w-full" >

                </video> */}
                {/* <source src="/video/ocean.mp4" type="video/mp4"/> */}
                <div className="absolute bottom-[20%] md:bottom-[30%] lg:bottom-[40%] text-center w-full space-y-3">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <h1 className="text-white text-2xl md:text-3xl lg:text-6xl opacity-90 font-bold">
                           Welcome to Brokers On Board
                        </h1>
                        <h3 className="text-white text-lg md:text-xl font-semibold lg:text-2xl opacity-95">
                        Where Deals Got Done
                        </h3>
                        <p className="text-white text-sm md:text-lg font-semibold opacity-80 lg:text-lg">
                           Buy, Sell or Rent your property with us
                        </p>
                    </div>
                    {/* explore btns  */}
                    <div className="pt-3">
                        <Link href="#services">
                            <button className="bg-primary py-2 px-6 rounded-md text-white hover:bg-white hover:text-gray-700 transition duration-200 ease-in active:scale-75">
                                Explore
                            </button>
                        </Link>
                    </div>
                </div>
            {/* </div> */}
        </section>
    );
}
