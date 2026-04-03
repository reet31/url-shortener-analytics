export default function AnalyticsChart({ data }) {
  const values = [10, 25, 8, 15, 20, 18, 30];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="bg-[#11161c] border border-gray-800 rounded-xl p-6 mb-6">

      <p className="text-xs text-gray-400 mb-2 tracking-widest">
        CLICK VOLUME - LAST 7 DAYS
      </p>

      <div className="flex items-end justify-between h-40 mt-6">

        {values.map((value, index) => (
          <div key={index} className="flex flex-col items-center gap-2">

            <div
              className="w-6 bg-green-400 rounded"
              style={{ height: `${value * 3}px` }}
            ></div>

            <span className="text-xs text-gray-400">
              {days[index]}
            </span>

          </div>
        ))}

      </div>
    </div>
  );
}