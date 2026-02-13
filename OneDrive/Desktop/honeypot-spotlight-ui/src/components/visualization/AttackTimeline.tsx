import { recentAttacks } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const severityStyles = {
  low: { dot: 'bg-success', line: 'border-success/30' },
  medium: { dot: 'bg-warning', line: 'border-warning/30' },
  high: { dot: 'bg-destructive', line: 'border-destructive/30' },
  critical: { dot: 'bg-destructive animate-pulse', line: 'border-destructive/50' },
};

const AttackTimeline = () => {
  return (
    <div className="glass-card rounded-xl border border-border p-5">
      <h3 className="text-lg font-semibold text-foreground mb-4">Attack Timeline</h3>
      
      <div className="relative">
        {recentAttacks.slice(0, 6).map((attack, index) => {
          const styles = severityStyles[attack.severity];
          const isLast = index === 5;
          
          return (
            <div 
              key={attack.id} 
              className="flex gap-4 pb-6 last:pb-0 fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Timeline line and dot */}
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-3 h-3 rounded-full shrink-0 z-10",
                  styles.dot
                )} />
                {!isLast && (
                  <div className={cn(
                    "w-0.5 flex-1 border-l-2 border-dashed",
                    styles.line
                  )} />
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 -mt-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-sm text-primary">{attack.ip}</span>
                  <Badge variant="outline" className="text-xs">
                    {attack.protocol}
                  </Badge>
                </div>
                <p className="text-sm text-foreground mt-1">{attack.eventType}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span>{attack.timestamp}</span>
                  <span>•</span>
                  <span>{attack.country}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttackTimeline;
