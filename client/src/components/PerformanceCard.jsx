import React from 'react';
import {useState} from 'react';
export default function PerformanceCard({data}) {
  
  if (!data || !data.links) {
    return <p className="text-gray-400">Loading...</p>;
  }
  const totalClicks=data.tottalClicks;
  const totalLinks=data.links.length;
  const topLink=[...data.links].sort((a,b)=>b.clicks-a.clicks)[0];
  const avgClicks=totalLinks>0? (totalClicks/totalLinks).toFixed(2) : 0;
    return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

      <div className="bg-[#11161c] border-gray-800 p-5 rounded-xl ">
        <p className="text-xs text-gray-400">Total Clicks</p>
        <h2 className="text-2xl font-bold mt-2">{totalClicks}</h2>
        </div>

        <div className="bg-[#11161c] border-gray-800 p-5 rounded-xl">
        <p className="text-xs text-gray-400">Total Links</p>
        <h2 className="text-2xl font-bold mt-2">{totalLinks}</h2>
        </div>

        <div className="bg-[#11161c] border-gray-800 p-5 rounded-xl">
        <p className="text-xs text-gray-400">Top Links</p>
        <h2 className="text-2xl font-bold mt-2">{topLink?.shortCode || "N/A :)" }</h2>
        </div>

        <div className="bg-[#11161c] border-gray-800 p-5 rounded-xl">
        <p className="text-xs text-gray-400">Avg Clicks</p>
        <h2 className="text-2xl font-bold mt-2">{avgClicks}</h2>
        </div>
      </div>
    )}
    