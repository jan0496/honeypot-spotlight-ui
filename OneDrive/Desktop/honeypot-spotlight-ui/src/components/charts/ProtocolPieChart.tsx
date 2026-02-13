import { protocolStats as defaultProtocolStats } from '@/data/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { ProtocolStats } from '@/lib/api';

interface ProtocolPieChartProps {
  protocolStats?: ProtocolStats[];
}

const ProtocolPieChart = ({ protocolStats = defaultProtocolStats }: ProtocolPieChartProps) => {
  return (
    <div className="glass-card rounded-xl border border-border p-5">
      <h3 className="text-lg font-semibold text-foreground mb-4">Protocol Distribution</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={protocolStats}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              dataKey="attacks"
              nameKey="protocol"
            >
              {protocolStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
              formatter={(value: number, name: string) => [`${value.toLocaleString()} attacks`, name]}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => <span className="text-muted-foreground text-sm">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProtocolPieChart;
