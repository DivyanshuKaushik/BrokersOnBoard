import React, { useEffect, useState } from "react";
import Private from "../components/layouts/Private";
import Spinner from "../components/utils/Spinner";
import Table from "../components/utils/Table";
import { getAllUsers } from "../services/auth";

export default function Clients() {
    const [clients,setClients] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        async function fetchClients(){
            setLoading(true)
            const {data,error} = await getAllUsers()
            if(error){
                alert(error)
            }
            setClients(data)
            setLoading(false)
        }
        fetchClients()
    },[])

    const table_keys = ["firstName","lastName","phone","email"]

    return (
        <Private allow={["admin"]}>
            <main className="px-10 lg:px-20 py-10 space-y-6 bg-gray-50">
                <h1 className="text-xl lg:text-3xl text-gray-800">
                    Clients
                </h1>
                {loading && <Spinner />}
                {!loading && clients && <Table keys={table_keys} data={clients} />}
            </main>
        </Private>
    );
}
