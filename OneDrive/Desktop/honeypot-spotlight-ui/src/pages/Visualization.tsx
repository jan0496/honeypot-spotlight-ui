import DashboardLayout from '@/components/layout/DashboardLayout';
import WorldMap from '@/components/visualization/WorldMap';
import AttackTimeline from '@/components/visualization/AttackTimeline';
import TimelineChart from '@/components/charts/TimelineChart';
import { geoData, timelineData } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Globe, Clock, TrendingUp, AlertTriangle } from 'lucide-react';

const Visualization = () => {
  const totalAttacks = geoData.reduce((sum, d) => sum + d.attacks, 0);
  const topCountry = geoData.reduce((max, d) => d.attacks > max.attacks ? d : max, geoData[0]);
  const peakHour = timelineData.reduce((max, d) => d.attacks > max.attacks ? d : max, timelineData[0]);

  return (
    <DashboardLayout 
      title="Attack Visualization" 
      subtitle="Geographic and temporal threat analysis"
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass-card rounded-xl border border-border p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
            <Globe className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Countries</p>
            <p className="text-xl font-bold text-foreground">{geoData.length}</p>
          </div>
        </div>
        <div className="glass-card rounded-xl border border-border p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-destructive/20 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Attacks</p>
            <p className="text-xl font-bold text-foreground">{totalAttacks.toLocaleString()}</p>
          </div>
        </div>
        <div className="glass-card rounded-xl border border-border p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-warning" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Top Origin</p>
            <p className="text-xl font-bold text-foreground">{topCountry.country}</p>
          </div>
        </div>
        <div className="glass-card rounded-xl border border-border p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center">
            <Clock className="w-6 h-6 text-success" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Peak Hour</p>
            <p className="text-xl font-bold text-foreground">{peakHour.time}</p>
          </div>
        </div>
      </div>

      {/* World Map */}
      <div className="mb-8">
        <WorldMap />
      </div>

      {/* Timeline and Attack List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <TimelineChart />
        </div>
        <div>
          <AttackTimeline />
        </div>
      </div>

      {/* Country Breakdown */}
      <div className="glass-card rounded-xl border border-border p-5">
        <h3 className="text-lg font-semibold text-foreground mb-4">Attack Origins by Country</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {geoData.map((country, index) => {
            const percentage = ((country.attacks / totalAttacks) * 100).toFixed(1);
            return (
              <div 
                key={country.country}
                className="p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary/30 transition-all duration-200 fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{country.country}</span>
                  <Badge variant="outline">{percentage}%</Badge>
                </div>
                <p className="text-2xl font-bold text-primary">{country.attacks.toLocaleString()}</p>
                <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Visualization;
