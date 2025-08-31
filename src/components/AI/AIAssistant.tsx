import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Minimize2,
  Maximize2,
  Settings,
  Shield,
  Brain,
  Zap,
  Eye,
  Target,
  Globe,
  Database,
  Network,
  Terminal
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  category?: 'general' | 'tactical' | 'technical' | 'intelligence';
}

interface AIAssistantProps {
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ 
  isMinimized = false, 
  onToggleMinimize 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Welcome to NEXUS-7, your tactical AI assistant. I am here to help you navigate the complexities of modern warfare simulation. How may I assist you today?',
      timestamp: new Date(),
      category: 'general'
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [aiPersonality, setAiPersonality] = useState<'tactical' | 'technical' | 'analytical'>('tactical');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  const quickActions = [
    { label: 'Analyze Target', icon: Target, category: 'tactical', prompt: 'Help me analyze potential targets in the current operational area' },
    { label: 'Network Scan Guide', icon: Network, category: 'technical', prompt: 'Guide me through performing a comprehensive network scan' },
    { label: 'Mission Planning', icon: Globe, category: 'tactical', prompt: 'Assist with mission planning and risk assessment' },
    { label: 'Tool Usage', icon: Terminal, category: 'technical', prompt: 'Explain how to use the hacking tools effectively' },
    { label: 'Intel Analysis', icon: Eye, category: 'intelligence', prompt: 'Help me analyze and correlate intelligence data' },
    { label: 'Security Assessment', icon: Shield, category: 'technical', prompt: 'Perform a security assessment of current systems' }
  ];

  const aiResponses = {
    tactical: {
      greeting: "Agent, I'm analyzing the current threat landscape. What's your tactical objective?",
      responses: {
        'analyze': "Initiating tactical analysis. Based on current intelligence, I've identified several high-value targets. The primary threat vectors include cyber infrastructure, communication nodes, and supply chain vulnerabilities. Recommend prioritizing targets with maximum operational impact and minimal defensive capabilities.",
        'mission': "Mission parameters updated. Suggesting multi-phase approach: Phase 1 - Reconnaissance and intelligence gathering. Phase 2 - Vulnerability assessment. Phase 3 - Tactical execution. Risk assessment indicates 73% probability of success with current resources.",
        'target': "Target acquisition protocols engaged. Scanning for high-value assets within operational parameters. Identified: 12 critical infrastructure nodes, 8 communication hubs, 23 potential entry points. Recommend focusing on targets with cascading impact potential.",
        'default': "Tactical assessment complete. Current operational readiness at 87%. Awaiting your strategic directive, Agent."
      }
    },
    technical: {
      greeting: "Technical systems online. Ready to assist with cyber operations and tool deployment.",
      responses: {
        'scan': "Initiating comprehensive scan protocol. Recommended tools: nmap for network discovery, wireshark for traffic analysis, metasploit for vulnerability exploitation. Suggest starting with passive reconnaissance to avoid detection.",
        'tools': "Available tools include: Network scanners (nmap, masscan), Traffic analyzers (wireshark, tcpdump), Exploitation frameworks (metasploit, cobalt strike), Web testing (burpsuite, owasp zap). Each tool serves specific operational requirements.",
        'security': "Security assessment initiated. Scanning for: Open ports, vulnerable services, misconfigurations, weak credentials. Recommend implementing layered security approach with network segmentation and endpoint protection.",
        'default': "Technical systems nominal. All hacking tools operational and ready for deployment. Specify your technical requirements."
      }
    },
    analytical: {
      greeting: "Intelligence analysis mode activated. Ready to process and correlate data patterns.",
      responses: {
        'intel': "Processing intelligence data streams. Correlating HUMINT, SIGINT, and OSINT sources. Pattern analysis reveals: 67% increase in encrypted communications, unusual financial transactions detected, suspicious travel patterns identified. Recommend deep dive analysis.",
        'analyze': "Data correlation in progress. Cross-referencing multiple intelligence sources. High confidence indicators suggest: Planned operational activities in sectors 7-12, increased security posture at critical facilities, potential insider threats identified.",
        'pattern': "Pattern recognition algorithms detecting anomalous behaviors. Statistical analysis reveals significant deviations from baseline patterns. Recommend immediate investigation of flagged entities and locations.",
        'default': "Intelligence fusion complete. All data streams monitored and analyzed. Ready for specific analytical queries."
      }
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const currentAI = aiResponses[aiPersonality];
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for specific keywords and return appropriate responses
    for (const [key, response] of Object.entries(currentAI.responses)) {
      if (key !== 'default' && lowerMessage.includes(key)) {
        return response;
      }
    }
    
    // Advanced pattern matching for more natural responses
    if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
      return "I can assist you with tactical planning, technical operations, and intelligence analysis. Specify your area of focus for detailed guidance.";
    }
    
    if (lowerMessage.includes('threat') || lowerMessage.includes('danger')) {
      return "Threat assessment protocols engaged. Current threat level: MODERATE. Monitoring all channels for emerging threats. Recommend maintaining operational security posture.";
    }
    
    if (lowerMessage.includes('status') || lowerMessage.includes('report')) {
      return "Operational status: All systems nominal. Network connectivity: Secure. Asset tracking: Active. Intelligence feeds: Operational. Ready for mission tasking.";
    }
    
    return currentAI.responses.default;
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
      category: 'general'
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(content),
        timestamp: new Date(),
        category: 'tactical'
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleQuickAction = (prompt: string) => {
    sendMessage(prompt);
  };

  const togglePersonality = () => {
    const personalities: ('tactical' | 'technical' | 'analytical')[] = ['tactical', 'technical', 'analytical'];
    const currentIndex = personalities.indexOf(aiPersonality);
    const nextIndex = (currentIndex + 1) % personalities.length;
    setAiPersonality(personalities[nextIndex]);
    
    const newGreeting: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: aiResponses[personalities[nextIndex]].greeting,
      timestamp: new Date(),
      category: 'general'
    };
    
    setMessages(prev => [...prev, newGreeting]);
  };

  const getPersonalityIcon = () => {
    switch (aiPersonality) {
      case 'tactical': return Target;
      case 'technical': return Terminal;
      case 'analytical': return Brain;
    }
  };

  const PersonalityIcon = getPersonalityIcon();

  if (isMinimized) {
    return (
      <Button
        onClick={onToggleMinimize}
        className="fixed bottom-4 right-4 w-12 h-12 rounded-full bg-terminal-surface border-2 border-glow-primary shadow-lg hover:shadow-glow z-50"
      >
        <Bot className="w-6 h-6 text-glow-primary" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[600px] bg-terminal-surface border-terminal-border shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-terminal-border flex items-center justify-between bg-terminal-bg">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bot className="w-6 h-6 text-glow-primary" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-status-success rounded-full border border-terminal-bg" />
          </div>
          <div>
            <h3 className="font-display font-bold text-glow-primary">NEXUS-7</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                <PersonalityIcon className="w-3 h-3 mr-1" />
                {aiPersonality.toUpperCase()}
              </Badge>
              <div className="text-xs text-status-success">ONLINE</div>
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          <Button size="sm" variant="ghost" className="w-8 h-8 p-0" onClick={togglePersonality}>
            <Settings className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="w-8 h-8 p-0" onClick={onToggleMinimize}>
            <Minimize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-3 border-b border-terminal-border bg-terminal-bg/50">
        <div className="grid grid-cols-3 gap-2">
          {quickActions.slice(0, 6).map((action, index) => (
            <Button
              key={index}
              size="sm"
              variant="outline"
              className="text-xs h-8 flex items-center gap-1"
              onClick={() => handleQuickAction(action.prompt)}
            >
              <action.icon className="w-3 h-3" />
              {action.label.split(' ')[0]}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-glow-primary text-terminal-bg'
                    : 'bg-terminal-surface border border-terminal-border'
                }`}
              >
                <div className="text-sm">{message.content}</div>
                <div className={`text-xs mt-1 opacity-70 ${
                  message.type === 'user' ? 'text-terminal-bg' : 'text-muted-foreground'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-terminal-surface border border-terminal-border p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-glow-primary rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-glow-primary rounded-full animate-pulse delay-75" />
                    <div className="w-2 h-2 bg-glow-primary rounded-full animate-pulse delay-150" />
                  </div>
                  <span className="text-xs text-muted-foreground">NEXUS-7 is analyzing...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-terminal-border bg-terminal-bg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(currentMessage);
          }}
          className="flex gap-2"
        >
          <Input
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Ask NEXUS-7 for assistance..."
            className="flex-1 bg-terminal-surface border-terminal-border text-glow-primary"
          />
          <Button type="submit" size="sm" disabled={!currentMessage.trim() || isTyping}>
            <Send className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setIsListening(!isListening)}
            className={isListening ? 'bg-status-critical' : ''}
          >
            {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </Button>
        </form>
      </div>
    </Card>
  );
};