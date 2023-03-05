import React from "react";

export default function Table({keys,data}) {
    return (
        <div className="py-8 w-full">
            <div className="shadow overflow-scroll rounded border-b border-gray-200">
                <table className="min-w-full bg-white">
                    <thead className="bg-secondary text-white">
                        <tr>
                            {keys.map((key, i) => (
                                <th key={i} className="text-left py-3 px-4 uppercase font-semibold text-sm">
                                    {key}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {data.map((item, i) => (
                            <tr>
                            {keys.map((key, i) => (
                                <td className="text-left py-3 px-4">{item[key]}</td>
                            ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
