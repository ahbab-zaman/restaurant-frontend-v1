type DashboardBarGraphProps = {
  data: Array<{ month: string; revenue: number; guests: number }>;
};

export default function DashboardBarGraph({ data }: DashboardBarGraphProps) {
  const peakRevenue = Math.max(...data.map((item) => item.revenue), 1);
  const peakGuests = Math.max(...data.map((item) => item.guests), 1);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-6 gap-2">
        {data.map((item) => {
          const revenueHeight = Math.max(6, Math.round((item.revenue / peakRevenue) * 100));
          const guestHeight = Math.max(6, Math.round((item.guests / peakGuests) * 100));

          return (
            <div key={item.month} className="flex flex-col items-center gap-2">
              <div className="flex h-56 items-end gap-1">
                <div
                  className="w-4 rounded-t bg-[hsl(var(--chart-2))]"
                  style={{ height: `${revenueHeight}%` }}
                  title={`Revenue: ${item.revenue}`}
                />
                <div
                  className="w-4 rounded-t bg-[hsl(var(--chart-4))]"
                  style={{ height: `${guestHeight}%` }}
                  title={`Guests: ${item.guests}`}
                />
              </div>
              <span className="text-xs text-zinc-500">{item.month}</span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-4 text-xs text-zinc-600">
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-[hsl(var(--chart-2))]" />
          Revenue
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-[hsl(var(--chart-4))]" />
          Guests
        </span>
      </div>
    </div>
  );
}
