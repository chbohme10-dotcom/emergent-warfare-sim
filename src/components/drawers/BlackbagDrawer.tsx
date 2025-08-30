import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Briefcase, 
  CreditCard, 
  FileText, 
  Key, 
  Camera,
  Usb,
  HardDrive,
  Cpu,
  DollarSign,
  Lock,
  Search,
  Plus
} from 'lucide-react';

interface BlackbagDrawerProps {
  onClose: () => void;
}

export const BlackbagDrawer: React.FC<BlackbagDrawerProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const equipment = [
    {
      id: 'EQ-001',
      name: 'USB Rubber Ducky',
      type: 'Hardware',
      status: 'available',
      description: 'Keystroke injection tool',
      icon: Usb
    },
    {
      id: 'EQ-002', 
      name: 'RFID Cloner',
      type: 'Hardware',
      status: 'deployed',
      description: 'Access card duplication',
      icon: CreditCard
    },
    {
      id: 'EQ-003',
      name: 'Network Tap',
      type: 'Hardware', 
      status: 'available',
      description: 'Passive network monitoring',
      icon: Cpu
    }
  ];

  const documents = [
    {
      id: 'DOC-001',
      name: 'Embassy Access Pass',
      type: 'Forged ID',
      region: 'Eastern Europe',
      expiry: '2024-12-15'
    },
    {
      id: 'DOC-002',
      name: 'Corporate Badge - TechCorp',
      type: 'Cloned Badge',
      region: 'North America', 
      expiry: '2024-11-30'
    }
  ];

  const currency = [
    { type: 'USD', amount: 15420, clean: true },
    { type: 'EUR', amount: 8750, clean: true },
    { type: 'Bitcoin', amount: 2.47, clean: false },
    { type: 'Monero', amount: 45.2, clean: false }
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search equipment..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-terminal-bg border-terminal-border"
        />
      </div>

      <Tabs defaultValue="equipment" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-terminal-bg">
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="currency">Currency</TabsTrigger>
        </TabsList>

        <TabsContent value="equipment" className="space-y-3 mt-4">
          {equipment.map((item) => {
            const IconComponent = item.icon;
            return (
              <Card key={item.id} className="p-3 bg-terminal-bg border-terminal-border">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4 text-glow-primary" />
                    <div>
                      <div className="font-mono font-bold text-sm">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.id}</div>
                    </div>
                  </div>
                  <Badge 
                    variant={item.status === 'available' ? 'success' : 'warning'} 
                    className="text-xs"
                  >
                    {item.status.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="text-xs text-muted-foreground mb-3">
                  {item.description}
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    Details
                  </Button>
                  <Button 
                    size="sm" 
                    variant="terminal" 
                    className="flex-1 text-xs"
                    disabled={item.status === 'deployed'}
                  >
                    {item.status === 'available' ? 'Deploy' : 'In Use'}
                  </Button>
                </div>
              </Card>
            );
          })}
          
          <Card className="p-3 bg-terminal-bg border-terminal-border border-dashed">
            <Button variant="ghost" className="w-full text-xs">
              <Plus className="w-4 h-4 mr-2" />
              Request New Equipment
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-3 mt-4">
          {documents.map((doc) => (
            <Card key={doc.id} className="p-3 bg-terminal-bg border-terminal-border">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-glow-primary" />
                  <div>
                    <div className="font-mono font-bold text-sm">{doc.name}</div>
                    <div className="text-xs text-muted-foreground">{doc.id}</div>
                  </div>
                </div>
                <Badge variant="info" className="text-xs">
                  {doc.type}
                </Badge>
              </div>
              
              <div className="space-y-1 text-xs mb-3">
                <div>Region: {doc.region}</div>
                <div>Expires: {doc.expiry}</div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 text-xs">
                  View
                </Button>
                <Button size="sm" variant="terminal" className="flex-1 text-xs">
                  Use
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="currency" className="space-y-3 mt-4">
          <Card className="p-4 bg-terminal-bg border-terminal-border">
            <h3 className="font-display font-bold mb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Available Funds
            </h3>
            <div className="space-y-2">
              {currency.map((curr, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-terminal-surface rounded">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm">{curr.type}</span>
                    {!curr.clean && <Lock className="w-3 h-3 text-status-warning" />}
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm">{curr.amount.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">
                      {curr.clean ? 'Clean' : 'Crypto'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};