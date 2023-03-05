import React, { useEffect, useState } from "react";
import Private from "../components/layouts/Private";
import Spinner from "../components/utils/Spinner";
import Table from "../components/utils/Table";
import { getAllBrokers } from "../services/auth";

export default function Brokers() {
    const [brokers,setBrokers] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        async function fetchBrokers(){
            setLoading(true)
            const {data,error} = await getAllBrokers()
            if(error){
                alert(error)
            }
            setBrokers(data)
            setLoading(false)
        }
        fetchBrokers()
    },[])

    const table_keys = ["firstName","lastName","phone","email","visitingCard"]

    return (
        <Private allow={["admin"]}>
            <main className="px-10 lg:px-20 py-10 space-y-6 bg-gray-50">
                <h1 className="text-xl lg:text-3xl text-gray-800">
                    Brokers
                </h1>
                {loading && <Spinner />}
                {!loading && brokers && <Table keys={table_keys} data={brokers} />}
            </main>
        </Private>
    );
}
