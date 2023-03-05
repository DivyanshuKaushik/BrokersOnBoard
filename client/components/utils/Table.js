import Link from "next/link";
import React from "react";
import { HiOutlineMail, HiOutlinePhone, HiOutlineUser } from "react-icons/hi";

export default function Table({ keys, data }) {
    return (
        <div className="py-8 w-full">
            <div className="shadow overflow-scroll rounded border-b border-gray-200">
                <table className="min-w-full bg-white">
                    <thead className="bg-secondary text-white">
                        <tr>
                            {keys.map((key, i) => (
                                <th
                                    key={i}
                                    className="text-left py-3 px-4 uppercase font-semibold text-sm"
                                >
                                    {key}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {data.map((item, i) => (
                            <tr className={`${i&1 && "bg-gray-100"}`}>
                                {keys.map((key, i) => {
                                    switch (key) {
                                        case "visitingCard":
                                            return (
                                                <td className="">
                                                    <Link
                                                        href={item[key]}
                                                        target="_blank"
                                                    >
                                                        <span className="py-1 px-2 text-primary text-xs">
                                                            View Card
                                                        </span>{" "}
                                                    </Link>
                                                </td>
                                            );
                                        case "user":
                                            return (
                                                <td className="py-2">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center space-x-2 text-xs">
                                                            <span className="">
                                                                <HiOutlineUser
                                                                    size={14}
                                                                />
                                                            </span>
                                                            <span className="">{`${item[key].firstName} ${item[key].lastName}`}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2 text-xs">
                                                            <span className="">
                                                                <HiOutlinePhone
                                                                    size={14}
                                                                />
                                                            </span>
                                                            <span className="">
                                                                {
                                                                    item[key]
                                                                        .phone
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center space-x-2 text-xs">
                                                            <span className="">
                                                                <HiOutlineMail
                                                                    size={14}
                                                                />
                                                            </span>
                                                            <span className="">
                                                                {
                                                                    item[key]
                                                                        .email
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                            );
                                        default:
                                            return (
                                                <td className="text-left py-3 px-4">
                                                    {item[key]}
                                                </td>
                                            );
                                    }
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
