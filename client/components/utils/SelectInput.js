import React from "react";

const SelectInput = ({ name, data, setData, options }) => {
    return (
        <select
            id={name}
            className="bg-transparent text-sm rounded-lg outline-none w-full p-2.5 cursor-pointer"
            onChange={(e) => setData({ ...data, [name]: e.target.value })}
        >
            <option defaultValue className="capitalize w-full">
                Select {name.toLowerCase().split("type")[0]} type
            </option>
            {options.map((option) => (
                <option key={option} className="capitalize w-full" value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default SelectInput;
