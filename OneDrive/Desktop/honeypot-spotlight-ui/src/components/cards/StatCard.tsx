import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; isPositive: boolean };
  variant?: 'default' | 'primary' | 'danger' | 'success' | 'warning';
}

const variants = {
  default: 'border-border',
  primary: 'border-primary/30 bg-primary/5',
  danger: 'border-destructive/30 bg-destructive/5',
  success: 'border-success/30 bg-success/5',
  warning: 'border-warning/30 bg-warning/5',
};

const iconVariants = {
  default: 'bg-secondary text-muted-foreground',
  primary: 'bg-primary/20 text-primary',
  danger: 'bg-destructive/20 text-destructive',
  success: 'bg-success/20 text-success',
  warning: 'bg-warning/20 text-warning',
};

const StatCard = ({ title, value, icon: Icon, trend, variant = 'default' }: StatCardProps) => {
  return (
    <div className={cn(
      "glass-card rounded-xl p-5 border transition-all duration-300 hover:scale-[1.02]",
      variants[variant]
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {trend && (
            <p className={cn(
              "text-sm mt-2 font-medium",
              trend.isPositive ? "text-success" : "text-destructive"
            )}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% from last hour
            </p>
          )}
        </div>
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center",
          iconVariants[variant]
        )}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
