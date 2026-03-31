import UrlList from '../Components/UrlList'
import { useEffect, useState } from "react";

const Links = () => {
 const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);

  const fetchLinks = async () => {
  const res = await fetch("http://localhost:5000/urls");
  const data = await res.json();
  setLinks(data);
};

useEffect(() => {
  fetchLinks();
}, []);

const totalLinks = links.length;

const shorten = async () => {
  if (!url) return;

  const res = await fetch("http://localhost:5000/shorten", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ originalUrl: url })
  });

  const data = await res.json();

  console.log(data);

  setUrl("");
  fetchLinks();
};
  return (
    <>
   <div className="bg-[#11161c] border border-gray-800 rounded-xl p-6 mb-6">

  <p className="text-xs text-gray-400 mb-4 tracking-widest">
    CREATE SHORT LINK
  </p>

  <div className="flex gap-4">
    <input
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      placeholder="Paste your long URL"
      className="flex-1 bg-[#0b0f14] border border-gray-700 rounded-lg px-4 py-2 text-white"
    />

    <button
      onClick={shorten}
      className="bg-green-400 text-black px-6 py-2 rounded-lg font-semibold"
    >
      Shorten →
    </button>
  </div>

</div>



<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <div className="bg-[#11161c] border border-gray-800 p-4 rounded-lg">
        <p className="text-xs text-gray-400">Total Links</p>
        <h2 className="text-2xl font-bold text-gray">{totalLinks}</h2>
    </div>
    <div className="bg-[#11161c] border border-gray-800 p-4 rounded-lg">
        <p className="text-xs text-gray-400">Total Clicks</p>
        <h2 className="text-2xl font-bold text-gray">{0}</h2>
    </div>
    <div className="bg-[#11161c] border border-gray-800 p-4 rounded-lg">
        <p className="text-xs text-gray-400">Total Links</p>
        <h2 className="text-2xl font-bold text-gray">
            
            {links[0]?.shortCode || "-"}
        </h2>
    </div>
</div>
{/* <Links table */}
      <div className="bg-[#11161c] border border-gray-800 rounded-xl">
        <div className="p-4 border-b border-gray-800 text-gray-400 text-sm">All Links</div>

        {links.map((link) => (
            <div
            key={link._id}
            className="p-4 border-b border-gray-800 flex justify-between items-center">
                <p className="text-green-400">
                    http://localhost:5000/{link.shortCode}</p>
                <p className="text-gray-500 text-sm"> 
                    {link.originalUrl}
                </p>
                <div className="flex gap-2">
                    <button onClick={()=>
                        navigator.clipboard.writeText(`http://localhost:5000/${link.shortCode}`)}
                        className="text-sm text-gray-400 hover:text-gray-200">
                        Copy
                    </button>
                    
                </div>
            </div>
))}
        </div>
    </>
  )
} 
export default Links