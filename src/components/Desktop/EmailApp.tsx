import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Send, 
  Reply, 
  Forward, 
  Trash2, 
  Archive, 
  Star,
  Search,
  Paperclip,
  Shield,
  Lock,
  Key,
  AlertTriangle,
  Clock,
  User,
  X,
  Download
} from 'lucide-react';

interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  timestamp: Date;
  isRead: boolean;
  isStarred: boolean;
  isEncrypted: boolean;
  classification: 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP SECRET';
  attachments: string[];
}

interface EmailAppProps {
  onClose: () => void;
}

export const EmailApp: React.FC<EmailAppProps> = ({ onClose }) => {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const emails: Email[] = [
    {
      id: '1',
      from: 'command@tactical.mil',
      to: 'agent.007@classified.gov',
      subject: '🚨 URGENT: Operation Blackwater - Phase 2 Authorization',
      body: `CLASSIFICATION: TOP SECRET//NOFORN

Agent 007,

Operation Blackwater has been authorized for Phase 2 implementation. 

Mission Parameters:
- Target: Damascus Communications Hub
- Timeline: 0300-0600 Local Time
- Assets: Strike Team Bravo, Cyber Division
- Extraction: Blue Route confirmed

Intelligence indicates target has enhanced security protocols. Recommend deploying advanced EW countermeasures.

Confirm receipt and deployment readiness within 30 minutes.

CLASSIFICATION: TOP SECRET//NOFORN

Colonel Martinez
Strategic Operations Command`,
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      isRead: false,
      isStarred: true,
      isEncrypted: true,
      classification: 'TOP SECRET',
      attachments: ['operation_blackwater_phase2.pdf', 'target_schematics.dwg']
    },
    {
      id: '2',
      from: 'field.agent.07@secure.gov',
      to: 'intel.analysis@classified.gov',
      subject: '📊 Intelligence Report: Damascus Surveillance Data',
      body: `CLASSIFICATION: SECRET

Intelligence Team,

Attached surveillance data from Damascus operation:

Target Movement Analysis:
- Primary target follows predictable pattern
- Security detail reduced during 0400-0500 window
- Electronic signatures suggest advanced countermeasures

Threat Assessment:
- Moderate: Local law enforcement presence
- High: Electronic surveillance systems
- Critical: Unknown actors in vicinity

Recommend enhanced reconnaissance before asset deployment.

Agent 07
Field Intelligence Division

CLASSIFICATION: SECRET`,
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      isRead: false,
      isStarred: false,
      isEncrypted: true,
      classification: 'SECRET',
      attachments: ['surveillance_data.zip', 'threat_assessment.pdf']
    },
    {
      id: '3',
      from: 'security@nsa.gov',
      to: 'all.operators@classified.gov',
      subject: '🔐 Monthly Security Update: Crypto Keys Distribution',
      body: `CLASSIFICATION: CONFIDENTIAL

All Operators,

Monthly cryptographic key rotation is now complete.

Updated Systems:
- Secure Communication Network
- Satellite Uplink Encryption
- Field Device Authentication

New encryption standards:
- AES-256-GCM for data at rest
- RSA-4096 for key exchange
- ECDSA-P521 for digital signatures

All field devices will auto-update within 24 hours.

Report any authentication failures immediately.

NSA Cybersecurity Division

CLASSIFICATION: CONFIDENTIAL`,
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      isRead: true,
      isStarred: false,
      isEncrypted: true,
      classification: 'CONFIDENTIAL',
      attachments: ['crypto_keys.p12', 'security_guidelines.pdf']
    },
    {
      id: '4',
      from: 'cyber.command@pentagon.mil',
      to: 'red.team@classified.gov',
      subject: '🎯 Authorized Penetration Testing: Infrastructure Assessment',
      body: `CLASSIFICATION: SECRET

Red Team Operations,

You are authorized to conduct penetration testing on the following infrastructure:

Scope:
- Internal network: 192.168.100.0/24
- DMZ servers: 10.10.10.0/24
- Wireless networks: CORP-SECURE, CORP-GUEST

Rules of Engagement:
- No data exfiltration
- Minimal service disruption
- Report all findings within 48 hours
- Emergency stop code: REDSTORM

Test window: 2024-01-15 to 2024-01-17

Authorization: CYBER-2024-001

Major General Thompson
U.S. Cyber Command

CLASSIFICATION: SECRET`,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true,
      isStarred: true,
      isEncrypted: true,
      classification: 'SECRET',
      attachments: ['pentest_scope.pdf', 'roe_document.pdf']
    }
  ];

  const filteredEmails = emails.filter(email =>
    email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'TOP SECRET': return 'bg-red-600';
      case 'SECRET': return 'bg-orange-600';
      case 'CONFIDENTIAL': return 'bg-yellow-600';
      default: return 'bg-green-600';
    }
  };

  const ComposeEmail = () => (
    <div className="h-full flex flex-col bg-terminal-bg">
      <div className="bg-terminal-surface border-b border-terminal-border p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-glow-primary flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Compose Encrypted Message
          </h3>
          <Button size="sm" variant="ghost" onClick={() => setIsComposing(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 p-4 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">To:</label>
          <Input 
            placeholder="recipient@classified.gov"
            className="bg-terminal-surface border-terminal-border"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Subject:</label>
          <Input 
            placeholder="Subject (will be encrypted)"
            className="bg-terminal-surface border-terminal-border"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Classification:</label>
          <select className="w-full p-2 bg-terminal-surface border border-terminal-border rounded">
            <option>UNCLASSIFIED</option>
            <option>CONFIDENTIAL</option>
            <option>SECRET</option>
            <option>TOP SECRET</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Message:</label>
          <Textarea 
            placeholder="Type your encrypted message here..."
            className="bg-terminal-surface border-terminal-border h-48"
          />
        </div>
        
        <div className="flex items-center gap-2 pt-4 border-t border-terminal-border">
          <Button className="bg-glow-primary text-terminal-bg">
            <Send className="w-4 h-4 mr-2" />
            Send Encrypted
          </Button>
          <Button variant="outline">
            <Paperclip className="w-4 h-4 mr-2" />
            Attach File
          </Button>
          <Button variant="outline">
            <Key className="w-4 h-4 mr-2" />
            Sign with PGP
          </Button>
        </div>
      </div>
    </div>
  );

  if (isComposing) {
    return <ComposeEmail />;
  }

  return (
    <div className="h-full bg-terminal-bg flex">
      {/* Email List */}
      <div className="w-1/3 border-r border-terminal-border flex flex-col">
        {/* Search and Controls */}
        <div className="bg-terminal-surface border-b border-terminal-border p-4">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-display font-bold text-glow-primary flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Secure Mail
            </h3>
            <Button size="sm" variant="ghost" onClick={onClose} className="ml-auto">
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search encrypted mail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-terminal-bg border-terminal-border"
              />
            </div>
          </div>
          
          <Button 
            onClick={() => setIsComposing(true)}
            className="w-full bg-glow-primary text-terminal-bg"
          >
            <Lock className="w-4 h-4 mr-2" />
            Compose Encrypted
          </Button>
        </div>

        {/* Email List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredEmails.map(email => (
              <Card
                key={email.id}
                className={`p-3 mb-2 cursor-pointer transition-colors ${
                  selectedEmail?.id === email.id 
                    ? 'bg-terminal-surface border-glow-primary' 
                    : 'bg-terminal-bg border-terminal-border hover:bg-terminal-surface/50'
                } ${!email.isRead ? 'border-l-4 border-l-glow-primary' : ''}`}
                onClick={() => setSelectedEmail(email)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {email.isEncrypted && <Lock className="w-3 h-3 text-green-400" />}
                    {email.isStarred && <Star className="w-3 h-3 text-yellow-400" />}
                    <Badge className={`text-xs ${getClassificationColor(email.classification)}`}>
                      {email.classification}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {email.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm font-medium text-glow-primary truncate">
                    {email.from}
                  </div>
                  <div className={`text-sm truncate ${!email.isRead ? 'font-semibold' : ''}`}>
                    {email.subject}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {email.body.substring(0, 100)}...
                  </div>
                </div>
                
                {email.attachments.length > 0 && (
                  <div className="flex items-center gap-1 mt-2">
                    <Paperclip className="w-3 h-3" />
                    <span className="text-xs">{email.attachments.length} attachments</span>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Email Content */}
      <div className="flex-1 flex flex-col">
        {selectedEmail ? (
          <>
            {/* Email Header */}
            <div className="bg-terminal-surface border-b border-terminal-border p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className={`${getClassificationColor(selectedEmail.classification)}`}>
                      {selectedEmail.classification}
                    </Badge>
                    {selectedEmail.isEncrypted && (
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        <Lock className="w-3 h-3 mr-1" />
                        ENCRYPTED
                      </Badge>
                    )}
                  </div>
                  <h2 className="text-xl font-bold">{selectedEmail.subject}</h2>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Reply className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Forward className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Star className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Archive className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">From: </span>
                  <span className="text-glow-primary">{selectedEmail.from}</span>
                </div>
                <div>
                  <span className="font-medium">To: </span>
                  <span>{selectedEmail.to}</span>
                </div>
                <div>
                  <span className="font-medium">Time: </span>
                  <span>{selectedEmail.timestamp.toLocaleString()}</span>
                </div>
                <div>
                  <span className="font-medium">Encryption: </span>
                  <span className="text-green-400">AES-256-GCM</span>
                </div>
              </div>
            </div>

            {/* Email Body */}
            <ScrollArea className="flex-1 p-4">
              <div className="bg-terminal-surface rounded p-4 font-mono text-sm whitespace-pre-wrap">
                {selectedEmail.body}
              </div>
              
              {selectedEmail.attachments.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Paperclip className="w-4 h-4" />
                    Attachments ({selectedEmail.attachments.length})
                  </h4>
                  <div className="space-y-2">
                    {selectedEmail.attachments.map((attachment, index) => (
                      <Card key={index} className="p-3 bg-terminal-surface">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-mono">{attachment}</span>
                          <Button size="sm" variant="outline">
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </ScrollArea>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Mail className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <h3 className="text-lg font-medium mb-2">No Email Selected</h3>
              <p>Select an email from the list to view its contents</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};