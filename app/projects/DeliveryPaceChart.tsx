"use client";

import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Point = { name: string; villas: number; reno: number };

function PaceTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const villas = payload.find((p: any) => p.dataKey === "villas")?.value ?? 0;
  const reno = payload.find((p: any) => p.dataKey === "reno")?.value ?? 0;
  const total = villas + reno;

  return (
    <div className="rounded-md border bg-white p-2 text-xs shadow-sm">
      <div className="font-semibold">{label}</div>
      <div className="mt-1 space-y-0.5">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: "#958f39" }}
          />
          Villas: <span className="font-medium">{villas}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: "#8884d8" }}
          />
          Renovations: <span className="font-medium">{reno}</span>
        </div>
        <div className="pt-1 text-[11px] text-zinc-500">
          Total: {total} projects
        </div>
      </div>
    </div>
  );
}

export default function DeliveryPaceChart({
  data,
  title = "Delivery pace",
  caption = "Each point shows the number of projects completed in that period.",
}: {
  data: Point[];
  title?: string;
  caption?: string;
}) {
  const last = data?.[data.length - 1];
  const total = last ? last.villas + last.reno : 0;

  return (
    <Card className="p-4 md:p-5">
      {/* Header + quick summary */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">{title}</div>
          <p className="text-xs text-zinc-500">{caption}</p>
        </div>

        {last && (
          <div className="text-right">
            <div className="text-[11px] text-zinc-500">
              Last period ({last.name})
            </div>
            <div className="text-sm font-bold">{total} projects</div>
            <div className="text-[11px] text-zinc-500">
              <span className="inline-flex items-center">
                <span
                  className="mr-1 inline-block h-2 w-2 rounded-full"
                  style={{ background: "#958f39" }}
                />
                Villas: {last.villas}
              </span>{" "}
              ·{" "}
              <span className="inline-flex items-center">
                <span
                  className="mx-1 inline-block h-2 w-2 rounded-full"
                  style={{ background: "#8884d8" }}
                />
                Renovations: {last.reno}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Chart */}
      <div
        className="h-60"
        role="img"
        aria-label="Line chart showing completed villas and renovations by period"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} tickFormatter={(v) => `${v}`} />
            <Tooltip content={<PaceTooltip />} />
            <Line
              type="monotone"
              dataKey="villas"
              name="Villas"
              stroke="#958f39"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="reno"
              name="Renovations"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
