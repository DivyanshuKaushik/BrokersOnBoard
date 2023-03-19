import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const images = ["/assets/broker1.jpg", "/assets/broker2.jpg"];

export default function BrokersCarousel() {
    return (
        <section className="px-10 py-4 lg:px-20 lg:py-8 w-full">
            <h3 className="text-xl lg:text-3xl text-primary text-center">
                Our Brokers
            </h3>
            {/* carousel  */}
            <div className="w-4/5 mx-auto mt-6">
                <Carousel
                    showThumbs={false}
                    showStatus={false}
                    autoPlay={true}
                    infiniteLoop={true}
                    interval={3000}
                    dynamicHeight={true}
                >
                    {images.map((image, i) => (
                        <div key={i}>
                            <img src={image} alt="property" className="h-300px lg:h-[400px] object-contain" />
                        </div>
                    ))}
                </Carousel>
            </div>
        </section>
    );
}
