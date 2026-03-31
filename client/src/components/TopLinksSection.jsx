import {useState}from "react";

export default function TopLinksSection() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">

  <div className="bg-[#11161c] border border-gray-800 p-6 rounded-xl">

    <p className="text-xs text-gray-400 mb-4">
      TOP LINKS BY CLICKS
    </p>

    {[
      { name: "lnk.io/rT7nL", clicks: 2301 },
      { name: "lnk.io/xK9mP", clicks: 1482 },
      { name: "lnk.io/aB3wQ", clicks: 876 },
    ].map((link, i) => (
      <div key={i} className="mb-4">

        <div className="flex justify-between text-sm">
          <span className="text-green-400">{link.name}</span>
          <span>{link.clicks}</span>
        </div>

        <div className="w-full h-2 bg-gray-800 rounded mt-1">
          <div
            className="h-2 bg-cyan-400 rounded"
            style={{ width: `${link.clicks / 25}%` }}
          ></div>
        </div>

      </div>
    ))}

  </div>
  </div>
  )
}
    