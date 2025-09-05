import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Home, 
  Search,
  Star,
  Download,
  Settings,
  Shield,
  Globe,
  Lock,
  AlertTriangle,
  Eye,
  EyeOff,
  X,
  Plus
} from 'lucide-react';

interface BrowserTab {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  isActive: boolean;
  content: string;
}

interface BrowserAppProps {
  windowId: string;
  onClose: () => void;
}

export const BrowserApp: React.FC<BrowserAppProps> = ({ windowId, onClose }) => {
  const [tabs, setTabs] = useState<BrowserTab[]>([
    {
      id: 'tab1',
      title: 'Tor Network - Anonymous Browsing',
      url: 'http://3g2upl4pq6kufc4m.onion',
      isActive: true,
      content: `
        <div style="background: #1a1a1a; color: #00ff88; font-family: monospace; padding: 20px;">
          <h1 style="color: #ff6b35;">🧅 TOR NETWORK ACCESS</h1>
          <h2 style="color: #00ff88;">Anonymous Deep Web Browser</h2>
          <p>Status: <span style="color: #00ff88;">CONNECTED</span></p>
          <p>Exit Node: Germany (Frankfurt) - 185.220.101.32</p>
          <p>Encryption: AES-256 | Hops: 3</p>
          
          <hr style="border-color: #333; margin: 20px 0;">
          
          <h3>🔒 SECURE ONION SERVICES</h3>
          <ul style="list-style: none; padding: 0;">
            <li style="margin: 10px 0;"><a href="#" style="color: #00ff88;">🛡️ ProtonMail (protonmailrmez3lotccipshtkleegetolb73fuirgj7r4o4vfu7ozyd.onion)</a></li>
            <li style="margin: 10px 0;"><a href="#" style="color: #00ff88;">📰 BBC News (bbcnewsv2vjtpsuy.onion)</a></li>
            <li style="margin: 10px 0;"><a href="#" style="color: #00ff88;">🔍 DuckDuckGo (3g2upl4pq6kufc4m.onion)</a></li>
            <li style="margin: 10px 0;"><a href="#" style="color: #ff6b35;">🚫 CLASSIFIED MARKETPLACE ACCESS</a></li>
          </ul>
          
          <div style="background: #000; padding: 15px; margin: 20px 0; border-left: 3px solid #ff6b35;">
            <h4 style="color: #ff6b35;">⚠️ OPERATIONAL SECURITY WARNING</h4>
            <p>You are accessing the dark web through military-grade anonymization. All traffic is encrypted and routed through multiple international proxy servers.</p>
          </div>
          
          <div style="background: #001122; padding: 15px; margin: 20px 0;">
            <h4 style="color: #00ff88;">🎯 INTELLIGENCE GATHERING TOOLS</h4>
            <button style="background: #00ff88; color: #000; padding: 8px 15px; margin: 5px; border: none; cursor: pointer;">OSINT Scanner</button>
            <button style="background: #ff6b35; color: #000; padding: 8px 15px; margin: 5px; border: none; cursor: pointer;">Social Engineering</button>
            <button style="background: #ffd700; color: #000; padding: 8px 15px; margin: 5px; border: none; cursor: pointer;">Data Harvesting</button>
          </div>
        </div>
      `
    }
  ]);
  
  const [activeTabId, setActiveTabId] = useState('tab1');
  const [urlInput, setUrlInput] = useState('http://3g2upl4pq6kufc4m.onion');
  const [isSecure, setIsSecure] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const [bookmarks, setBookmarks] = useState([
    'http://3g2upl4pq6kufc4m.onion - DuckDuckGo Onion',
    'https://protonmail.com - Secure Email',
    'https://github.com/torproject/tor - Tor Project',
    'http://facebookcorewwwi.onion - Facebook Onion'
  ]);

  const predefinedSites = {
    'http://3g2upl4pq6kufc4m.onion': {
      title: 'DuckDuckGo - Anonymous Search',
      content: `
        <div style="background: #1a1a1a; color: #00ff88; font-family: monospace; padding: 20px;">
          <h1 style="color: #ff6b35;">🦆 DUCKDUCKGO - ANONYMOUS SEARCH</h1>
          <div style="background: #000; padding: 20px; margin: 20px 0;">
            <input type="text" placeholder="Search anonymously..." style="width: 80%; padding: 10px; background: #333; color: #00ff88; border: 1px solid #555;">
            <button style="background: #00ff88; color: #000; padding: 10px 20px; margin-left: 10px;">🔍 SEARCH</button>
          </div>
          
          <h3>🎯 INTELLIGENCE SEARCH RESULTS</h3>
          <div style="background: #001122; padding: 15px; margin: 10px 0;">
            <h4 style="color: #00ff88;">📊 OSINT Data Sources</h4>
            <p>• Social media intelligence gathering</p>
            <p>• Public records and leaked databases</p>
            <p>• Government document archives</p>
          </div>
          
          <div style="background: #001122; padding: 15px; margin: 10px 0;">
            <h4 style="color: #ff6b35;">🚨 CLASSIFIED SEARCH ENGINES</h4>
            <p>• Shodan.io - Internet device scanner</p>
            <p>• Have I Been Pwned - Breach database</p>
            <p>• Wayback Machine - Historical data</p>
          </div>
        </div>
      `
    },
    'https://mail.protonmail.com': {
      title: 'ProtonMail - Secure Email',
      content: `
        <div style="background: #1a1a1a; color: #00ff88; font-family: monospace; padding: 20px;">
          <h1 style="color: #ff6b35;">📧 PROTONMAIL - ENCRYPTED COMMUNICATIONS</h1>
          
          <div style="background: #000; padding: 20px; margin: 20px 0;">
            <h3 style="color: #00ff88;">📨 SECURE INBOX (7 new messages)</h3>
            
            <div style="background: #001122; padding: 10px; margin: 10px 0; border-left: 3px solid #ff6b35;">
              <strong style="color: #ff6b35;">🚨 URGENT - Operation Blackwater</strong><br>
              <small>From: command@tactical.mil | Encrypted | 2min ago</small><br>
              Asset deployment confirmed. Proceed with phase 2.
            </div>
            
            <div style="background: #001122; padding: 10px; margin: 10px 0; border-left: 3px solid #00ff88;">
              <strong style="color: #00ff88;">📊 Intel Report - Damascus</strong><br>
              <small>From: field.agent.07@secure.gov | Encrypted | 15min ago</small><br>
              Surveillance data attached. Target movement patterns analyzed.
            </div>
            
            <div style="background: #001122; padding: 10px; margin: 10px 0; border-left: 3px solid #ffd700;">
              <strong style="color: #ffd700;">🔐 Crypto Keys Updated</strong><br>
              <small>From: security@nsa.gov | PGP Encrypted | 1hr ago</small><br>
              New encryption keys distributed. Confirm receipt.
            </div>
          </div>
          
          <button style="background: #00ff88; color: #000; padding: 10px 20px; margin: 5px;">Compose Encrypted</button>
          <button style="background: #ff6b35; color: #000; padding: 10px 20px; margin: 5px;">Secure Delete</button>
        </div>
      `
    },
    'https://shodan.io': {
      title: 'Shodan - Internet Scanner',
      content: `
        <div style="background: #1a1a1a; color: #00ff88; font-family: monospace; padding: 20px;">
          <h1 style="color: #ff6b35;">🔍 SHODAN - INTERNET DEVICE SCANNER</h1>
          
          <div style="background: #000; padding: 20px; margin: 20px 0;">
            <input type="text" placeholder="Search for devices, services, vulnerabilities..." style="width: 70%; padding: 10px; background: #333; color: #00ff88; border: 1px solid #555;">
            <button style="background: #ff6b35; color: #000; padding: 10px 20px; margin-left: 10px;">🎯 SCAN</button>
          </div>
          
          <h3>🚨 RECENT VULNERABILITY SCANS</h3>
          
          <div style="background: #220000; padding: 15px; margin: 10px 0; border-left: 3px solid #ff0000;">
            <h4 style="color: #ff0000;">🔴 CRITICAL: Exposed Industrial Controls</h4>
            <p>• 47,832 exposed SCADA systems worldwide</p>
            <p>• 12,443 unprotected power grid controllers</p>
            <p>• 8,921 water treatment facilities accessible</p>
          </div>
          
          <div style="background: #001122; padding: 15px; margin: 10px 0;">
            <h4 style="color: #ffd700;">⚠️ HIGH RISK: Database Exposures</h4>
            <p>• 234,567 MongoDB instances without authentication</p>
            <p>• 89,123 Redis servers publicly accessible</p>
            <p>• 156,789 Elasticsearch clusters exposed</p>
          </div>
          
          <div style="background: #001100; padding: 15px; margin: 10px 0;">
            <h4 style="color: #00ff88;">📊 IoT Device Intelligence</h4>
            <p>• 2.3M IP cameras with default passwords</p>
            <p>• 890K routers with known vulnerabilities</p>
            <p>• 445K smart home devices exposed</p>
          </div>
        </div>
      `
    }
  };

  const navigateToUrl = (url: string) => {
    setUrlInput(url);
    const activeTab = tabs.find(tab => tab.id === activeTabId);
    if (activeTab && predefinedSites[url as keyof typeof predefinedSites]) {
      const siteData = predefinedSites[url as keyof typeof predefinedSites];
      setTabs(prev => prev.map(tab => 
        tab.id === activeTabId 
          ? { ...tab, url, title: siteData.title, content: siteData.content }
          : tab
      ));
    }
    setHistory(prev => [...prev, url]);
  };

  const createNewTab = () => {
    const newTab: BrowserTab = {
      id: `tab${Date.now()}`,
      title: 'New Tab',
      url: 'about:blank',
      isActive: true,
      content: '<div style="background: #1a1a1a; color: #00ff88; padding: 40px; text-align: center;"><h2>🌐 Secure Anonymous Browser</h2><p>Ready for covert operations</p></div>'
    };
    
    setTabs(prev => [...prev.map(t => ({ ...t, isActive: false })), newTab]);
    setActiveTabId(newTab.id);
  };

  const closeTab = (tabId: string) => {
    if (tabs.length === 1) return; // Don't close last tab
    
    setTabs(prev => {
      const filtered = prev.filter(t => t.id !== tabId);
      if (tabId === activeTabId && filtered.length > 0) {
        filtered[0].isActive = true;
        setActiveTabId(filtered[0].id);
      }
      return filtered;
    });
  };

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  return (
    <div className="h-full bg-terminal-bg text-terminal-text">
      {/* Browser Controls */}
      <div className="bg-terminal-surface border-b border-terminal-border p-2">
        <div className="flex items-center gap-2 mb-2">
          <Button size="sm" variant="ghost" className="p-1">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="p-1">
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="p-1">
            <RotateCcw className="w-4 h-4" />
          </Button>
          
          <div className="flex-1 flex items-center gap-2 mx-4">
            {isSecure ? (
              <Lock className="w-4 h-4 text-green-400" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-400" />
            )}
            <Input
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && navigateToUrl(urlInput)}
              className="bg-terminal-bg border-terminal-border text-terminal-text"
              placeholder="Enter URL or .onion address..."
            />
            <Button 
              size="sm" 
              onClick={() => navigateToUrl(urlInput)}
              className="bg-glow-primary text-terminal-bg"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
          
          <Button size="sm" variant="ghost" className="p-1">
            <Star className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="p-1">
            <Shield className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="p-1" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Tab Bar */}
        <div className="flex items-center gap-1">
          {tabs.map(tab => (
            <div
              key={tab.id}
              className={`flex items-center gap-2 px-3 py-1 rounded-t cursor-pointer ${
                tab.id === activeTabId 
                  ? 'bg-terminal-bg border-t border-l border-r border-terminal-border' 
                  : 'bg-terminal-surface hover:bg-terminal-bg/50'
              }`}
              onClick={() => setActiveTabId(tab.id)}
            >
              <Globe className="w-3 h-3" />
              <span className="text-xs max-w-[150px] truncate">{tab.title}</span>
              {tabs.length > 1 && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="p-0 h-4 w-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
            </div>
          ))}
          <Button
            size="sm"
            variant="ghost"
            className="p-1"
            onClick={createNewTab}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Browser Content */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div 
            className="h-full"
            dangerouslySetInnerHTML={{ 
              __html: activeTab?.content || '<div style="background: #1a1a1a; color: #00ff88; padding: 40px; text-align: center;"><h2>Loading...</h2></div>' 
            }}
          />
        </ScrollArea>
      </div>

      {/* Quick Access Bookmarks */}
      <div className="bg-terminal-surface border-t border-terminal-border p-2">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-xs text-muted-foreground whitespace-nowrap">Quick Access:</span>
          {[
            'http://3g2upl4pq6kufc4m.onion',
            'https://mail.protonmail.com',
            'https://shodan.io',
            'https://haveibeenpwned.com'
          ].map(url => (
            <Button
              key={url}
              size="sm"
              variant="outline"
              className="text-xs whitespace-nowrap"
              onClick={() => navigateToUrl(url)}
            >
              {url.includes('onion') ? '🧅' : url.includes('shodan') ? '🔍' : url.includes('proton') ? '📧' : '🛡️'}
              {url.split('/')[2]?.substring(0, 15)}...
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};