import React, { useState } from "react";
import Image from "next/image";
import { MdOutlineLocationOn } from "react-icons/md";
import { BiRupee } from "react-icons/bi";
import { HiOutlineMail, HiOutlinePhone, HiOutlineUser } from "react-icons/hi";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function PropertyCard({ property,showBroker=true }) {
    const {
        title,
        description,
        images,
        price,
        city,
        state,
        pincode,
        address,
        propertyType,
        requestType,
        sqft,
        broker,
    } = property;

    const fullAddress = `${address}, ${city}, ${state}, ${pincode}`;

    const [showImages, setShowImages] = useState(false);

    return (
        <div
            className="shadow-md rounded-lg border p-4 bg-white"
            onMouseLeave={() => setShowImages(false)}
        >
            {showImages ? (
                <>
                    {/* image carousel  */}
                    <div className="">
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
                                    <img src={image} alt="property" />
                                </div>
                            ))}
                        </Carousel>
                        <button
                            className="text-xs w-full text-center text-primary"
                            onClick={() => setShowImages(false)}
                        >
                            Hide Images
                        </button>
                    </div>
                </>
            ) : (
                <>
                    {/* title */}
                    <div className="space-y-2 mt-3">
                        <div className="flex items-center justify-between text-sm text-primary font-light">
                            <span className="capitalize">{propertyType}</span>
                            <span className="capitalize">sqft : {sqft}</span>
                        </div>
                        <h1 className="text-lg font-semibold text-gray-800 capitalize">
                            {title}
                        </h1>
                        <p className="capitalize text-justify text-sm font-light text-gray-700">
                            {description}
                        </p>
                        <p className="flex capitalize text-gray-900 text-sm">
                            <MdOutlineLocationOn
                                size={20}
                                className="text-gray-700"
                            />
                            {fullAddress}
                        </p>
                        <p className="flex capitalize text-gray-900 items-center">
                            <BiRupee size={20} className="text-gray-800" />{" "}
                            {price}
                        </p>
                        {broker && <>

                            <hr className="" />
                            {/* contact details */}
                            <div className="pt-2 space-y-2">
                                <div className="flex items-center space-x-2 text-xs">
                                    <span className="">
                                        <HiOutlineUser size={18} />
                                    </span>
                                    <span className="">{`${broker.firstName} ${broker.lastName}`}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-xs">
                                    <span className="">
                                        <HiOutlinePhone size={18} />
                                    </span>
                                    <span className="">{broker.phone}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-xs">
                                    <span className="">
                                        <HiOutlineMail size={18} />
                                    </span>
                                    <span className="">{broker.email}</span>
                                </div>
                            </div>
                        </>}
                        <button
                            className="text-xs w-full text-center text-primary"
                            onClick={() => setShowImages(true)}
                        >
                            Show Images
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
