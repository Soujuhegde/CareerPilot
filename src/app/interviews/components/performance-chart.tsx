"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";

interface Assessment {
  createdAt: string | Date;
  quizScore: number;
}

interface PerformanceChartProps {
  assessments?: Assessment[];
}

interface ChartData {
  date: string;
  score: number;
}

function getBarColor(score: number) {
  if (score >= 80) return "#22c55e"; // green
  if (score >= 50) return "#3E54FF"; // blue
  return "#ef4444"; // red
}

export default function PerformanceChart({ assessments }: PerformanceChartProps) {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (assessments && assessments.length > 0) {
      // Show newest last so chart reads left-to-right chronologically
      const formattedData: ChartData[] = [...assessments]
        .reverse()
        .map((assessment) => ({
          date: format(new Date(assessment.createdAt), "MMM dd HH:mm"),
          score: Math.round(assessment.quizScore),
        }));
      setChartData(formattedData);
    } else {
      setChartData([]);
    }
  }, [assessments]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="gradient-title text-3xl md:text-4xl">
          Performance Trend
        </CardTitle>
        <CardDescription>Your quiz scores over time</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="h-[300px] flex flex-col items-center justify-center gap-3 text-center border-2 border-dashed border-muted-foreground/30 rounded-lg">
            <span className="text-4xl">📈</span>
            <p className="font-black uppercase tracking-widest text-sm text-muted-foreground">
              No quiz data yet
            </p>
            <p className="text-xs text-muted-foreground max-w-xs">
              Complete a quiz from the Mock Interview page to see your performance trend here.
            </p>
          </div>
        ) : (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(0,0,0,0.05)" }}
                  content={({ active, payload }) => {
                    if (active && payload?.length) {
                      return (
                        <div className="bg-background border rounded-lg p-3 shadow-md">
                          <p className="text-sm font-bold">
                            Score: {payload[0].value}%
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {payload[0].payload.date}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="score" radius={[4, 4, 0, 0]} maxBarSize={60}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
