import React from 'react'

export default function Search() {
  return (
    <div className="w-4/5 mx-auto p-3 backdrop-blur-sm backdrop-brightness-110">
        <div className="bg-white p-4 flex space-x-2 items-center justify-around">
            {/* location  */}
            <input type="text" placeholder="Location" className="focus:outline-none px-4 py-2 rounded-md border"/>
            {/* property type  */}
            <input type="text" placeholder="Property" className="focus:outline-none px-4 py-2 rounded-md border"/>
            {/* price range  */}
            <input type="text" placeholder="Price" className="focus:outline-none px-4 py-2 rounded-md border"/>
            {/* search btn  */}
            <button className="bg-primary text-white py-2 px-4 rounded-md">
                Search
            </button>
        </div>
    </div>
  )
}
