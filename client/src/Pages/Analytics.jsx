import { useState } from "react";
import { useEffect } from "react";
import AnalyticsChart from "../components/AnalyticsChart";
import CountryStats from "../components/CountryStats";
import TopLinksSection from "../components/TopLinksSection";
import PerformanceCard from "../components/PerformanceCard";
export default function Analytics() {
    const [data,setdata]=useState(null);

    useEffect(()=>{
        fetch("http://localhost:5000/analytics")
        .then(res=>res.json()).then(setdata).catch(err=>console.error(err));
    },[]);
    console.log(data);
    return (
        <div className="min-h-screen bg-[#0f0d0a] text-white flex justify-center">
  <div className="w-full max-w-6xl px-4 py-6">
        <div className="max-w-6xl mx-auto px-4 py-6 text-white">
            <h1  className="text-2xl font-bold mb-2">
                Analytics Page
            </h1>
            <p className="text-[#d4a853] mb-6">
                Last 7 days across all Links
            </p>
            <div className="space-y-6">    
                <AnalyticsChart data={data} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TopLinksSection data={data} />
                    <CountryStats data={data} />
            
            </div>
        </div>
        </div>
        </div>
        </div>
    )
}

