import React from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Link from "next/link";
import RegisterSection from "../components/RegisterSection";
import BrokersCarousel from "../components/BrokersCarousel";

export default function Home() {
    return (
        <>
            <Hero />
            <main className="w-screen">
                {/* services  */}
                <Services />
                {/* Register Section */}
                <RegisterSection />
                {/* contact us  */}
                <section className="px-8 lg:px-20 py-8 bg-slate-50">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl lg:text-3xl font-semibold text-gray-700">Any Query?</h3>
                        <Link href="/contact-us">
                        <button className="bg-primary text-white px-4 py-2 rounded-md text-lg hover:bg-gray-100 hover:border hover:text-gray-700 transition duration-200 ease-in active:scale-90">Contact Us</button>
                        </Link>
                    </div>
                </section>
                {/* our brokers  */}
                <BrokersCarousel />
            </main>
        </>
    );
}
