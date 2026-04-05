import {useState} from "react";

export default function CountryStats({data}) {
   if (!data || !data.countries) return <p className="text-gray-400">Loading...</p>;
    
   const countries=Object.entries(data.countries);
   const total=countries.reduce((sum,[,val])=>sum+val,0);
   return (
    <>
    <div className="bg-[#0f0d0a] border border-[#2a2318] p-6 rounded-xl">

    <p className="text-xs text-[#a09070] mb-4">
      CLICKS BY COUNTRY
    </p>

    {countries.map(([name, val]) => {
      let percent=(total>0? Math.round((val/total)*100) : 0);
      
      return(
      <div key={name} className="mb-4">

        <div className="flex justify-between text-sm">
          <span>{name}</span>
          <span>{percent}%</span>
        </div>

        <div className="w-full h-2 bg-[#2a2318] rounded mt-1">
          <div
            className="h-2 bg-[#d4a853] rounded"
            style={{ width: `${percent}%` }}
          ></div>
        </div>

      </div>
      )
    })}

  </div>
  </>
      )}