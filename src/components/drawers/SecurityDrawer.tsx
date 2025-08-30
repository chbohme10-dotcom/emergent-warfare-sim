import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Lock, 
  Key, 
  Shield, 
  AlertTriangle,
  Eye,
  EyeOff,
  Hash,
  FileText,
  Zap,
  Search,
  Cpu,
  Clock
} from 'lucide-react';

interface SecurityDrawerProps {
  onClose: () => void;
}

export const SecurityDrawer: React.FC<SecurityDrawerProps> = ({ onClose }) => {
  const [hashInput, setHashInput] = useState('');
  const [cracking, setCracking] = useState(false);

  const vulnerabilities = [
    {
      id: 'CVE-2023-1234',
      severity: 'Critical',
      target: '192.168.1.15',
      service: 'SSH',
      description: 'Remote code execution vulnerability'
    },
    {
      id: 'CVE-2023-5678', 
      severity: 'High',
      target: '192.168.1.23',
      service: 'Web Server',
      description: 'SQL injection vulnerability'
    },
    {
      id: 'CVE-2023-9012',
      severity: 'Medium',
      target: '192.168.1.1',
      service: 'Router Admin',
      description: 'Default credentials detected'
    }
  ];

  const credentials = [
    {
      target: 'admin@company.com',
      username: 'admin',
      password: '●●●●●●●●',
      source: 'Password Spray',
      confidence: 'High'
    },
    {
      target: 'user@company.com',
      username: 'jsmith',
      password: '●●●●●●●●',
      source: 'Hash Crack',
      confidence: 'Verified'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'critical';
      case 'High': return 'warning';
      case 'Medium': return 'info';
      case 'Low': return 'success';
      default: return 'secondary';
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'Verified': return 'success';
      case 'High': return 'info';
      case 'Medium': return 'warning';
      case 'Low': return 'critical';
      default: return 'secondary';
    }
  };

  const handleHashCrack = () => {
    setCracking(true);
    setTimeout(() => setCracking(false), 5000);
  };

  return (
    <div className="p-4 space-y-4">
      <Tabs defaultValue="vulnerabilities" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-terminal-bg">
          <TabsTrigger value="vulnerabilities">Vulns</TabsTrigger>
          <TabsTrigger value="credentials">Creds</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
        </TabsList>

        <TabsContent value="vulnerabilities" className="space-y-3 mt-4">
          {/* Vulnerability Scanner */}
          <Card className="p-4 bg-terminal-bg border-terminal-border">
            <h3 className="font-display font-bold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Vulnerability Scanner
            </h3>
            <div className="flex gap-2 mb-3">
              <Input
                placeholder="Target IP or hostname"
                className="bg-terminal-surface border-terminal-border"
              />
              <Button variant="terminal">
                <Search className="w-4 h-4 mr-2" />
                Scan
              </Button>
            </div>
          </Card>

          {/* Discovered Vulnerabilities */}
          <div className="space-y-2">
            {vulnerabilities.map((vuln, idx) => (
              <Card key={idx} className="p-3 bg-terminal-bg border-terminal-border">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-mono font-bold">{vuln.id}</div>
                      <Badge variant={getSeverityColor(vuln.severity) as any} className="text-xs">
                        {vuln.severity}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{vuln.target} - {vuln.service}</div>
                  </div>
                  <Shield className="w-4 h-4 text-status-warning" />
                </div>
                
                <div className="text-xs mb-3">
                  {vuln.description}
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    <Eye className="w-3 h-3 mr-1" />
                    Details
                  </Button>
                  <Button size="sm" variant="terminal" className="flex-1 text-xs">
                    <Zap className="w-3 h-3 mr-1" />
                    Exploit
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="credentials" className="space-y-3 mt-4">
          {/* Credential Database */}
          <Card className="p-4 bg-terminal-bg border-terminal-border">
            <h3 className="font-display font-bold mb-3 flex items-center gap-2">
              <Key className="w-4 h-4" />
              Credential Database
            </h3>
            <div className="text-xs text-muted-foreground mb-3">
              Compromised credentials from various sources
            </div>
          </Card>

          <div className="space-y-2">
            {credentials.map((cred, idx) => (
              <Card key={idx} className="p-3 bg-terminal-bg border-terminal-border">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-sm font-mono font-bold">{cred.target}</div>
                    <div className="text-xs text-muted-foreground">
                      {cred.username} : {cred.password}
                    </div>
                  </div>
                  <Badge variant={getConfidenceColor(cred.confidence) as any} className="text-xs">
                    {cred.confidence}
                  </Badge>
                </div>
                
                <div className="text-xs text-muted-foreground mb-2">
                  Source: {cred.source}
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    <EyeOff className="w-3 h-3 mr-1" />
                    Reveal
                  </Button>
                  <Button size="sm" variant="terminal" className="flex-1 text-xs">
                    Test
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="crypto" className="space-y-3 mt-4">
          {/* Hash Cracker */}
          <Card className="p-4 bg-terminal-bg border-terminal-border">
            <h3 className="font-display font-bold mb-3 flex items-center gap-2">
              <Hash className="w-4 h-4" />
              Hash Cracker
            </h3>
            <div className="space-y-3">
              <Input
                placeholder="Enter hash to crack (MD5, SHA1, SHA256...)"
                value={hashInput}
                onChange={(e) => setHashInput(e.target.value)}
                className="bg-terminal-surface border-terminal-border font-mono text-xs"
              />
              <div className="flex gap-2">
                <Button 
                  onClick={handleHashCrack}
                  disabled={cracking || !hashInput}
                  variant="terminal" 
                  className="flex-1"
                >
                  {cracking ? (
                    <>
                      <Cpu className="w-4 h-4 mr-2 animate-spin" />
                      Cracking...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Crack Hash
                    </>
                  )}
                </Button>
                <Button variant="outline" className="flex-1">
                  Dictionary
                </Button>
              </div>
              
              {cracking && (
                <div className="p-3 bg-terminal-surface rounded">
                  <div className="text-xs font-mono text-glow-primary">
                    <div>Method: Dictionary + Rules</div>
                    <div>Progress: 23.7% (1,247,293 / 5,234,891)</div>
                    <div>Speed: 847K H/s</div>
                    <div>ETC: 00:02:34</div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Crypto Tools */}
          <Card className="p-4 bg-terminal-bg border-terminal-border">
            <h3 className="font-display font-bold mb-3">Cryptographic Tools</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                <Lock className="w-3 h-3 mr-1" />
                Encrypt
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Key className="w-3 h-3 mr-1" />
                Decrypt
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Hash className="w-3 h-3 mr-1" />
                Hash
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <FileText className="w-3 h-3 mr-1" />
                Sign
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};