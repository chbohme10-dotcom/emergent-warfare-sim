import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  MapPin, 
  Clock, 
  Target, 
  Shield, 
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Search
} from 'lucide-react';

interface AgentDrawerProps {
  onClose: () => void;
}

export const AgentDrawer: React.FC<AgentDrawerProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const agents = [
    {
      id: 'AX-001',
      codename: 'Ghost',
      status: 'active',
      location: 'Moscow, Russia',
      mission: 'Deep Cover Infiltration',
      clearance: 9,
      lastContact: '2 min ago'
    },
    {
      id: 'AX-002', 
      codename: 'Phantom',
      status: 'mission',
      location: 'Beijing, China',
      mission: 'Data Extraction',
      clearance: 8,
      lastContact: '15 min ago'
    },
    {
      id: 'AX-003',
      codename: 'Shadow',
      status: 'offline',
      location: 'London, UK',
      mission: 'Surveillance',
      clearance: 7,
      lastContact: '2 hours ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'mission': return 'warning';
      case 'offline': return 'critical';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'mission': return Target;
      case 'offline': return XCircle;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search agents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-terminal-bg border-terminal-border"
        />
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-terminal-bg">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="deploy">Deploy</TabsTrigger>
          <TabsTrigger value="intel">Intel</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-3 mt-4">
          {agents.map((agent) => {
            const StatusIcon = getStatusIcon(agent.status);
            return (
              <Card key={agent.id} className="p-3 bg-terminal-bg border-terminal-border">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm">{agent.codename}</span>
                      <Badge variant={getStatusColor(agent.status) as any} className="text-xs">
                        {agent.status.toUpperCase()}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{agent.id}</span>
                  </div>
                  <StatusIcon className="w-4 h-4 text-glow-primary" />
                </div>
                
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{agent.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    <span>{agent.mission}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    <span>Level {agent.clearance} Clearance</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Last contact: {agent.lastContact}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    Contact
                  </Button>
                  <Button size="sm" variant="terminal" className="flex-1 text-xs">
                    Track
                  </Button>
                </div>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="deploy" className="space-y-3 mt-4">
          <Card className="p-4 bg-terminal-bg border-terminal-border">
            <h3 className="font-display font-bold mb-3 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Deploy New Agent
            </h3>
            <div className="space-y-3">
              <Input placeholder="Mission codename" className="bg-terminal-surface" />
              <Input placeholder="Target location" className="bg-terminal-surface" />
              <Button className="w-full" variant="terminal">
                <Zap className="w-4 h-4 mr-2" />
                Initialize Deployment
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="intel" className="space-y-3 mt-4">
          <div className="text-sm text-muted-foreground text-center py-8">
            Agent intelligence reports will appear here
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};