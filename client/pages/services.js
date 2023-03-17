import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
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
import { UserContext } from "../context/UserProvider";
import Input from "../components/utils/Input";

const requestFields = [
    { name: "city", icon: <MdOutlineLocationCity size={24} />, label: "City" },
    { name: "state", icon: <TbBuilding size={24} />, label: "State" },
    {
        name: "address",
        icon: <FaRegAddressCard size={24} />,
        label: "Address (Optional)",
    },
    {
        name: "pincode",
        icon: <MdOutlineLocationOn size={24} />,
        label: "Pincode (Optional)",
    },
];

const propertyFields = [
    { name: "title", icon: <HiOutlineUser size={24} /> },
    { name: "description", icon: <HiOutlineUser size={24} /> },
    { name: "sqft", icon: <TbRuler size={24} /> },
    { name: "price", icon: <MdOutlineAttachMoney size={24} /> },
    { name: "city", icon: <MdOutlineLocationCity size={24} />, label: "City" },
    { name: "state", icon: <TbBuilding size={24} />, label: "State" },
    {
        name: "address",
        icon: <FaRegAddressCard size={24} />,
    },
    {
        name: "pincode",
        icon: <MdOutlineLocationOn size={24} />,
    },
];

const propertyOptions = ["home", "bunglow", "land"];

export default function Services() {
    const { pathname, query } = useRouter();
    const { tab } = query;

    const { user } = useContext(UserContext);

    const fields = user?.role === "user" ? requestFields : propertyFields;

    const [data, setData] = useState({
        title: "",
        description: "",
        sqft: "",
        price: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        propertyType: "",
        requestType: tab === "sell" ? "sale" : tab,
        images: "",
    });

    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
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

    async function submit(e) {
        e.preventDefault();
    }
    return (
        <Private allow={["admin", "broker", "user"]}>
            <section className="px-10 lg:px-20 py-4 lg:py-10">
                <main className="bg-white border rounded-lg shadow-md p-4">
                    <h3 className="text-3xl text-center font-semibold text-primary capitalize">
                        {tab} Property
                    </h3>
                    <hr className="w-2/3 mx-auto mt-4" />

                    <form onSubmit={submit} className="">
                        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4 place-items-center place-content-center">
                            {fields.map(({ name, icon, label }) => (
                                <Input
                                    key={name}
                                    name={name}
                                    label={label}
                                    icon={icon}
                                    handleChange={handleChange}
                                    value={data[name]}
                                />
                            ))}
                            {/* images */}
                            {(user.role === "broker" ||
                                user.role === "admin") &&
                            data.images.length ? (
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
                            {/* propertyType*/}
                            <div className="flex flex-col space-y-2 lg:w-[400px] focus:ring-red-500">
                                <label
                                    htmlFor="propertyType"
                                    className="capitalize text-sm text-gray-800"
                                >
                                    property type
                                </label>
                                <div className="flex items-center space-x-2 border rounded-md pl-2 w-80 lg:w-full">
                                    <span className="text-primary">
                                        <HiOutlineSelector size={24} />
                                    </span>
                                    <SelectInput
                                        name="propertyType"
                                        data={data}
                                        setData={setData}
                                        options={propertyOptions}
                                    />
                                </div>
                            </div>
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
                </main>
            </section>
        </Private>
    );
}
