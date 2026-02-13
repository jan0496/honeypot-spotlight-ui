// Mock data for the honeypot dashboard

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

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  protocol: 'SSH' | 'HTTP' | 'FTP' | 'SMB' | 'RDP' | 'DB';
  sourceIp: string;
  isRead: boolean;
}

export interface ProtocolStats {
  protocol: string;
  attacks: number;
  percentage: number;
  color: string;
}

export const summaryStats = {
  totalAttacks: 12847,
  activeThreats: 23,
  monitoredProtocols: 6,
  alertsTriggered: 156,
};

export const protocolStats: ProtocolStats[] = [
  { protocol: 'SSH', attacks: 4521, percentage: 35, color: 'hsl(190, 95%, 50%)' },
  { protocol: 'HTTP', attacks: 3214, percentage: 25, color: 'hsl(280, 90%, 60%)' },
  { protocol: 'FTP', attacks: 1927, percentage: 15, color: 'hsl(142, 76%, 45%)' },
  { protocol: 'SMB', attacks: 1542, percentage: 12, color: 'hsl(38, 92%, 50%)' },
  { protocol: 'RDP', attacks: 1028, percentage: 8, color: 'hsl(0, 84%, 60%)' },
  { protocol: 'DB', attacks: 615, percentage: 5, color: 'hsl(220, 90%, 60%)' },
];

export const recentAttacks: Attack[] = [
  { id: '1', ip: '185.220.101.42', protocol: 'SSH', timestamp: '2024-01-15 14:32:18', severity: 'high', eventType: 'Brute Force', country: 'Russia', port: 22 },
  { id: '2', ip: '103.75.189.201', protocol: 'HTTP', timestamp: '2024-01-15 14:31:45', severity: 'medium', eventType: 'SQL Injection', country: 'China', port: 80 },
  { id: '3', ip: '45.33.32.156', protocol: 'FTP', timestamp: '2024-01-15 14:30:22', severity: 'low', eventType: 'Directory Traversal', country: 'Germany', port: 21 },
  { id: '4', ip: '192.168.45.67', protocol: 'SMB', timestamp: '2024-01-15 14:29:11', severity: 'critical', eventType: 'EternalBlue Exploit', country: 'Unknown', port: 445 },
  { id: '5', ip: '77.91.68.105', protocol: 'RDP', timestamp: '2024-01-15 14:28:33', severity: 'high', eventType: 'Credential Stuffing', country: 'Netherlands', port: 3389 },
  { id: '6', ip: '141.98.11.89', protocol: 'DB', timestamp: '2024-01-15 14:27:01', severity: 'medium', eventType: 'Data Exfiltration', country: 'Romania', port: 3306 },
  { id: '7', ip: '45.155.205.233', protocol: 'SSH', timestamp: '2024-01-15 14:26:44', severity: 'high', eventType: 'SSH Tunnel', country: 'Bulgaria', port: 22 },
  { id: '8', ip: '89.248.167.131', protocol: 'HTTP', timestamp: '2024-01-15 14:25:19', severity: 'low', eventType: 'XSS Attempt', country: 'Netherlands', port: 443 },
];

export const alerts: Alert[] = [
  { id: '1', title: 'Brute Force Attack Detected', description: 'Multiple failed SSH login attempts from single IP', severity: 'critical', timestamp: '2024-01-15 14:32:18', protocol: 'SSH', sourceIp: '185.220.101.42', isRead: false },
  { id: '2', title: 'SQL Injection Attempt', description: 'Malicious SQL payload detected in HTTP request', severity: 'high', timestamp: '2024-01-15 14:31:45', protocol: 'HTTP', sourceIp: '103.75.189.201', isRead: false },
  { id: '3', title: 'SMB Exploit Detected', description: 'EternalBlue vulnerability exploitation attempt', severity: 'critical', timestamp: '2024-01-15 14:29:11', protocol: 'SMB', sourceIp: '192.168.45.67', isRead: true },
  { id: '4', title: 'RDP Credential Attack', description: 'Automated credential stuffing on RDP service', severity: 'high', timestamp: '2024-01-15 14:28:33', protocol: 'RDP', sourceIp: '77.91.68.105', isRead: false },
  { id: '5', title: 'Database Scan Detected', description: 'Unauthorized database enumeration attempt', severity: 'medium', timestamp: '2024-01-15 14:27:01', protocol: 'DB', sourceIp: '141.98.11.89', isRead: true },
  { id: '6', title: 'FTP Anonymous Access', description: 'Anonymous FTP login attempt detected', severity: 'low', timestamp: '2024-01-15 14:26:00', protocol: 'FTP', sourceIp: '45.33.32.156', isRead: true },
];

export const logs: Attack[] = [
  ...recentAttacks,
  { id: '9', ip: '162.142.125.193', protocol: 'SSH', timestamp: '2024-01-15 14:24:55', severity: 'medium', eventType: 'Port Scan', country: 'USA', port: 22 },
  { id: '10', ip: '71.6.199.23', protocol: 'HTTP', timestamp: '2024-01-15 14:23:30', severity: 'low', eventType: 'Bot Traffic', country: 'USA', port: 80 },
  { id: '11', ip: '195.54.160.121', protocol: 'FTP', timestamp: '2024-01-15 14:22:11', severity: 'medium', eventType: 'Credential Brute Force', country: 'Russia', port: 21 },
  { id: '12', ip: '45.129.56.200', protocol: 'SMB', timestamp: '2024-01-15 14:21:00', severity: 'high', eventType: 'Ransomware Probe', country: 'Moldova', port: 445 },
  { id: '13', ip: '185.156.73.54', protocol: 'RDP', timestamp: '2024-01-15 14:20:15', severity: 'critical', eventType: 'BlueKeep Exploit', country: 'Ukraine', port: 3389 },
  { id: '14', ip: '91.92.109.87', protocol: 'DB', timestamp: '2024-01-15 14:19:22', severity: 'high', eventType: 'MongoDB Ransom', country: 'Bulgaria', port: 27017 },
  { id: '15', ip: '194.26.29.156', protocol: 'SSH', timestamp: '2024-01-15 14:18:44', severity: 'medium', eventType: 'Key Exchange Attack', country: 'Russia', port: 22 },
];

export const timelineData = [
  { time: '00:00', attacks: 45 },
  { time: '02:00', attacks: 32 },
  { time: '04:00', attacks: 28 },
  { time: '06:00', attacks: 52 },
  { time: '08:00', attacks: 89 },
  { time: '10:00', attacks: 134 },
  { time: '12:00', attacks: 156 },
  { time: '14:00', attacks: 178 },
  { time: '16:00', attacks: 145 },
  { time: '18:00', attacks: 123 },
  { time: '20:00', attacks: 98 },
  { time: '22:00', attacks: 67 },
];

export const geoData = [
  { country: 'Russia', attacks: 3245, lat: 55.7558, lng: 37.6173 },
  { country: 'China', attacks: 2891, lat: 39.9042, lng: 116.4074 },
  { country: 'USA', attacks: 1567, lat: 38.9072, lng: -77.0369 },
  { country: 'Germany', attacks: 987, lat: 52.5200, lng: 13.4050 },
  { country: 'Netherlands', attacks: 876, lat: 52.3676, lng: 4.9041 },
  { country: 'Brazil', attacks: 654, lat: -23.5505, lng: -46.6333 },
  { country: 'India', attacks: 543, lat: 28.6139, lng: 77.2090 },
  { country: 'Ukraine', attacks: 432, lat: 50.4501, lng: 30.5234 },
];

export const architectureSteps = [
  { id: 1, title: 'Network Entry', description: 'Attacker initiates connection to honeypot services', icon: 'network', path: '/visualization' },
  { id: 2, title: 'Service Emulation', description: 'Low-interaction services respond with fake credentials', icon: 'server', path: '/dashboard' },
  { id: 3, title: 'Activity Logging', description: 'All interactions are captured and timestamped', icon: 'file-text', path: '/logs' },
  { id: 4, title: 'Threat Analysis', description: 'ML models classify attack patterns and severity', icon: 'brain', path: '/dashboard' },
  { id: 5, title: 'Alert Generation', description: 'Real-time notifications for critical threats', icon: 'bell', path: '/alerts' },
  { id: 6, title: 'Dashboard Display', description: 'Visualized insights for security teams', icon: 'monitor', path: '/dashboard' },
];
