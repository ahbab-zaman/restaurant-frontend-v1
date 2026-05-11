type DashboardBarGraphProps = {
  data: Array<{ month: string; revenue: number; guests: number }>;
};

export default function DashboardBarGraph({ data }: DashboardBarGraphProps) {
  if (!data.length) {
    return <p className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-10 text-center text-sm text-zinc-500">No monthly data available.</p>;
  }

  const peakRevenue = Math.max(...data.map((item) => item.revenue), 1);
  const peakGuests = Math.max(...data.map((item) => item.guests), 1);
  const minTrackWidth = Math.max(data.length * 72, 320);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto pb-2">
        <div className="rounded-2xl border border-zinc-200/80 bg-gradient-to-b from-zinc-50 to-white p-4 shadow-inner" style={{ minWidth: `${minTrackWidth}px` }}>
          <div className="mb-3 grid h-56 items-end border-b border-zinc-200/70 bg-[linear-gradient(to_top,rgba(24,24,27,0.04)_1px,transparent_1px)] bg-[size:100%_25%] pb-2" style={{ gridTemplateColumns: `repeat(${data.length}, minmax(56px, 1fr))` }}>
        {data.map((item) => {
          const revenueHeight = Math.max(6, Math.round((item.revenue / peakRevenue) * 100));
          const guestHeight = Math.max(6, Math.round((item.guests / peakGuests) * 100));

          return (
            <div key={item.month} className="flex flex-col items-center gap-2 px-1">
              <div className="flex h-full items-end gap-1">
                <div
                  className="w-4 rounded-t-md bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-[0_6px_18px_rgba(5,150,105,0.35)]"
                  style={{ height: `${revenueHeight}%` }}
                  title={`Revenue: $${item.revenue.toLocaleString()}`}
                />
                <div
                  className="w-4 rounded-t-md bg-gradient-to-t from-zinc-700 to-zinc-500 shadow-[0_6px_14px_rgba(63,63,70,0.25)]"
                  style={{ height: `${guestHeight}%` }}
                  title={`Guests: ${item.guests}`}
                />
              </div>
              <span className="text-xs font-medium text-zinc-600">{item.month}</span>
            </div>
          );
        })}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 text-xs text-zinc-600">
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          Revenue
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-zinc-600" />
          Guests
        </span>
      </div>
    </div>
  );
}
