import DashboardLayout from '@/components/layout/DashboardLayout';
import AlertCard from '@/components/cards/AlertCard';
import { alerts } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Filter, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type SeverityFilter = 'all' | 'critical' | 'high' | 'medium' | 'low';

const Alerts = () => {
  const [filter, setFilter] = useState<SeverityFilter>('all');

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(a => a.severity === filter);

  const alertCounts = {
    all: alerts.length,
    critical: alerts.filter(a => a.severity === 'critical').length,
    high: alerts.filter(a => a.severity === 'high').length,
    medium: alerts.filter(a => a.severity === 'medium').length,
    low: alerts.filter(a => a.severity === 'low').length,
  };

  const unreadCount = alerts.filter(a => !a.isRead).length;

  return (
    <DashboardLayout 
      title="Security Alerts" 
      subtitle="Review and manage threat notifications"
    >
      {/* Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass-card rounded-xl border border-border p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
            <Bell className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Alerts</p>
            <p className="text-2xl font-bold text-foreground">{alerts.length}</p>
          </div>
        </div>
        <div className="glass-card rounded-xl border border-destructive/30 p-4 flex items-center gap-4 gradient-danger">
          <div className="w-12 h-12 rounded-lg bg-destructive/20 flex items-center justify-center">
            <XCircle className="w-6 h-6 text-destructive" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Critical</p>
            <p className="text-2xl font-bold text-destructive">{alertCounts.critical}</p>
          </div>
        </div>
        <div className="glass-card rounded-xl border border-warning/30 p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-warning" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Unread</p>
            <p className="text-2xl font-bold text-warning">{unreadCount}</p>
          </div>
        </div>
        <div className="glass-card rounded-xl border border-success/30 p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-success" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Resolved</p>
            <p className="text-2xl font-bold text-success">{alerts.length - unreadCount}</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filter by severity:</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'critical', 'high', 'medium', 'low'] as SeverityFilter[]).map((severity) => (
            <Button
              key={severity}
              variant="outline"
              size="sm"
              onClick={() => setFilter(severity)}
              className={cn(
                "capitalize transition-all",
                filter === severity && "bg-primary/20 border-primary text-primary"
              )}
            >
              {severity}
              <Badge variant="secondary" className="ml-2">
                {alertCounts[severity]}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert, index) => (
            <div 
              key={alert.id}
              className="fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <AlertCard alert={alert} />
            </div>
          ))
        ) : (
          <div className="glass-card rounded-xl border border-border p-12 text-center">
            <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Alerts Found</h3>
            <p className="text-muted-foreground">No alerts match the current filter criteria.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Alerts;
