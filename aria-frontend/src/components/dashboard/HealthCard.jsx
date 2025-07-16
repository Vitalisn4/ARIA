import React from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { BedDouble } from "lucide-react";
import Card from "../ui/Card";

const HealthCard = ({ healthData }) => {
  const sleepHours = healthData
    ? (healthData.averageSleepMinutes / 60).toFixed(1)
    : 0;
  const data = [{ name: "Avg Sleep", hours: sleepHours }];

  return (
    <Card icon={<BedDouble />} title="Health Summary">
      <p className="text-slate-300 mb-4 text-sm">
        Your average sleep over the last 7 days is{" "}
        <span className="font-bold text-cyan-400">{sleepHours} hours</span>.
      </p>
      <div className="h-20">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
          >
            <XAxis type="number" hide domain={[0, 10]} />
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.2)" }}
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "none",
                borderRadius: "0.5rem",
              }}
            />
            <Bar
              dataKey="hours"
              fill="var(--cyan-400)"
              barSize={20}
              radius={[0, 10, 10, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
export default HealthCard;
