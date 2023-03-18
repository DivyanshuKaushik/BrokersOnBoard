import React from "react";

export default function Input({
    name,
    label,
    type,
    value,
    handleChange,
    icon,
    textbox = false,
    row = 3,
}) {
    return (
        <div
            key={name}
            className="flex flex-col space-y-2 w-full  focus:ring-red-500"
        >
            <label htmlFor={name} className="capitalize text-sm text-gray-800">
                {label ? label : name.toLowerCase()}
            </label>
            <div
                className={`flex ${
                    textbox ? "items-start" : "items-center"
                } space-x-2 border rounded-md px-2 py-0.5`}
            >
                <span className="text-primary">{icon}</span>
                {textbox ? (
                    <textarea
                        name={name}
                        value={value}
                        onChange={handleChange}
                        placeholder={label}
                        className="outline-none bg-transparent p-2 w-full text-gray-800"
                        rows={row}
                    />
                ) : (
                    <input
                        type={type ? type : "text"}
                        name={name}
                        value={value}
                        onChange={handleChange}
                        placeholder={label}
                        className="outline-none bg-transparent p-2 w-full text-gray-800"
                    />
                )}
            </div>
        </div>
    );
}
