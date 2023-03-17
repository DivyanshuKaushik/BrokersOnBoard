import React, { useState } from "react";
import { HiOutlineSelector, HiOutlineUser } from "react-icons/hi";
import {
    MdLockOutline,
    MdOutlineAttachMoney,
    MdOutlineFileUpload,
    MdOutlineLocationCity,
    MdOutlineLocationOn,
    MdOutlineMail,
    MdOutlinePersonPin,
    MdOutlinePhone,
    MdOutlinePin,
    MdRemoveCircleOutline,
} from "react-icons/md";
import { TbBuilding, TbRuler } from "react-icons/tb";
import { FaRegAddressCard } from "react-icons/fa";
import ImageUpload from "../components/utils/ImageUpload";
import Image from "next/image";
import SelectInput from "../components/utils/SelectInput";
import { addNewProperty } from "../services/property";
import Private from "../components/layouts/Private";

const fields = [
    { name: "title", icon: <HiOutlineUser size={24} />, type: "text" },
    { name: "description", icon: <HiOutlineUser size={24} />, type: "text" },
    { name: "sqft", icon: <TbRuler size={24} />, type: "number" },
    { name: "price", icon: <MdOutlineAttachMoney size={24} />, type: "number" },
    { name: "address", icon: <FaRegAddressCard size={24} />, type: "text" },
    { name: "city", icon: <MdOutlineLocationCity size={24} />, type: "text" },
    { name: "state", icon: <TbBuilding size={24} />, type: "text" },
    {
        name: "pincode",
        icon: <MdOutlineLocationOn size={24} />,
        type: "number",
    },
];

const types = [
    { name: "propertyType", options: ["home", "bunglow", "land"] },
    { name: "requestType", options: ["rent", "sale"] },
];

export default function AddNewProperty() {
    // form data state
    const [propertyData, setPropertyData] = useState({
        title: "",
        description: "",
        sqft: "",
        price: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        propertyType: "",
        requestType: "",
        images: "",
    });

    function handleChange(e) {
        setPropertyData({ ...propertyData, [e.target.name]: e.target.value });
    }

    function handleImages(e) {
        setPropertyData({ ...propertyData, images: e.target.files });
    }

    function removeImages(e) {
        e.preventDefault();
        setPropertyData({ ...propertyData, images: [] });
    }

    async function addProperty(e) {
        e.preventDefault();
        const { data, error } = addNewProperty(propertyData);
        if (error) {
            const err = res.error.response?.data.error || res.error;
            if (!err) return alert("something went wrong");
            console.log(error, "safasfasd");
            return alert(err);
        }
        console.log(data);
        alert(data);
    }

    return (
        <Private allow={["admin", "broker"]}>
            <main className="flex items-center justify-center p-8">
                <div className="">
                    <h3 className="">Add New Property</h3>
                    <form onSubmit={addProperty} className="">
                        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4 place-items-center place-content-center">
                            {fields.map(({ name, icon, type }) => (
                                <div
                                    key={name}
                                    className="flex flex-col space-y-2 w-80 lg:w-[400px] focus:ring-red-500"
                                >
                                    <label
                                        htmlFor={name}
                                        className="capitalize text-sm text-gray-800"
                                    >
                                        {name.toLowerCase()}
                                    </label>
                                    <div className="flex items-center space-x-2 border rounded-md px-2 ">
                                        <span className="text-primary">
                                            {icon}
                                        </span>
                                        <input
                                            type="text"
                                            name={name}
                                            value={propertyData[name]}
                                            onChange={handleChange}
                                            className="outline-none bg-transparent p-2 w-full text-gray-800"
                                        />
                                    </div>
                                </div>
                            ))}
                            {propertyData.images.length ? (
                                <div className="flex flex-col space-y-2 w-80 lg:w-[400px] focus:ring-red-500">
                                    <label
                                        htmlFor="images"
                                        className="capitalize text-sm text-gray-800"
                                    >
                                        Images
                                    </label>
                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-primary">
                                            <MdOutlineFileUpload size={24} />
                                        </span>
                                        <div className="flex flex-col">
                                            {Array.from(
                                                propertyData.images
                                            ).map((item, i) => (
                                                <span
                                                    className="text-xs"
                                                    key={i}
                                                >
                                                    {item.name}
                                                </span>
                                            ))}
                                        </div>
                                        <button
                                            onClick={removeImages}
                                            className=""
                                        >
                                            <MdRemoveCircleOutline
                                                size={24}
                                                className="text-primary"
                                            />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <ImageUpload
                                    name={"images"}
                                    handleImage={handleImages}
                                    multiple
                                />
                            )}
                            {/* propertyType and requestType*/}
                            {types.map(({ name, options }) => (
                                <div
                                    key={name}
                                    className="flex flex-col space-y-2 lg:w-[400px] focus:ring-red-500"
                                >
                                    <label
                                        htmlFor={name}
                                        className="capitalize text-sm text-gray-800"
                                    >
                                        {name.toLowerCase().split("type")[0]}{" "}
                                        type
                                    </label>
                                    <div className="flex items-center space-x-2 border rounded-md pl-2 w-80 lg:w-full">
                                        <span className="text-primary">
                                            <HiOutlineSelector size={24} />
                                        </span>
                                        <SelectInput
                                            name={name}
                                            data={propertyData}
                                            setData={setPropertyData}
                                            options={options}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex w-full mt-6 justify-center">
                            <button
                                type="submit"
                                className="bg-primary py-2 px-6 rounded-md text-white hover:bg-slate-50 hover:text-gray-700 transition duration-200 ease-in active:scale-75 w-full lg:w-1/2"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </Private>
    );
}
