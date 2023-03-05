import React, { useContext, useEffect, useState } from "react";
import Private from "../components/layouts/Private";
import Spinner from "../components/utils/Spinner";
import Table from "../components/utils/Table";
import { UserContext } from "../context/UserProvider";
import { getMyRequests } from "../services/request";

export default function requests() {
    const { user } = useContext(UserContext);
    const [query, setQuery] = useState({
        page: 1,
        limit: 12,
        requestType: "",
        propertyType: "",
        city: "",
        state: "",
        pincode: "",
    });
    const [requests,setRequests] = useState([])
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        async function fetchRequests() {
            setLoading(true);
            const { data, error } = await getMyRequests(query);
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
        "address",
        "city",
        "state",
        "pincode",
        "requestType",
        "propertyType",
    ];

    const next = () => {
        setQuery({ ...query, page: query.page + 1 });
    };

    const prev = () => {
        setQuery({ ...query, page: query.page - 1 });
    };

    return (
        <Private allow={["admin","user"]}>
            <main className="px-10 lg:px-20 py-10 space-y-6 bg-gray-50">
                <h1 className="text-xl lg:text-3xl text-gray-800">
                    Requests
                </h1>
                {loading && <Spinner />}
                {!loading && requests && <Table keys={table_keys} data={requests} />}
            </main>
        </Private>
    );
}
