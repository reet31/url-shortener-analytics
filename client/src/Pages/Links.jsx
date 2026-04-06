import { useEffect, useState } from "react";
import PerformanceCard from "../components/PerformanceCard";


const Links = () => {
 const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);
  const [data,setdata]=useState(null);
  const [openId,setopenId]=useState(null);
    useEffect(()=>{
        fetch("http://localhost:5000/analytics")
        .then(res=>res.json()).then(setdata).catch(err=>console.error(err));
    },[]);

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
const deleteLink=async(id)=>{
  await fetch(`http://localhost:5000/urls/${id}`,{
    method:"DELETE"
  });
  fetchLinks();
}
  return (
    <>
    <div className="min-h- screen bg-[#0f0d0a] text-[#e8e0d0] flex justify-center">
      <div className="w-full max-w-6xl px-6 py-4">
   <div className="bg-[#1a1510] border border-[#2a2318] rounded-xl p-6 mb-6">

  <p className="text-xs text-[#a09070]  mb-4 tracking-widest">
    CREATE SHORT LINK
  </p>

  <div className="flex gap-4 ">
    <input
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      placeholder="Paste your long URL"
      className="flex-1 bg-[#1a1510] border border-[#2a2318] rounded-lg px-4 py-2 text-[#e8e0d0] placeholder:text-[#6b5d4a]"
    />

    <button
      onClick={shorten}
      className="bg-[#d4a853] text-[#0f0d0a] px-6 py-2 rounded-lg font-semibold"
    >
      Shorten →
    </button>
  </div>

</div>

        <div>
                <PerformanceCard data={data} />
            </div>
            {/* <Links table */}
      <div className="bg-[#1a1510] border border-[#2a2318] rounded-xl mt-6">
        <div className="p-4 border-b border-[#2a2318] text-[#a09070] text-sm">All Links</div>

        {links.map((link) => {
  const analytics = data?.links?.find(
    (item) => item.shortCode === link.shortCode
  );

  return (
    <div
      key={link._id}
      className="p-4 border-b border-[#2a2318] last:border-0 cursor-pointer"
    >
      <div
        onClick={() =>
          setopenId(openId === link._id ? null : link._id)
        }
        className="flex justify-between items-center cursor-pointer"
      >
        <p className="text-[#a09070]">
          http://localhost:5000/{link.shortCode}
        </p>

        <p className="text-[#6b5d4a] text-sm truncate max-w-xs">
          {link.originalUrl}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation(); 
           deleteLink(link._id);
          }}
          className="text-sm text-red-400 hover:text-red-300"
        >
          Delete 
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation(); 
            navigator.clipboard.writeText(
              `http://localhost:5000/${link.shortCode}`
            );
          }}
          className="text-sm text-[#a09070] hover:text-[#e8e0d0]"
        >
          Copy
        </button>
      </div>

      {openId === link._id && (
        analytics ? (
          <div className="mt-4 border-t border-[#2a2318] pt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-[#e8e0d0]">

            <div>
              <p className="text-[#6b5d4a] text-xs">CREATED</p>
              <p>{new Date(analytics.createdAt).toLocaleDateString()}</p>
            </div>

            <div>
              <p className="text-[#6b5d4a] text-xs">TOP COUNTRY</p>
              <p>{analytics.topcountry}</p>
            </div>

            <div>
              <p className="text-[#6b5d4a] text-xs">TOP BROWSER</p>
              <p>{analytics.topbrowser}</p>
            </div>

            <div>
              <p className="text-[#6b5d4a] text-xs">AVG / DAY</p>
              <p>{analytics.avgperday}</p>
            </div>
            

          </div>
        ) : (
          <div className="mt-4 text-[#a09070]">
            No analytics data available
          </div>
        )
      )}
    </div>
  );
})}
      </div>
      </div>
    </div>

    
    </>
  )
} 
export default Links