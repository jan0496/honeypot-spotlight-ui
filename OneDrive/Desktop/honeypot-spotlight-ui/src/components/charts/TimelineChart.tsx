import { timelineData as defaultTimelineData } from '@/data/mockData';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface TimelineChartProps {
  timelineData?: Array<{ time: string; attacks: number }>;
}

const TimelineChart = ({ timelineData = defaultTimelineData }: TimelineChartProps) => {
  return (
    <div className="glass-card rounded-xl border border-border p-5">
      <h3 className="text-lg font-semibold text-foreground mb-4">Attack Timeline (24h)</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={timelineData}>
            <defs>
              <linearGradient id="attackGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(190, 95%, 50%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(190, 95%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              width={40}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              formatter={(value: number) => [`${value} attacks`, 'Count']}
            />
            <Area
              type="monotone"
              dataKey="attacks"
              stroke="hsl(190, 95%, 50%)"
              strokeWidth={2}
              fill="url(#attackGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TimelineChart;
