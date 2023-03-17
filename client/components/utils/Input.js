import React from "react";

export default function Input({ name, label,value,handleChange,icon }) {
    return (
        <div
            key={name}
            className="flex flex-col space-y-2 w-80 lg:w-[400px] focus:ring-red-500"
        >
            <label htmlFor={name} className="capitalize text-sm text-gray-800">
                {label? label : name.toLowerCase()}
            </label>
            <div className="flex items-center space-x-2 border rounded-md px-2 ">
                <span className="text-primary">{icon}</span>
                <input
                    type="text"
                    name={name}
                    value={value}
                    onChange={handleChange}
                    placeholder={label}
                    className="outline-none bg-transparent p-2 w-full text-gray-800"
                />
            </div>
        </div>
    );
}
