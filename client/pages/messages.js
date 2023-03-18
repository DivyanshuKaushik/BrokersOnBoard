import React, { useEffect, useState } from "react";
import Private from "../components/layouts/Private";
import Spinner from "../components/utils/Spinner";
import Table from "../components/utils/Table";
import { getContacts } from "../services/contact";
import { HiArrowNarrowLeft, HiOutlineArrowNarrowRight } from "react-icons/hi";

export default function Messages() {
    const [messages,setMessages] = useState([])
    const [loading,setLoading] = useState(false)
    const [query, setQuery] = useState({
        page: 1,
        limit: 12,
    });

    const next = () => {
        setQuery({ ...query, page: query.page + 1 });
    };

    const prev = () => {
        setQuery({ ...query, page: query.page - 1 });
    };
    useEffect(()=>{
        async function fetchMessages(){
            setLoading(true)
            const {data,error} = await getContacts()
            if(error){
                alert(error)
            }
            setMessages(data)
            setLoading(false)
        }
        fetchMessages()
    },[query])

    const table_keys = ["name","email","phone","message"]

    return (
        <Private allow={["admin"]}>
            <main className="px-10 lg:px-20 py-10 space-y-6 bg-gray-50">
                <h1 className="text-xl lg:text-3xl text-gray-800">
                    Messages
                </h1>
                {loading && <Spinner />}
                {!loading && messages && <Table keys={table_keys} data={messages} />}
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
                            messages.length === 0 ||
                            messages.length < query.limit
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
