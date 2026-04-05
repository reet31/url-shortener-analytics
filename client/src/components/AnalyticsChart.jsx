import React from 'react';
import { useEffect, useState } from "react";
export default function AnalyticsChart({ data }) {
  const [values, setValues] = useState([]);
  useEffect(() => {
    if(data && data.clicks){
      setValues(data.clicks);
    }
  }, [data]);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const max=values.length? Math.max(...values,1):1;


  

  return (
    <div className="bg-[#0f0d0a] border border-[#2a2318] rounded-xl p-6 mb-6">

      <p className="text-xs text-[#a09070] mb-2 tracking-widest">
        CLICK VOLUME - LAST 7 DAYS
      </p>

      <div className="flex items-end justify-between h-40 mt-6">

        {values.map((value, index) => (
          <div key={index} className="flex flex-col items-center gap-2">

            <div
              className="w-6 bg-[#d4a853] rounded"
              style={{ height: `${(value / max) * 150}px` }}
            ></div>

            <span className="text-xs text-[#a09070]">
              {days[index]}
            </span>

          </div>
        ))}

      </div>
    </div>
  );
}