import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/cards/StatCard';
import ProtocolChart from '@/components/charts/ProtocolChart';
import ProtocolPieChart from '@/components/charts/ProtocolPieChart';
import TimelineChart from '@/components/charts/TimelineChart';
import AttackTable from '@/components/tables/AttackTable';
import { summaryStats as mockSummaryStats, recentAttacks as mockRecentAttacks, protocolStats as mockProtocolStats } from '@/data/mockData';
import { fetchDashboardStats } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { Shield, AlertTriangle, Activity, Bell, TrendingUp, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
    retry: 1,
    refetchInterval: 30000,
  });

  const summaryStats = data?.summaryStats ?? mockSummaryStats;
  const recentAttacks = data?.recentAttacks?.length ? data.recentAttacks : mockRecentAttacks;
  const protocolStats = data?.protocolStats?.length ? data.protocolStats : mockProtocolStats;

  return (
    <DashboardLayout 
      title="Security Dashboard" 
      subtitle="Real-time threat intelligence and analytics"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Attacks"
          value={summaryStats.totalAttacks}
          icon={Shield}
          variant="primary"
          trend={{ value: 12.5, isPositive: false }}
        />
        <StatCard
          title="Active Threats"
          value={summaryStats.activeThreats}
          icon={AlertTriangle}
          variant="danger"
        />
        <StatCard
          title="Unique Attackers"
          value="3,421"
          icon={Users}
          variant="warning"
        />
        <StatCard
          title="Blocked Today"
          value="847"
          icon={TrendingUp}
          variant="success"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ProtocolChart protocolStats={protocolStats} />
        <ProtocolPieChart protocolStats={protocolStats} />
      </div>

      {/* Timeline Chart */}
      <div className="mb-8">
        <TimelineChart timelineData={data?.timelineData?.length ? data.timelineData : undefined} />
      </div>

      {/* Protocol Stats and Recent IPs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Protocol Summary */}
        <div className="glass-card rounded-xl border border-border p-5">
          <h3 className="text-lg font-semibold text-foreground mb-4">Protocol Summary</h3>
          <div className="space-y-3">
            {protocolStats.map((stat) => (
              <div key={stat.protocol} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: stat.color }}
                  />
                  <span className="text-sm font-medium text-foreground">{stat.protocol}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{stat.attacks.toLocaleString()}</span>
                  <Badge variant="outline" className="text-xs">
                    {stat.percentage}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Attacker IPs */}
        <div className="lg:col-span-2 glass-card rounded-xl border border-border p-5">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Attacker IPs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recentAttacks.slice(0, 6).map((attack, index) => (
              <div 
                key={attack.id}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border",
                  "hover:border-primary/30 transition-all duration-200 fade-in"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div>
                  <p className="font-mono text-sm text-foreground">{attack.ip}</p>
                  <p className="text-xs text-muted-foreground">{attack.country}</p>
                </div>
                <Badge 
                  variant="outline" 
                  className={cn(
                    attack.severity === 'critical' && 'bg-destructive text-destructive-foreground border-destructive',
                    attack.severity === 'high' && 'bg-destructive/20 text-destructive border-destructive/30',
                    attack.severity === 'medium' && 'bg-warning/20 text-warning border-warning/30',
                    attack.severity === 'low' && 'bg-success/20 text-success border-success/30'
                  )}
                >
                  {attack.severity}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Attacks Table */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Attack Events</h3>
        <AttackTable attacks={recentAttacks} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
