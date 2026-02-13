import { Alert } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AlertTriangle, Clock, Globe, Server } from 'lucide-react';

interface AlertCardProps {
  alert: Alert;
}

const severityStyles = {
  low: { bg: 'bg-success/10', border: 'border-success/30', text: 'text-success', badge: 'bg-success/20 text-success border-success/30' },
  medium: { bg: 'bg-warning/10', border: 'border-warning/30', text: 'text-warning', badge: 'bg-warning/20 text-warning border-warning/30' },
  high: { bg: 'bg-destructive/10', border: 'border-destructive/30', text: 'text-destructive', badge: 'bg-destructive/20 text-destructive border-destructive/30' },
  critical: { bg: 'bg-destructive/20', border: 'border-destructive/50', text: 'text-destructive', badge: 'bg-destructive text-destructive-foreground border-destructive' },
};

const protocolIcons: Record<string, string> = {
  SSH: '🔐',
  HTTP: '🌐',
  FTP: '📁',
  SMB: '💼',
  RDP: '🖥️',
  DB: '🗄️',
};

const AlertCard = ({ alert }: AlertCardProps) => {
  const styles = severityStyles[alert.severity];

  return (
    <div className={cn(
      "glass-card rounded-xl p-4 border transition-all duration-300 hover:scale-[1.01]",
      styles.border,
      !alert.isRead && "animate-pulse-border"
    )}>
      <div className="flex items-start gap-4">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
          styles.bg
        )}>
          <AlertTriangle className={cn("w-5 h-5", styles.text)} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-foreground">{alert.title}</h3>
            <Badge variant="outline" className={styles.badge}>
              {alert.severity.toUpperCase()}
            </Badge>
            {!alert.isRead && (
              <span className="w-2 h-2 rounded-full bg-primary pulse-dot" />
            )}
          </div>
          
          <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
          
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {alert.timestamp}
            </span>
            <span className="flex items-center gap-1">
              <Server className="w-3.5 h-3.5" />
              {protocolIcons[alert.protocol]} {alert.protocol}
            </span>
            <span className="flex items-center gap-1 font-mono">
              <Globe className="w-3.5 h-3.5" />
              {alert.sourceIp}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
