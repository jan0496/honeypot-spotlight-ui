import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/cards/StatCard';
import AttackTable from '@/components/tables/AttackTable';
import { summaryStats, recentAttacks } from '@/data/mockData';
import { Shield, AlertTriangle, Activity, Bell, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <DashboardLayout 
      title="Smart Honeypot System" 
      subtitle="Low-Interaction Threat Detection for SMB Networks"
    >
      {/* Hero Section */}
      <div className="glass-card rounded-2xl border border-primary/20 p-8 mb-8 gradient-cyber scan-line">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center cyber-glow">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">HoneyTrap Defense System</h2>
                <p className="text-muted-foreground">Real-time cyber threat monitoring & analysis</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              An intelligent, low-interaction honeypot system designed specifically for Small and Medium Businesses. 
              Detect, analyze, and respond to cyber threats before they impact your network.
            </p>
          </div>
          <Link to="/dashboard">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-6">
              <Zap className="w-4 h-4" />
              View Full Dashboard
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Attacks Detected"
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
          trend={{ value: 8.2, isPositive: false }}
        />
        <StatCard
          title="Monitored Protocols"
          value={summaryStats.monitoredProtocols}
          icon={Activity}
          variant="success"
        />
        <StatCard
          title="Alerts Triggered"
          value={summaryStats.alertsTriggered}
          icon={Bell}
          variant="warning"
          trend={{ value: 23.1, isPositive: false }}
        />
      </div>

      {/* Live Attack Feed */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold text-foreground">Live Attack Feed</h3>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/20 border border-destructive/30">
              <div className="w-2 h-2 rounded-full bg-destructive pulse-dot" />
              <span className="text-xs font-medium text-destructive">LIVE</span>
            </div>
          </div>
          <Link to="/logs">
            <Button variant="outline" size="sm" className="gap-2">
              View All Logs
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <AttackTable attacks={recentAttacks.slice(0, 5)} compact />
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/visualization" className="group">
          <div className="glass-card rounded-xl border border-border p-5 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-3 group-hover:cyber-glow transition-shadow">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-semibold text-foreground mb-1">Attack Visualization</h4>
            <p className="text-sm text-muted-foreground">View global attack patterns and timeline analysis</p>
          </div>
        </Link>
        <Link to="/alerts" className="group">
          <div className="glass-card rounded-xl border border-border p-5 hover:border-warning/50 transition-all duration-300 hover:scale-[1.02]">
            <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center mb-3">
              <Bell className="w-5 h-5 text-warning" />
            </div>
            <h4 className="font-semibold text-foreground mb-1">Security Alerts</h4>
            <p className="text-sm text-muted-foreground">Review critical alerts and threat notifications</p>
          </div>
        </Link>
        <Link to="/about" className="group">
          <div className="glass-card rounded-xl border border-border p-5 hover:border-success/50 transition-all duration-300 hover:scale-[1.02]">
            <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center mb-3">
              <Shield className="w-5 h-5 text-success" />
            </div>
            <h4 className="font-semibold text-foreground mb-1">System Architecture</h4>
            <p className="text-sm text-muted-foreground">Learn how the honeypot system works</p>
          </div>
        </Link>
      </div>
    </DashboardLayout>
  );
};

export default Index;
