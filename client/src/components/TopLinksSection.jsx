export default function TopLinksSection({ data }) {

  if (!data || !data.links) {
    return <p className="text-gray-400">Loading...</p>;
  }

  const sorted = [...data.links].sort((a, b) => b.clicks - a.clicks);

  return (
    <div className="bg-[#1a1510] border border-[#2a2318] p-6 rounded-xl mb-6">

      <p className="text-xs text-[#a09070] mb-4">
        TOP LINKS BY CLICKS
      </p>

      {sorted.map((link) => (
        <div key={link.shortCode} className="mb-4">

          <div className="flex justify-between text-sm">
            <span className="text-[#a09070]">{link.shortCode}</span>
            <span>{link.clicks}</span>
          </div>

          <div className="w-full h-2 bg-[#d4a853] rounded mt-1">
            <div
              className="h-2 bg-[#2a2318] rounded"
              style={{
                width: `${Math.min(link.clicks * 10, 100)}%`
              }}
            ></div>
          </div>

        </div>
      ))}

    </div>
  );
}