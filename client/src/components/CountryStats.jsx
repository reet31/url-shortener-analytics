import {useState} from "react";

export default function CountryStats() {
    return (
        <div className="bg-[#11161c] border border-gray-800 p-6 rounded-xl">

    <p className="text-xs text-gray-400 mb-4">
      CLICKS BY COUNTRY
    </p>

    {[
      { name: "United States", val: 42 },
      { name: "India", val: 28 },
      { name: "UK", val: 15 },
      { name: "Canada", val: 9 },
    ].map((c, i) => (
      <div key={i} className="mb-4">

        <div className="flex justify-between text-sm">
          <span>{c.name}</span>
          <span>{c.val}%</span>
        </div>

        <div className="w-full h-2 bg-gray-800 rounded mt-1">
          <div
            className="h-2 bg-green-400 rounded"
            style={{ width: `${c.val}%` }}
          ></div>
        </div>

      </div>
    ))}

  </div>
      )}