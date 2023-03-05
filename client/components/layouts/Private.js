import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserProvider";

export default function Private({ children, allow }) {
    const { user } = useContext(UserContext);
    if (!user) return <div>Not Authorized</div>;
    if (allow && allow.includes(user.role)) {
        return children;
    }
    return <div>Not Authorized</div>;
}
