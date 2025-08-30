import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TerminalInterface } from '@/components/TerminalInterface';
import { WorldWarClock } from '@/components/WorldWarClock';
import { FactionOverview } from '@/components/FactionOverview';
import { Badge } from '@/components/ui/badge';
import { 
  Terminal, 
  Shield, 
  Clock, 
  Activity, 
  AlertTriangle, 
  Zap,
  Globe,
  Users,
  Target
} from 'lucide-react';
import warfareHero from '@/assets/warfare-hero.jpg';

export const WarfareSimulator: React.FC = () => {
  const [isCliMode, setIsCliMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background scan-lines">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${warfareHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-terminal-bg/20 via-terminal-bg/60 to-terminal-bg" />
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <div className="max-w-4xl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-terminal-surface terminal-glow">
                <Globe className="w-8 h-8 text-glow-primary" />
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-black text-glow">
                WARFARE NEXUS
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 font-mono">
              "No two players play the same game. But they live in the same war."
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Badge variant="critical" className="px-4 py-2 text-sm">
                LIVE SIMULATION
              </Badge>
              <Badge variant="warning" className="px-4 py-2 text-sm">
                TEMPORAL GRAPH DB
              </Badge>
              <Badge variant="success" className="px-4 py-2 text-sm">
                AI NARRATIVE ENGINE
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="border-b border-terminal-border bg-terminal-surface">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
                <span className="text-sm font-mono">FSMC ONLINE</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
                <span className="text-sm font-mono">MOSL ACTIVE</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-status-warning animate-pulse" />
                <span className="text-sm font-mono">GCT GENERATING</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm font-mono">
                <span className="text-muted-foreground">Agent ID:</span> 
                <span className="text-glow-primary"> AX-2387-Delta</span>
              </div>
              <Badge variant="terminal">Level 7 Clearance</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interface */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-4 bg-terminal-surface border border-terminal-border">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-terminal-border data-[state=active]:text-glow-primary font-mono"
            >
              <Activity className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="terminal"
              className="data-[state=active]:bg-terminal-border data-[state=active]:text-glow-primary font-mono"
            >
              <Terminal className="w-4 h-4 mr-2" />
              Terminal
            </TabsTrigger>
            <TabsTrigger 
              value="factions"
              className="data-[state=active]:bg-terminal-border data-[state=active]:text-glow-primary font-mono"
            >
              <Shield className="w-4 h-4 mr-2" />
              Factions
            </TabsTrigger>
            <TabsTrigger 
              value="warfare"
              className="data-[state=active]:bg-terminal-border data-[state=active]:text-glow-primary font-mono"
            >
              <Target className="w-4 h-4 mr-2" />
              War State
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <WorldWarClock />
              <Card className="p-6 terminal-glow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-full bg-terminal-surface">
                    <Zap className="w-6 h-6 text-glow-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold text-glow">System Architecture</h2>
                    <p className="text-sm text-muted-foreground">Core warfare systems status</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-terminal-surface rounded border border-terminal-border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-display font-semibold">Faction State Memory Core</span>
                      <Badge variant="success">ONLINE</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Temporal graph database tracking 2.4M entities, 15.7M relationships
                    </div>
                  </div>

                  <div className="p-4 bg-terminal-surface rounded border border-terminal-border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-display font-semibold">StorySync Warfare Engine</span>
                      <Badge variant="success">ACTIVE</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Generating 847 personalized narratives per minute
                    </div>
                  </div>

                  <div className="p-4 bg-terminal-surface rounded border border-terminal-border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-display font-semibold">Global Conflict Trees</span>
                      <Badge variant="warning">PROCESSING</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      AI analyzing 23,456 faction interactions for narrative arcs
                    </div>
                  </div>

                  <div className="p-4 bg-terminal-surface rounded border border-terminal-border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-display font-semibold">Multiplayer Ops Synchro</span>
                      <Badge variant="success">SYNCHRONIZED</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      99.999% uptime, sub-5ms latency, 847K active players
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6 terminal-glow">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-glow-primary" />
                <h3 className="text-lg font-display font-bold">Recent Global Events</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="p-3 bg-terminal-surface rounded border border-terminal-border">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-medium">Alpha-Beta Trade Agreement Signed</span>
                      <Badge variant="success" className="text-xs">+REP</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">14:35:42 - 247 players affected</div>
                  </div>

                  <div className="p-3 bg-terminal-surface rounded border border-terminal-border">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-medium">Gamma Resource Station Sabotaged</span>
                      <Badge variant="critical" className="text-xs">TENSION</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">14:28:15 - 89 players implicated</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-terminal-surface rounded border border-terminal-border">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-medium">Rogue AI Node Network Expansion</span>
                      <Badge variant="warning" className="text-xs">ALERT</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">14:21:03 - Global threat level increased</div>
                  </div>

                  <div className="p-3 bg-terminal-surface rounded border border-terminal-border">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-medium">Diplomatic Courier Intercepted</span>
                      <Badge variant="info" className="text-xs">INTEL</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">14:19:47 - Classified intel leaked</div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="terminal">
            <TerminalInterface 
              isCliMode={isCliMode} 
              onModeToggle={() => setIsCliMode(!isCliMode)} 
            />
          </TabsContent>

          <TabsContent value="factions">
            <FactionOverview />
          </TabsContent>

          <TabsContent value="warfare">
            <div className="grid gap-6">
              <WorldWarClock />
              <Card className="p-6 terminal-glow">
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="w-6 h-6 text-status-critical" />
                  <div>
                    <h2 className="text-xl font-display font-bold text-glow">Conflict Analysis</h2>
                    <p className="text-sm text-muted-foreground">Real-time warfare dynamics</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-terminal-surface rounded border border-terminal-border">
                    <div className="text-2xl font-bold text-status-critical">23:47:32</div>
                    <div className="text-sm text-muted-foreground">Doomsday Clock</div>
                  </div>
                  <div className="text-center p-4 bg-terminal-surface rounded border border-terminal-border">
                    <div className="text-2xl font-bold text-status-warning">847,293</div>
                    <div className="text-sm text-muted-foreground">Active Players</div>
                  </div>
                  <div className="text-center p-4 bg-terminal-surface rounded border border-terminal-border">
                    <div className="text-2xl font-bold text-glow-primary">4,672</div>
                    <div className="text-sm text-muted-foreground">Missions Active</div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};