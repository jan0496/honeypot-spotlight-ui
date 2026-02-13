import { Attack } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface AttackTableProps {
  attacks: Attack[];
  compact?: boolean;
}

const severityStyles = {
  low: 'bg-success/20 text-success border-success/30',
  medium: 'bg-warning/20 text-warning border-warning/30',
  high: 'bg-destructive/20 text-destructive border-destructive/30',
  critical: 'bg-destructive text-destructive-foreground border-destructive',
};

const protocolColors: Record<string, string> = {
  SSH: 'text-primary',
  HTTP: 'text-purple-400',
  FTP: 'text-success',
  SMB: 'text-warning',
  RDP: 'text-destructive',
  DB: 'text-blue-400',
};

const AttackTable = ({ attacks, compact = false }: AttackTableProps) => {
  return (
    <div className="glass-card rounded-xl border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground font-semibold">Time</TableHead>
            <TableHead className="text-muted-foreground font-semibold">IP Address</TableHead>
            <TableHead className="text-muted-foreground font-semibold">Protocol</TableHead>
            {!compact && (
              <>
                <TableHead className="text-muted-foreground font-semibold">Event Type</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Country</TableHead>
              </>
            )}
            <TableHead className="text-muted-foreground font-semibold">Severity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attacks.map((attack, index) => (
            <TableRow 
              key={attack.id} 
              className={cn(
                "border-border hover:bg-secondary/50 transition-colors",
                index === 0 && "fade-in"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TableCell className="font-mono text-sm text-muted-foreground">
                {attack.timestamp.split(' ')[1]}
              </TableCell>
              <TableCell className="font-mono text-sm text-foreground">
                {attack.ip}
              </TableCell>
              <TableCell>
                <span className={cn("font-semibold text-sm", protocolColors[attack.protocol])}>
                  {attack.protocol}
                </span>
              </TableCell>
              {!compact && (
                <>
                  <TableCell className="text-sm text-foreground">
                    {attack.eventType}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {attack.country}
                  </TableCell>
                </>
              )}
              <TableCell>
                <Badge variant="outline" className={severityStyles[attack.severity]}>
                  {attack.severity.toUpperCase()}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttackTable;
