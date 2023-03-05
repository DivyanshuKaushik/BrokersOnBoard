import React from "react";
import Image from "next/image";
import { MdOutlineLocationOn } from "react-icons/md";
import { BiRupee } from "react-icons/bi";
import { HiOutlinePhone } from "react-icons/hi";

export default function PropertyCard({ property }) {
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
        broker
    } = property;

    const fullAddress = `${address}, ${city}, ${state}, ${pincode}`;
    return (
        <div className="shadow-md rounded-lg border p-4 bg-white">
            {/* image carousel  */}
            <div className="relative h-[200px] w-full">
                <span className="absolute top-0 left-0 bg-primary text-white px-2 py-1 rounded-sm text-xs uppercase">
                    For {requestType}
                </span>
                <Image
                    src={images[0]}
                    fill
                    alt="property"
                    className="object-contain"
                />
            </div>
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
                    <MdOutlineLocationOn size={20} className="text-gray-700" />{" "}
                    {fullAddress}
                </p>
                <p className="flex capitalize text-gray-900 items-center">
                    <BiRupee size={20} className="text-gray-800" /> {price}
                </p>
                <hr />
                {/* contact details */}
                <div className="flex items-center">
                    <HiOutlinePhone />
                    <span className="">{`${broker.firstName} ${broker.lastName} - ${broker.phone}`}</span>
                </div>
            </div>
        </div>
    );
}
