/**
 * API client for honeypot backend
 * Requests are proxied via Vite to http://localhost:5000
 */

export interface Attack {
  id: string;
  ip: string;
  protocol: 'SSH' | 'HTTP' | 'FTP' | 'SMB' | 'RDP' | 'DB';
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  eventType: string;
  country: string;
  port: number;
}

export interface ProtocolStats {
  protocol: string;
  attacks: number;
  percentage: number;
  color: string;
}

export interface DashboardStats {
  summaryStats: {
    totalAttacks: number;
    activeThreats: number;
    monitoredProtocols: number;
    alertsTriggered: number;
  };
  protocolStats: ProtocolStats[];
  recentAttacks: Attack[];
  geoData: Array<{ country: string; attacks: number; lat: number; lng: number }>;
  timelineData: Array<{ time: string; attacks: number }>;
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const res = await fetch('/api/dashboard/stats');
  if (!res.ok) throw new Error('Failed to fetch dashboard stats');
  return res.json();
}

export async function fetchLogs(): Promise<Attack[]> {
  const res = await fetch('/api/logs');
  if (!res.ok) throw new Error('Failed to fetch logs');
  return res.json();
}
