import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Shield, 
  Activity, 
  Bell, 
  FileText, 
  Info,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Overview', icon: LayoutDashboard },
  { path: '/dashboard', label: 'Dashboard', icon: Activity },
  { path: '/visualization', label: 'Attack Map', icon: Shield },
  { path: '/alerts', label: 'Alerts', icon: Bell },
  { path: '/logs', label: 'Logs', icon: FileText },
  { path: '/about', label: 'Architecture', icon: Info },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 z-50 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                isActive 
                  ? "bg-primary/10 text-primary border border-primary/30" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )} />
              {!collapsed && (
                <span className="text-sm font-medium fade-in">{item.label}</span>
              )}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary pulse-dot" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Button */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          {!collapsed && <span className="text-sm">Collapse</span>}
        </button>
      </div>

      {/* Status Indicator */}
      {!collapsed && (
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-success/10 border border-success/30">
            <div className="w-2 h-2 rounded-full bg-success pulse-dot" />
            <span className="text-xs text-success font-medium">System Active</span>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
