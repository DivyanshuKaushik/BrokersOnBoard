import React from "react";
import { HiArrowNarrowLeft, HiOutlineArrowNarrowRight } from "react-icons/hi";
export const PaginationContext = React.createContext();

export default function PaginationProvider({ children }) {
    const [Pagination, setPagination] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [query, setQuery] = React.useState({
        page: 1,
        limit: 12,
    });

    const next = () => {
        setQuery({ ...query, page: query.page + 1 });
    };

    const prev = () => {
        setQuery({ ...query, page: query.page - 1 });
    };

    // React.useEffect(() => {
    //     async function fetchAuthenticatedPagination() {
    //         // setLoading(true);
    //         const { data, error } = await getAuthPagination();
    //         if (error) {
    //             setLoading(false);
    //             return;
    //         }
    //         setPagination(data);
    //         setLoading(false);
    //     }
    //     fetchAuthenticatedPagination();
    // }, []);
    return (
        <PaginationContext.Provider value={{ query, setQuery }}>
            {children}
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
                        messages.length === 0 || messages.length < query.limit
                    }
                    onClick={next}
                    className="bg-red-400 disabled:bg-gray-100 disabled:text-gray-300 text-white hover:bg-gray-100 hover:text-gray-700 transition duration-200 ease-in px-4 py-2 rounded"
                >
                    <HiOutlineArrowNarrowRight size={20} />
                </button>
            </div>
        </PaginationContext.Provider>
    );
}
