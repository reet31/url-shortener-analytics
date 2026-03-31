export default function PerformanceCard() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

  {[
    { name: "lnk.io/xK9mP", clicks: 1482 },
    { name: "lnk.io/aB3wQ", clicks: 876 },
    { name: "lnk.io/rT7nL", clicks: 2301 },
    { name: "lnk.io/mZ2pD", clicks: 412 },
  ].map((l, i) => (
    <div
      key={i}
      className="bg-[#11161c] border border-gray-800 p-4 rounded-xl"
    >

      <p className="text-green-400 text-sm">{l.name}</p>

      <div className="flex justify-between items-center mt-2">
        <span className="text-xl font-bold">{l.clicks}</span>
      </div>

      <div className="h-10 mt-2 bg-gradient-to-r from-cyan-400 to-green-400 opacity-20 rounded"></div>

    </div>
  ))}

</div>
    )}
    