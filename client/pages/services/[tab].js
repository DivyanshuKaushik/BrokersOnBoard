import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
    HiOutlinePhone,
    HiOutlineSelector,
    HiOutlineUser,
} from "react-icons/hi";
import {
    MdLockOutline,
    MdOutlineAttachMoney,
    MdOutlineDescription,
    MdOutlineFileUpload,
    MdOutlineLocationCity,
    MdOutlineLocationOn,
    MdOutlineMail,
    MdOutlinePersonPin,
    MdOutlinePhone,
    MdOutlinePin,
    MdOutlineTitle,
    MdRemoveCircleOutline,
} from "react-icons/md";
import { TbBuilding, TbRuler } from "react-icons/tb";
import { FaRegAddressCard } from "react-icons/fa";
import ImageUpload from "../../components/utils/ImageUpload";
import Image from "next/image";
import SelectInput from "../../components/utils/SelectInput";
import { addNewProperty, getProperties } from "../../services/property";
import Private from "../../components/layouts/Private";
import { UserContext } from "../../context/UserProvider";
import Input from "../../components/utils/Input";
import { addNewRequest } from "../../services/request";
import Link from "next/link";
import PropertyCard from "../../components/PropertyCard";
import Spinner from "../../components/utils/Spinner";

import { DefaultError, OnError, Success } from "../../alerts";

const commonFields = [
    { name: "name", icon: <HiOutlineUser size={24} />, label: "Name" },
    { name: "phone", icon: <HiOutlinePhone size={24} />, label: "Phone" },
];
const requestFields = [
    ...commonFields,
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
    ...commonFields,
    // { name: "title", icon: <MdOutlineTitle size={24} />, label: "Title" },
    // {
    //     name: "description",
    //     icon: <MdOutlineDescription size={24} />,
    //     label: "Description (Optional)",
    // },
    { name: "sqft", icon: <TbRuler size={24} />, label: "Sqft" },
    { name: "price", icon: <MdOutlineAttachMoney size={24} />, label: "Price" },
    { name: "city", icon: <MdOutlineLocationCity size={24} />, label: "City" },
    { name: "state", icon: <TbBuilding size={24} />, label: "State" },
    {
        name: "address",
        icon: <FaRegAddressCard size={24} />,
        label: "Address",
    },
    {
        name: "pincode",
        icon: <MdOutlineLocationOn size={24} />,
        label: "Pincode",
    },
];

const propertyOptions = ["home", "bunglow", "land"];

const buyPriceRanges = [
    "5-10 Lakhs",
    "10-20 Lakhs",
    "20-50 Lakhs",
    "50-99 Lakhs",
    "99+ Lakhs",
];
const rentPriceRanges = [
    "5-10 Thousands",
    "10-20 Thousands",
    "20-50 Thousands",
    "50-99 Thousands",
    "99+ Thousands",
];

export default function Services() {
    const router = useRouter();

    const { tab } = router.query;

    const [query, setQuery] = useState({
        page: 1,
        limit: 12,
        requestType: "rent",
        propertyType: "",
        city: "",
        state: "",
        pincode: "",
    });
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchProperties() {
            setLoading(true);
            const { data, error } = await getProperties(query);
            if (error) {
                const err = error.response?.data.error || error;
                if (!err) return DefaultError();
                return OnError(err);
            }
            setProperties(data);
            setLoading(false);
        }
        fetchProperties();
    }, [query]);

    const fields = tab === "new" ? propertyFields : requestFields;

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        // title: "",
        // description: "",
        sqft: "",
        price: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        propertyType: "",
        priceRange: "",
        // property: "",
        requestType: tab,
        // requestType: tab === "sell" ? "sale" : tab,
        images: "",
    });

    // useEffect(()=>{
    //     setFormData({
    //         ...formData,
    //         address: address? address :"",
    //         city: city? city :"",
    //         state: state? state :"",
    //         pincode: pincode? pincode :"",
    //         propertyType: propertyType? propertyType : "",
    //     })
    // },[])

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleImages(e) {
        setFormData({ ...formData, images: e.target.files });
    }

    function removeImages(e) {
        e.preventDefault();
        setFormData({ ...formData, images: [] });
    }

    async function addProperty(e) {
        const res = await addNewProperty(formData);
        if (res.error) {
            const err = res.error.response?.data.error || res.error;
            if (!err) return DefaultError();
            return OnError(err);
        }
        Success()
    }

    async function addRequest(e) {
        const res = await addNewRequest(formData);
        if (res.error) {
            const err = res.error.response?.data.error || res.error;
            if (!err) return DefaultError();
            return OnError(err);
        }
        Success()
    }

    async function submit(e) {
        e.preventDefault();
        if (tab === "new") {
            addProperty(formData);
        } else {
            addRequest(formData);
        }
        setFormData({
            name: "",
            phone: "",
            title: "",
            description: "",
            sqft: "",
            price: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            propertyType: "",
            requestType: tab,
            images: "",
        });
    }
    return (
        // <Private allow={["admin", "broker", "user"]}>
        <section className="px-10 lg:px-20 py-4 lg:py-10">
            {tab === "rent" && (
                <>
                    <div className="flex justify-between w-full">
                        <h1 className="text-xl lg:text-3xl text-gray-800">
                            Properties
                        </h1>
                        <Link href="/services/new">
                            <button className="bg-primary py-2 px-6 mb-2 text-xs rounded-md text-white hover:bg-slate-100 hover:text-gray-700 transition duration-200 ease-in active:scale-75">
                                Rent Your Property
                            </button>
                        </Link>
                    </div>
                    {/* <Table keys={table_keys} data={properties} /> */}
                    {/* property display  */}
                    {loading && <Spinner />}
                    {properties.length === 0 && !loading && (
                        <h3 className="text-center">
                            No more properties to show
                        </h3>
                    )}
                    <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {!loading &&
                            properties.length >= 1 &&
                            properties?.map((item) => (
                                <PropertyCard
                                    key={item._id}
                                    property={item}
                                    contact={false}
                                    inquire
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                            ))}
                    </div>
                </>
            )}
            <main className="bg-white border rounded-lg shadow-md p-4 lg:px-14">
                <h3 className="text-3xl text-center font-semibold text-primary capitalize">
                    {tab === "new" ? "Sell or Rent New" : tab} Property
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
                                value={formData[name]}
                            />
                        ))}
                        {tab !== "new" && (
                            <div className="flex flex-col space-y-2 w-full focus:ring-red-500">
                                <label
                                    htmlFor="priceRange"
                                    className="capitalize text-sm text-gray-800"
                                >
                                    Budget
                                </label>
                                <div className="flex items-center space-x-2 border rounded-md pl-2 w-80 lg:w-full">
                                    <span className="text-primary">
                                        <HiOutlineSelector size={24} />
                                    </span>
                                    <SelectInput
                                        name="priceRange"
                                        data={formData}
                                        setData={setFormData}
                                        options={
                                            tab === "rent"
                                                ? rentPriceRanges
                                                : buyPriceRanges
                                        }
                                    />
                                </div>
                            </div>
                        )}
                        {/* images */}
                        {tab === "new" && (
                            <>
                                {formData.images.length ? (
                                    <div className="flex flex-col space-y-2 w-full focus:ring-red-500">
                                        <label
                                            htmlFor="images"
                                            className="capitalize text-sm text-gray-800"
                                        >
                                            Images
                                        </label>
                                        <div className="flex items-center justify-between w-full">
                                            <span className="text-primary">
                                                <MdOutlineFileUpload
                                                    size={24}
                                                />
                                            </span>
                                            <div className="flex flex-col">
                                                {Array.from(
                                                    formData.images
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
                            </>
                        )}
                        {/* propertyType*/}
                        <div className="flex flex-col space-y-2 w-full focus:ring-red-500">
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
                                    data={formData}
                                    setData={setFormData}
                                    options={propertyOptions}
                                />
                            </div>
                        </div>
                        {/* request Type*/}
                        {tab === "new" && (
                            <div className="flex flex-col space-y-2 w-full focus:ring-red-500">
                                <label
                                    htmlFor="propertyType"
                                    className="capitalize text-sm text-gray-800"
                                >
                                    request type
                                </label>
                                <div className="flex items-center space-x-2 border rounded-md pl-2 w-80 lg:w-full">
                                    <span className="text-primary">
                                        <HiOutlineSelector size={24} />
                                    </span>
                                    <SelectInput
                                        name="requestType"
                                        data={formData}
                                        setData={setFormData}
                                        options={["sale", "rent"]}
                                    />
                                </div>
                            </div>
                        )}
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
        // </Private>
    );
}
