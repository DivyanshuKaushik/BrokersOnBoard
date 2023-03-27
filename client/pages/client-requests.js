import React, { useContext, useEffect, useState } from "react";
import Private from "../components/layouts/Private";
import Spinner from "../components/utils/Spinner";
import Table from "../components/utils/Table";
import { UserContext } from "../context/UserProvider";
import { getRequests } from "../services/request";
import { HiArrowNarrowLeft, HiOutlineArrowNarrowRight } from "react-icons/hi";


export default function Requests() {
    // const { user } = useContext(UserContext);
    const [query, setQuery] = useState({
        page: 1,
        limit: 12,
        requestType: "",
        propertyType: "",
        city: "",
        state: "",
        pincode: "",
        // user: user?.role==="user"?user._id:"",
    });
    const [requests,setRequests] = useState([])
    const [loading,setLoading] = useState(false)
    
    useEffect(() => {
        async function fetchRequests() {
            setLoading(true);
            const { data, error } = await getRequests(query);
            if (error) {
                alert(error);
            }
            console.log(data);
            setRequests(data);
            setLoading(false);
        }
        fetchRequests();
    }, [query]);

    const table_keys = [
        "name",
        "phone",
        "address",
        "city",
        "state",
        "pincode",
        "requestType",
        "propertyType",
        "priceRange",
        // "user"
    ];

    const next = () => {
        setQuery({ ...query, page: query.page + 1 });
    };

    const prev = () => {
        setQuery({ ...query, page: query.page - 1 });
    };

    return (
        <Private allow={["admin"]}>
            <main className="px-10 lg:px-20 py-10 space-y-6 bg-gray-50">
                <h1 className="text-xl lg:text-3xl text-gray-800">
                    Requests
                </h1>
                {loading && <Spinner />}
                {!loading && requests && <Table keys={table_keys} data={requests} />}
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
                            requests?.length === 0 ||
                            requests?.length < query.limit
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
