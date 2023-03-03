import React from "react";
import { getAuthUser } from "../services/auth";

export const UserContext = React.createContext();

export default function UserProvider({children}) {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        async function fetchAuthenticatedUser() {
            setLoading(true);
            const { data, error } = await getAuthUser();
            if (error) {
                setLoading(false);
                return;
            }
            setUser(data);
            setLoading(false);
        }
        fetchAuthenticatedUser();
    }, []);
    return !loading && <UserContext.Provider value={{user,setUser}}>{children}</UserContext.Provider>;
}
