import React, { useContext } from "react";
import { UserContext } from "../../context/UserProvider";

export default function Private({ children, allow }) {
    const { user } = useContext(UserContext);
    if (!user) return <div>Not Authorized</div>;
    if (allow && !allow.includes(user.role)) return <div>Not Authorized</div>;

    return user && children;
}
