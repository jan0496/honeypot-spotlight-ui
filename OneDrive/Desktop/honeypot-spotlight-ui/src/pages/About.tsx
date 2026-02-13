import DashboardLayout from '@/components/layout/DashboardLayout';
import { architectureSteps } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Network, 
  Server, 
  FileText, 
  Brain, 
  Bell, 
  Monitor,
  Shield,
  Zap,
  Lock,
  Users,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, any> = {
  network: Network,
  server: Server,
  'file-text': FileText,
  brain: Brain,
  bell: Bell,
  monitor: Monitor,
};

const features = [
  {
    icon: Zap,
    title: 'Low Interaction',
    description: 'Minimal resource footprint with maximum detection capability',
    color: 'text-primary',
    bg: 'bg-primary/20',
  },
  {
    icon: Lock,
    title: 'Easy Deployment',
    description: 'Quick setup with Docker containers or standalone binaries',
    color: 'text-success',
    bg: 'bg-success/20',
  },
  {
    icon: Users,
    title: 'SMB Friendly',
    description: 'Designed specifically for small and medium business networks',
    color: 'text-warning',
    bg: 'bg-warning/20',
  },
];

const protocols = [
  { name: 'SSH', port: 22, description: 'Secure Shell - Command line access attacks' },
  { name: 'HTTP/S', port: '80/443', description: 'Web traffic - SQL injection, XSS attacks' },
  { name: 'FTP', port: 21, description: 'File Transfer - Directory traversal attacks' },
  { name: 'SMB', port: 445, description: 'Windows shares - Ransomware, EternalBlue' },
  { name: 'RDP', port: 3389, description: 'Remote Desktop - Credential attacks' },
  { name: 'Database', port: '3306/27017', description: 'MySQL/MongoDB - Data exfiltration' },
];

const About = () => {
  return (
    <DashboardLayout 
      title="System Architecture" 
      subtitle="Understanding the honeypot detection system"
    >
      {/* Hero Section */}
      <div className="glass-card rounded-2xl border border-primary/20 p-8 mb-8 gradient-cyber">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center cyber-glow">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Smart Low-Interaction Honeypot</h2>
            <p className="text-muted-foreground">Advanced Cyber Threat Detection for SMB Networks</p>
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          This system deploys decoy services that mimic real network protocols, attracting and logging 
          malicious activity without exposing actual systems. The low-interaction design ensures minimal 
          resource usage while capturing valuable threat intelligence for proactive defense.
        </p>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {features.map((feature, index) => (
          <div 
            key={feature.title}
            className="glass-card rounded-xl border border-border p-6 hover:border-primary/30 transition-all duration-300 fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", feature.bg)}>
              <feature.icon className={cn("w-6 h-6", feature.color)} />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Architecture Flow */}
      <div className="glass-card rounded-xl border border-border p-6 mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-6">System Architecture Flow</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {architectureSteps.map((step, index) => {
            const Icon = iconMap[step.icon] || Shield;
            const isLast = index === architectureSteps.length - 1;
            
            return (
              <div 
                key={step.id}
                className="relative fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link
                  to={step.path}
                  className="block p-5 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 hover:bg-secondary/70 transition-all duration-300 h-full cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                      Step {step.id}
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </Link>
                
                {/* Connector Arrow (visible on lg screens) */}
                {!isLast && index !== 2 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Monitored Protocols */}
      <div className="glass-card rounded-xl border border-border p-6 mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-6">Monitored Protocols</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {protocols.map((protocol, index) => (
            <div 
              key={protocol.name}
              className="p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary/30 transition-all duration-200 fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-foreground">{protocol.name}</span>
                <Badge variant="outline" className="font-mono text-xs">
                  Port {protocol.port}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{protocol.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="glass-card rounded-xl border border-border p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6">Key Benefits</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Early threat detection before attacks reach production systems',
            'Zero false positives - any interaction is inherently suspicious',
            'Valuable threat intelligence for security team response',
            'Low maintenance with automated logging and alerting',
            'Compliance support with detailed audit trails',
            'Cost-effective security layer for SMB budgets',
          ].map((benefit, index) => (
            <div 
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg bg-success/5 border border-success/20 fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default About;
