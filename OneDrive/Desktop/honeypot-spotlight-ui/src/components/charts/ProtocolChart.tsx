import { protocolStats as defaultProtocolStats } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { ProtocolStats } from '@/lib/api';

interface ProtocolChartProps {
  protocolStats?: ProtocolStats[];
}

const ProtocolChart = ({ protocolStats = defaultProtocolStats }: ProtocolChartProps) => {
  return (
    <div className="glass-card rounded-xl border border-border p-5">
      <h3 className="text-lg font-semibold text-foreground mb-4">Attack Distribution by Protocol</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={protocolStats} layout="vertical">
            <XAxis type="number" hide />
            <YAxis 
              type="category" 
              dataKey="protocol" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 500 }}
              width={50}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              formatter={(value: number) => [`${value.toLocaleString()} attacks`, 'Count']}
            />
            <Bar 
              dataKey="attacks" 
              radius={[0, 6, 6, 0]}
              barSize={24}
            >
              {protocolStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProtocolChart;
