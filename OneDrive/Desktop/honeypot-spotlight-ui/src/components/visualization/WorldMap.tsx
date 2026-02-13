import { geoData } from '@/data/mockData';
import { cn } from '@/lib/utils';

const WorldMap = () => {
  const maxAttacks = Math.max(...geoData.map(d => d.attacks));

  return (
    <div className="glass-card rounded-xl border border-border p-5">
      <h3 className="text-lg font-semibold text-foreground mb-4">Global Attack Origins</h3>
      
      {/* Simplified world map visualization */}
      <div className="relative h-80 bg-secondary/50 rounded-lg overflow-hidden">
        {/* Grid lines for visual effect */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border) / 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
        
        {/* Attack hotspots */}
        {geoData.map((location, index) => {
          const size = (location.attacks / maxAttacks) * 60 + 20;
          const intensity = location.attacks / maxAttacks;
          
          // Simple lat/lng to percentage mapping
          const x = ((location.lng + 180) / 360) * 100;
          const y = ((90 - location.lat) / 180) * 100;
          
          return (
            <div
              key={location.country}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {/* Pulse ring */}
              <div 
                className="absolute rounded-full animate-ping"
                style={{
                  width: size,
                  height: size,
                  left: -size / 2,
                  top: -size / 2,
                  backgroundColor: `hsl(0, 84%, 60%, ${intensity * 0.3})`,
                  animationDelay: `${index * 200}ms`,
                  animationDuration: '2s',
                }}
              />
              
              {/* Main dot */}
              <div 
                className={cn(
                  "rounded-full transition-transform duration-300 group-hover:scale-150",
                  intensity > 0.7 ? "bg-destructive cyber-glow-danger" :
                  intensity > 0.4 ? "bg-warning" : "bg-primary cyber-glow"
                )}
                style={{ width: 12, height: 12 }}
              />
              
              {/* Tooltip */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-xl whitespace-nowrap">
                  <p className="font-semibold text-foreground text-sm">{location.country}</p>
                  <p className="text-xs text-muted-foreground">{location.attacks.toLocaleString()} attacks</p>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-2 font-medium">Attack Intensity</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">Low</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span className="text-xs text-muted-foreground">Medium</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <span className="text-xs text-muted-foreground">High</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
