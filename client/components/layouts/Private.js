import React, { useContext, useState,useEffect } from "react";
import { UserContext } from "../../context/UserProvider";
import Modal from "../utils/Modal";
import Router from 'next/router';

export default function Private({ children, allow }) {
    const { user,loading } = useContext(UserContext);
    useEffect(()=>{ 
        if (!user && !loading) Router.push('/signin');
        if (!loading && user && allow && !allow.includes(user.role)) {
            Router.push('/signin');
        }
    },[user])
    if(loading) return <div>Loading...</div>
    return !loading && user &&  children
}

function AuthModal({ open, setOpen }) {
    return (
        <Modal open={open} setOpen={setOpen}>
            <div>Not Authorized</div>
        </Modal>
    );
}
