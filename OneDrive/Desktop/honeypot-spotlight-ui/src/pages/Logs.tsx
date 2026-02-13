import DashboardLayout from '@/components/layout/DashboardLayout';
import AttackTable from '@/components/tables/AttackTable';
import { logs as mockLogs } from '@/data/mockData';
import { fetchLogs } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  FileText,
  Calendar,
  Server
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const Logs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [protocolFilter, setProtocolFilter] = useState<string>('all');

  const { data: apiLogs, refetch } = useQuery({
    queryKey: ['logs'],
    queryFn: fetchLogs,
    retry: 1,
    refetchInterval: 30000,
  });

  const logs = apiLogs ?? mockLogs;
  const protocols = ['all', 'SSH', 'HTTP', 'FTP', 'SMB', 'RDP', 'DB'];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.ip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.eventType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.country.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesProtocol = protocolFilter === 'all' || log.protocol === protocolFilter;
    
    return matchesSearch && matchesProtocol;
  });

  return (
    <DashboardLayout 
      title="System Logs" 
      subtitle="Unified event logging and analysis"
    >
      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="glass-card rounded-xl border border-border p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Entries</p>
            <p className="text-2xl font-bold text-foreground">{logs.length.toLocaleString()}</p>
          </div>
        </div>
        <div className="glass-card rounded-xl border border-border p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-warning" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Time Range</p>
            <p className="text-2xl font-bold text-foreground">24 Hours</p>
          </div>
        </div>
        <div className="glass-card rounded-xl border border-border p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center">
            <Server className="w-6 h-6 text-success" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Protocols</p>
            <p className="text-2xl font-bold text-foreground">{protocols.length - 1}</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="glass-card rounded-xl border border-border p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by IP, event type, or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>

          {/* Protocol Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {protocols.map((protocol) => (
              <Button
                key={protocol}
                variant="outline"
                size="sm"
                onClick={() => setProtocolFilter(protocol)}
                className={cn(
                  "transition-all",
                  protocolFilter === protocol && "bg-primary/20 border-primary text-primary"
                )}
              >
                {protocol === 'all' ? 'All' : protocol}
              </Button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={() => refetch()}>
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{filteredLogs.length}</span> of{' '}
          <span className="font-medium text-foreground">{logs.length}</span> entries
        </p>
        {searchQuery && (
          <Badge variant="outline" className="gap-2">
            Search: "{searchQuery}"
            <button 
              onClick={() => setSearchQuery('')}
              className="hover:text-foreground"
            >
              ×
            </button>
          </Badge>
        )}
      </div>

      {/* Logs Table */}
      {filteredLogs.length > 0 ? (
        <AttackTable attacks={filteredLogs} />
      ) : (
        <div className="glass-card rounded-xl border border-border p-12 text-center">
          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Logs Found</h3>
          <p className="text-muted-foreground">
            No log entries match your search criteria. Try adjusting your filters.
          </p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Logs;
