export default function TopLinksSection({ data }) {

  if (!data || !data.links) {
    return <p className="text-gray-400">Loading...</p>;
  }

  const sorted = [...data.links].sort((a, b) => b.clicks - a.clicks);

  return (
    <div className="bg-[#11161c] border border-gray-800 p-6 rounded-xl mb-6">

      <p className="text-xs text-gray-400 mb-4">
        TOP LINKS BY CLICKS
      </p>

      {sorted.map((link) => (
        <div key={link.shortCode} className="mb-4">

          <div className="flex justify-between text-sm">
            <span className="text-green-400">{link.shortCode}</span>
            <span>{link.clicks}</span>
          </div>

          <div className="w-full h-2 bg-gray-800 rounded mt-1">
            <div
              className="h-2 bg-cyan-400 rounded"
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