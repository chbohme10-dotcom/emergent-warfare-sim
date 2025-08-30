import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  FileText, 
  Lock, 
  AlertTriangle, 
  Eye,
  Download,
  Search,
  Clock,
  MapPin,
  Users,
  Zap
} from 'lucide-react';

interface IntelDrawerProps {
  onClose: () => void;
}

export const IntelDrawer: React.FC<IntelDrawerProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const intelItems = [
    {
      id: 'INT-2387-A',
      title: 'Beta Consortium Trade Routes',
      classification: 'TOP SECRET',
      source: 'Agent Ghost',
      location: 'Black Sea Region',
      acquired: '14 min ago',
      type: 'Economic Intelligence',
      threat: 'high'
    },
    {
      id: 'INT-2387-B',
      title: 'Gamma Collective Military Assets',
      classification: 'SECRET',
      source: 'SIGINT Intercept',
      location: 'Eastern Europe',
      acquired: '2 hours ago',
      type: 'Military Intelligence',
      threat: 'critical'
    },
    {
      id: 'INT-2387-C',
      title: 'Alpha Diplomatic Communications',
      classification: 'CONFIDENTIAL',
      source: 'Network Infiltration',
      location: 'Washington D.C.',
      acquired: '6 hours ago',
      type: 'Political Intelligence',
      threat: 'medium'
    }
  ];

  const getClassificationColor = (level: string) => {
    switch (level) {
      case 'TOP SECRET': return 'critical';
      case 'SECRET': return 'warning';
      case 'CONFIDENTIAL': return 'info';
      default: return 'secondary';
    }
  };

  const getThreatColor = (threat: string) => {
    switch (threat) {
      case 'critical': return 'critical';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search intelligence..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-terminal-bg border-terminal-border"
        />
      </div>

      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-terminal-bg">
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="archive">Archive</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-3 mt-4">
          {intelItems.map((item) => (
            <Card key={item.id} className="p-3 bg-terminal-bg border-terminal-border">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Lock className="w-3 h-3" />
                    <span className="font-mono font-bold text-sm">{item.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.id}</span>
                </div>
                <Badge variant={getClassificationColor(item.classification) as any} className="text-xs">
                  {item.classification}
                </Badge>
              </div>
              
              <div className="space-y-1 text-xs mb-3">
                <div className="flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  <span>{item.type}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>Source: {item.source}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Acquired: {item.acquired}</span>
                </div>
                <div className="flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span>Threat Level: </span>
                  <Badge variant={getThreatColor(item.threat) as any} className="text-xs">
                    {item.threat.toUpperCase()}
                  </Badge>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 text-xs">
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="terminal" className="flex-1 text-xs">
                  <Download className="w-3 h-3 mr-1" />
                  Extract
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-3 mt-4">
          <Card className="p-4 bg-terminal-bg border-terminal-border">
            <h3 className="font-display font-bold mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              AI Analysis Engine
            </h3>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-terminal-surface rounded border border-terminal-border">
                <div className="font-mono font-bold text-xs text-status-warning">PATTERN DETECTED</div>
                <div className="text-xs">Beta-Gamma communication spike correlates with Alpha trade route changes</div>
              </div>
              <div className="p-2 bg-terminal-surface rounded border border-terminal-border">
                <div className="font-mono font-bold text-xs text-status-info">PREDICTION</div>
                <div className="text-xs">78% probability of faction conflict escalation within 72 hours</div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="archive" className="space-y-3 mt-4">
          <div className="text-sm text-muted-foreground text-center py-8">
            Historical intelligence archive
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};