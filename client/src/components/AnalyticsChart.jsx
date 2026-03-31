import { useState } from "react";

export default function AnalyticsChart() {
    return (
        <div className="bg-[#11161c] border border-gray-800 rounded-xl p-6 mb-6">
            <p className="text-xs text-gray-400 mb-2 tracking-widest">
                CLICK-VOLUME-LAST 7 DAYS
            </p>
            <div className="flex items-end justify-between h-48">
                {([12, 19, 3, 5, 2, 3, 7]).map((value, index) => (
                    <div
                        key={index}
                        className="bg-green-400 rounded-sm"
                        style={{ height: `${value * 4}px`, width: "20px" }}
                    >
                    <span className="text-xs text-gray-400 mt-1">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                    </span>
                    </div>
                )   )}
            </div>
        </div>
    )
}