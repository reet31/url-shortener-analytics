export default function PerformanceCard({data}) {

  if (!data || !data.links) {
    return <p className="text-gray-400">Loading...</p>;
  }
  const totalClicks=data.links.reduce((sum,link)=>sum+link.clicks,0);
  const totalLinks=data.links.length;
  const topLink=[...data.links].sort((a,b)=>b.clicks-a.clicks)[0];
  const avgClicks=totalLinks>0? (totalClicks/totalLinks).toFixed(2) : 0;
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

  {data.links.slice(0,4).map(link => (
    <div
      key={link.shortCode}
      className="bg-[#11161c] border border-gray-800 p-4 rounded-xl"
    >

      <p className="text-green-400 text-sm">{link.shortCode}</p>

      <div className="flex justify-between items-center mt-2">
        <span className="text-xl font-bold">{link.clicks}</span>
      </div>

      <div className="h-10 mt-2 bg-gradient-to-r from-cyan-400 to-green-400 opacity-20 rounded"></div>

    </div>

  ))}

</div>
    )}
    