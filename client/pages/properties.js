import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserProvider";
import Private from "../components/layouts/Private";
import { getProperties } from "../services/property";
import Table from "../components/utils/Table";
import { HiArrowNarrowLeft, HiOutlineArrowNarrowRight } from "react-icons/hi";
import PropertyCard from "../components/PropertyCard";
import Spinner from "../components/utils/Spinner";

export default function Properties() {
    const { user } = useContext(UserContext);
    const [query, setQuery] = useState({
        page: 1,
        limit: 12,
        requestType: "",
        propertyType: "",
        city: "",
        state: "",
        pincode: "",
        broker: user?.role==="broker"?user._id:"",
    });
    const [properties, setProperties] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        async function fetchProperties() {
            setLoading(true);
            const { data, error } = await getProperties(query);
            if (error) {
                alert(error);
            }
            console.log(data);
            setProperties(data);
            setLoading(false);
        }
        fetchProperties();
    }, [query]);

    const table_keys = [
        "title",
        "requestType",
        "propertyType",
        "sqft",
        "city",
        "state",
        "pincode",
    ];

    const next = () => {
        setQuery({ ...query, page: query.page + 1 });
    };

    const prev = () => {
        setQuery({ ...query, page: query.page - 1 });
    };
    return (
        <Private allow={["broker", "admin"]}>
            <main className="px-10 lg:px-20 py-10 space-y-6 bg-gray-50">
                <h1 className="text-xl lg:text-3xl text-gray-800">
                    Properties
                </h1>
                {/* <Table keys={table_keys} data={properties} /> */}
                {/* property display  */}
                {loading && <Spinner />}
                {properties.length === 0 && !loading && <h3 className="text-center">No more properties to show</h3>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {!loading && properties.length>=1 && properties?.map((item) => (
                        <PropertyCard key={item._id} property={item} />
                    ))}
                </div>
                {/* button to load new data  */}
                <div className="flex items-center justify-center space-x-6">
                    <button
                        disabled={query.page <= 1}
                        onClick={prev}
                        className="bg-red-400 disabled:bg-gray-100 disabled:text-gray-300 text-white hover:bg-gray-100 hover:text-gray-700 transition duration-200 ease-in px-4 py-2 rounded"
                    >
                        <HiArrowNarrowLeft size={20} />
                    </button>
                    <button
                        disabled={
                            properties.length === 0 ||
                            properties.length < query.limit
                        }
                        onClick={next}
                        className="bg-red-400 disabled:bg-gray-100 disabled:text-gray-300 text-white hover:bg-gray-100 hover:text-gray-700 transition duration-200 ease-in px-4 py-2 rounded"
                    >
                        <HiOutlineArrowNarrowRight size={20} />
                    </button>
                </div>
            </main>
        </Private>
    );
}
