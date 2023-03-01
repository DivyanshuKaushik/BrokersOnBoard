import React from "react";
import Banner from "../components/Banner";
import AboutUs from "../components/AboutUs";
import WhyChooseUs from "../components/WhyChooseUs";

export default function Home() {
    return (
        <>
            <Banner />
            <main className="w-screen">
                {/* about us  */}
                <section className="py-6">
                    <h3 className="text-3xl text-center font-semibold text-primary">
                        About Us
                    </h3>
                    <div className="h-1 w-14 mx-auto bg-gray-300 rounded-full" />
                    <AboutUs />
                </section>
                {/* why choose us  */}
                <section className="py-6 bg-gray-100">
                    <h3 className="text-3xl text-center font-semibold text-primary">
                        Why Choose Us
                    </h3>
                    <div className="h-1 w-14 mx-auto bg-gray-300 rounded-full" />
                    <WhyChooseUs />
                </section>
                {/* contact us  */}
                <section className="px-8 lg:px-20 py-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl lg:text-3xl font-semibold text-gray-700">Any Query?</h3>
                        <button className="bg-primary text-white px-4 py-2 rounded-md text-lg hover:bg-gray-100 hover:border hover:text-gray-700 transition duration-200 ease-in active:scale-90">Contact Us</button>
                    </div>
                </section>
            </main>
        </>
    );
}
