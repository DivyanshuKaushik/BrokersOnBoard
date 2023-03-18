import React from "react";
import { MdOutlineFileUpload } from "react-icons/md";

export default function ImageUpload({name,handleImage,multiple=false}) {
    return (
        <div className="flex flex-col space-y-2 w-full focus:ring-red-500">
            <label
                htmlFor={name}
                className="capitalize text-sm text-gray-800"
            >
                {name}
            </label>
            <div className="flex items-center space-x-2 border rounded-md px-2 relative p-2 mt-2">
                <span className="text-primary">
                    <MdOutlineFileUpload size={24} />
                </span>
                <span className="text-gray-800">
                    Upload {name}
                </span>
                <input
                    type="file"
                    accept=".png,.jpeg,.jpg,.webp"
                    name={name}
                    multiple={multiple}
                    onChange={handleImage}
                    className="absolute z-10 top-0 bottom-0 left-0 right-0 opacity-0 cursor-pointer w-full"
                />
            </div>
        </div>
    );
}
