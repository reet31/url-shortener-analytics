import { useState } from "react";
import AnalyticsChart from "../components/AnalyticsChart";
import CountryStats from "../components/CountryStats";
import TopLinksSection from "../components/TopLinksSection";
import PerformanceCard from "../components/PerformanceCard";
export default function Analytics() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-6 text-white">
            <h1  className="text-2xl font-bold mb-2">
                Analytics Page
            </h1>
            <p className="text-gray-400 mb-6">
                Last 7 days across all Links
            </p>
            <div className="space-y-6">    
                <AnalyticsChart />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TopLinksSection />
                    <CountryStats />
            </div>
                <PerformanceCard />
            </div>
        </div>
    )
}
