import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Shield, Users, Coins, TrendingUp, TrendingDown, Eye, Sword, Activity } from 'lucide-react';

interface Faction {
  id: string;
  name: string;
  reputation: number;
  relationship: 'allied' | 'hostile' | 'neutral' | 'unknown';
  strength: number;
  territory: number;
  recentActivity: string;
  color: string;
  intel: number;
}

export const FactionOverview: React.FC = () => {
  const factions: Faction[] = [
    {
      id: 'alpha',
      name: 'Alpha Syndicate',
      reputation: 750,
      relationship: 'allied',
      strength: 85,
      territory: 42,
      recentActivity: 'Expanding trade routes',
      color: 'faction-alpha',
      intel: 3
    },
    {
      id: 'beta',
      name: 'Beta Consortium',
      reputation: -320,
      relationship: 'hostile',
      strength: 92,
      territory: 38,
      recentActivity: 'Military buildup detected',
      color: 'faction-beta',
      intel: 7
    },
    {
      id: 'gamma',
      name: 'Gamma Collective',
      reputation: 0,
      relationship: 'neutral',
      strength: 67,
      territory: 20,
      recentActivity: 'Resource acquisition',
      color: 'faction-gamma',
      intel: 2
    },
    {
      id: 'rogue',
      name: 'Rogue AI Nodes',
      reputation: -999,
      relationship: 'hostile',
      strength: 78,
      territory: 15,
      recentActivity: 'Coordinated false signals',
      color: 'status-critical',
      intel: 1
    }
  ];

  const getRelationshipBadge = (relationship: string) => {
    switch (relationship) {
      case 'allied':
        return <Badge variant="success">Allied</Badge>;
      case 'hostile':
        return <Badge variant="critical">Hostile</Badge>;
      case 'neutral':
        return <Badge variant="secondary">Neutral</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getReputationColor = (rep: number) => {
    if (rep > 500) return 'text-status-success';
    if (rep > 0) return 'text-status-info';
    if (rep > -500) return 'text-status-warning';
    return 'text-status-critical';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-terminal-surface">
          <Shield className="w-6 h-6 text-glow-primary" />
        </div>
        <div>
          <h2 className="text-xl font-display font-bold text-glow">Faction Intelligence</h2>
          <p className="text-sm text-muted-foreground">Real-time faction analysis and standings</p>
        </div>
      </div>

      <div className="grid gap-4">
        {factions.map((faction) => (
          <Card key={faction.id} className="p-4 terminal-glow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className={`w-3 h-3 rounded-full bg-${faction.color} shadow-glow`}
                  style={{ boxShadow: `0 0 10px hsl(var(--${faction.color}) / 0.5)` }}
                />
                <div>
                  <h3 className="font-display font-semibold text-lg">{faction.name}</h3>
                  <div className="flex items-center gap-2">
                    {getRelationshipBadge(faction.relationship)}
                    <span className={`text-sm font-mono ${getReputationColor(faction.reputation)}`}>
                      REP: {faction.reputation > 0 ? '+' : ''}{faction.reputation}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Sword className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-muted-foreground">Military Strength</span>
                  <span className="text-sm font-mono">{faction.strength}%</span>
                </div>
                <Progress value={faction.strength} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-muted-foreground">Territory Control</span>
                  <span className="text-sm font-mono">{faction.territory}%</span>
                </div>
                <Progress value={faction.territory} className="h-2" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-glow-primary" />
                  <span className="text-sm text-muted-foreground">Intel Available</span>
                </div>
                <Badge variant="terminal" className="font-mono">
                  {faction.intel} packets
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Activity className="w-4 h-4 text-status-info" />
              <span className="text-muted-foreground">Recent Activity:</span>
              <span>{faction.recentActivity}</span>
              {faction.recentActivity.includes('buildup') && (
                <TrendingUp className="w-4 h-4 text-status-warning ml-2" />
              )}
              {faction.recentActivity.includes('Expanding') && (
                <TrendingUp className="w-4 h-4 text-status-success ml-2" />
              )}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 terminal-glow">
        <div className="flex items-center gap-2 mb-3">
          <Coins className="w-5 h-5 text-status-warning" />
          <h3 className="font-display font-semibold">Economic Overview</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-status-success">127,450</div>
            <div className="text-sm text-muted-foreground">ISK Balance</div>
          </div>
          <div>
            <div className="text-lg font-bold text-glow-primary">Level 7</div>
            <div className="text-sm text-muted-foreground">Clearance</div>
          </div>
          <div>
            <div className="text-lg font-bold text-status-info">13</div>
            <div className="text-sm text-muted-foreground">Intel Packets</div>
          </div>
          <div>
            <div className="text-lg font-bold text-status-warning">247</div>
            <div className="text-sm text-muted-foreground">Missions Complete</div>
          </div>
        </div>
      </Card>
    </div>
  );
};