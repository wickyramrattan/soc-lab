import { useState, useEffect } from 'react';
import { 
  Shield, 
  Activity, 
  Search, 
  Brain, 
  Zap, 
  Terminal, 
  Globe, 
  Lock,
  Server,
  Network,
  FileSearch,
  Cpu,
  ChevronRight,
  ExternalLink,
  Play,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  Database,
  Code,
  Users,
  Clock,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { toast } from 'sonner';
import './App.css';

// Tool categorieën en data
const toolCategories = [
  {
    id: 'siem',
    name: 'SIEM & Monitoring',
    icon: Activity,
    color: 'from-cyan-500 to-blue-500',
    description: 'Real-time monitoring en log analyse tools',
    tools: [
      { name: 'Wazuh', port: 443, path: '/', description: 'Host-based intrusion detection en log analyse', status: 'online', icon: Shield },
      { name: 'Suricata', port: 9200, path: '/', description: 'Network intrusion detection en prevention', status: 'online', icon: Network },
      { name: 'EveBox', port: 5636, path: '/', description: 'Suricata event en alert management', status: 'online', icon: FileSearch },
    ]
  },
  {
    id: 'dfir',
    name: 'DFIR & Forensics',
    icon: Search,
    color: 'from-purple-500 to-pink-500',
    description: 'Digital forensics en incident response tools',
    tools: [
      { name: 'Velociraptor', port: 8889, path: '/', description: 'Endpoint visibility en digital forensics', status: 'online', icon: Cpu },
      { name: 'Arkime', port: 8005, path: '/', description: 'Full packet capture en network analysis', status: 'online', icon: Database },
      { name: 'Wireshark', port: 3000, path: '/', description: 'Network protocol analyzer', status: 'online', icon: Network },
    ]
  },
  {
    id: 'cti',
    name: 'Threat Intelligence',
    icon: Brain,
    color: 'from-amber-500 to-orange-500',
    description: 'Threat intelligence en threat modeling',
    tools: [
      { name: 'MISP', port: 443, path: '/misp', description: 'Threat intelligence platform', status: 'online', icon: Globe },
      { name: 'MITRE Navigator', port: 7013, path: '/', description: 'Threat modeling en visualization', status: 'online', icon: Code },
    ]
  },
  {
    id: 'soar',
    name: 'SOAR & Automation',
    icon: Zap,
    color: 'from-emerald-500 to-teal-500',
    description: 'Security orchestration en automation',
    tools: [
      { name: 'Shuffle', port: 3443, path: '/', description: 'Security orchestration en automation', status: 'online', icon: Play },
      { name: 'TheHive', port: 9000, path: '/', description: 'Incident response platform', status: 'online', icon: AlertTriangle },
      { name: 'Cortex', port: 9001, path: '/', description: 'Observable analysis engine', status: 'online', icon: Search },
    ]
  },
  {
    id: 'utils',
    name: 'Utilities & Management',
    icon: Terminal,
    color: 'from-rose-500 to-red-500',
    description: 'Handige tools voor beheer en analyse',
    tools: [
      { name: 'CyberChef', port: 7020, path: '/', description: 'Cyber Swiss Army knife', status: 'online', icon: Code },
      { name: 'Portainer', port: 9443, path: '/', description: 'Container management interface', status: 'online', icon: Server },
      { name: 'FleetDM', port: 8412, path: '/', description: 'Device management en osquery fleet', status: 'online', icon: Users },
      { name: 'Caldera', port: 8888, path: '/', description: 'Adversary emulation platform', status: 'online', icon: Terminal },
    ]
  }
];

const quickStats = [
  { label: 'Tools Online', value: '15+', icon: CheckCircle, color: 'text-emerald-400' },
  { label: 'Threat Rules', value: '3.5K+', icon: Shield, color: 'text-cyan-400' },
  { label: 'IOC Database', value: '280K+', icon: Database, color: 'text-purple-400' },
  { label: 'Platform Status', value: 'Active', icon: Activity, color: 'text-emerald-400' },
];

const labExercises = [
  {
    id: 1,
    title: 'SIEM Log Analyse',
    description: 'Leer hoe je logs analyseert met Wazuh en verdachte activiteiten detecteert.',
    difficulty: 'Beginner',
    duration: '45 min',
    category: 'SIEM',
    icon: Activity
  },
  {
    id: 2,
    title: 'Network Traffic Analysis',
    description: 'Analyseer netwerkverkeer met Suricata en Arkime om anomalies te detecteren.',
    difficulty: 'Intermediate',
    duration: '60 min',
    category: 'Network',
    icon: Network
  },
  {
    id: 3,
    title: 'Endpoint Forensics',
    description: 'Voer digital forensics uit met Velociraptor op gecompromitteerde endpoints.',
    difficulty: 'Advanced',
    duration: '90 min',
    category: 'DFIR',
    icon: Search
  },
  {
    id: 4,
    title: 'Threat Intelligence Investigation',
    description: 'Onderzoek IOCs en gebruik MISP voor threat intelligence sharing.',
    difficulty: 'Intermediate',
    duration: '50 min',
    category: 'CTI',
    icon: Brain
  },
  {
    id: 5,
    title: 'Automated Incident Response',
    description: 'Bouw een SOAR workflow in Shuffle voor geautomatiseerde respons.',
    difficulty: 'Advanced',
    duration: '75 min',
    category: 'SOAR',
    icon: Zap
  },
  {
    id: 6,
    title: 'Malware Analysis',
    description: 'Analyseer verdachte bestanden met YARA rules en CyberChef.',
    difficulty: 'Intermediate',
    duration: '55 min',
    category: 'Analysis',
    icon: FileSearch
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openTool = (tool: typeof toolCategories[0]['tools'][0]) => {
    const url = `https://localhost:${tool.port}${tool.path}`;
    window.open(url, '_blank');
    toast.info(`${tool.name} wordt geopend...`, {
      description: `Verbinding maken met poort ${tool.port}`,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Intermediate': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Advanced': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] grid-pattern">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0f1c]/95 backdrop-blur-md border-b border-cyan-500/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center glow-cyan">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">SOC Lab Portal</h1>
                <p className="text-xs text-slate-400">Cybersecurity Training Platform</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {['Dashboard', 'Tools', 'Lab Oefeningen', 'Documentatie'].map((item) => (
                <Button
                  key={item}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const tabMap: Record<string, string> = {
                      'Dashboard': 'dashboard',
                      'Tools': 'tools',
                      'Lab Oefeningen': 'exercises',
                      'Documentatie': 'docs'
                    };
                    setActiveTab(tabMap[item]);
                  }}
                  className={`text-sm font-medium transition-colors ${
                    (item === 'Dashboard' && activeTab === 'dashboard') ||
                    (item === 'Tools' && activeTab === 'tools') ||
                    (item === 'Lab Oefeningen' && activeTab === 'exercises') ||
                    (item === 'Documentatie' && activeTab === 'docs')
                      ? 'text-cyan-400 bg-cyan-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item}
                </Button>
              ))}
            </nav>

            {/* Mobile Menu */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-slate-400">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-[#0f1629] border-l border-cyan-500/20">
                <div className="flex flex-col gap-2 mt-8">
                  {['Dashboard', 'Tools', 'Lab Oefeningen', 'Documentatie'].map((item) => (
                    <Button
                      key={item}
                      variant="ghost"
                      onClick={() => {
                        const tabMap: Record<string, string> = {
                          'Dashboard': 'dashboard',
                          'Tools': 'tools',
                          'Lab Oefeningen': 'exercises',
                          'Documentatie': 'docs'
                        };
                        setActiveTab(tabMap[item]);
                        setSidebarOpen(false);
                      }}
                      className="justify-start text-slate-400 hover:text-white hover:bg-white/5"
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="hidden">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="exercises">Lab Oefeningen</TabsTrigger>
            <TabsTrigger value="docs">Documentatie</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-cyan-500/20 p-8 md:p-12">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
              <div className="relative z-10">
                <Badge className="mb-4 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                  <Lock className="w-3 h-3 mr-1" /> Educational Environment
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Welkom bij het <span className="gradient-text">SOC Lab</span>
                </h2>
                <p className="text-lg text-slate-400 max-w-2xl mb-6">
                  Een uitgebreide cybersecurity training platform met 15+ geïntegreerde tools 
                  voor SIEM, DFIR, Threat Intelligence en Security Automation.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={() => setActiveTab('tools')}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white"
                  >
                    <Terminal className="w-4 h-4 mr-2" /> Start Lab
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('exercises')}
                    className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                  >
                    <BookOpen className="w-4 h-4 mr-2" /> Oefeningen
                  </Button>
                </div>
              </div>
            </section>

            {/* Stats Grid */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickStats.map((stat, index) => (
                <Card key={index} className="bg-slate-900/50 border-slate-700/50 card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                      </div>
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </section>

            {/* Quick Access */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Snelle Toegang</h3>
                <Button 
                  variant="ghost" 
                  onClick={() => setActiveTab('tools')}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  Alle Tools <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {toolCategories.slice(0, 3).map((category) => (
                  <Card 
                    key={category.id} 
                    className="bg-slate-900/50 border-slate-700/50 card-hover cursor-pointer group"
                    onClick={() => setActiveTab('tools')}
                  >
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2">{category.name}</h4>
                      <p className="text-sm text-slate-400 mb-4">{category.description}</p>
                      <div className="flex items-center gap-2">
                        {category.tools.slice(0, 3).map((tool) => (
                          <Badge key={tool.name} variant="secondary" className="bg-slate-800 text-slate-300 text-xs">
                            {tool.name}
                          </Badge>
                        ))}
                        {category.tools.length > 3 && (
                          <Badge variant="secondary" className="bg-slate-800 text-slate-300 text-xs">
                            +{category.tools.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Featured Exercises */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Uitgelichte Oefeningen</h3>
                <Button 
                  variant="ghost" 
                  onClick={() => setActiveTab('exercises')}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  Alle Oefeningen <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {labExercises.slice(0, 3).map((exercise) => (
                  <Card key={exercise.id} className="bg-slate-900/50 border-slate-700/50 card-hover">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center`}>
                          <exercise.icon className="w-5 h-5 text-cyan-400" />
                        </div>
                        <Badge className={getDifficultyColor(exercise.difficulty)}>
                          {exercise.difficulty}
                        </Badge>
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2">{exercise.title}</h4>
                      <p className="text-sm text-slate-400 mb-4">{exercise.description}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" /> {exercise.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" /> {exercise.category}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools" className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-white mb-2">Security Tools</h2>
              <p className="text-slate-400 mb-8">Klik op een tool om deze te openen in een nieuw tabblad.</p>
              
              <div className="space-y-8">
                {toolCategories.map((category) => (
                  <div key={category.id}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                        <category.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                        <p className="text-sm text-slate-400">{category.description}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.tools.map((tool) => (
                        <Card 
                          key={tool.name} 
                          className="bg-slate-900/50 border-slate-700/50 card-hover cursor-pointer group relative overflow-hidden"
                          onClick={() => openTool(tool)}
                        >
                          <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${category.color}`} />
                          <CardContent className="p-5">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                                  <tool.icon className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">{tool.name}</h4>
                                  <p className="text-xs text-slate-500">Poort {tool.port}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                              </div>
                            </div>
                            <p className="text-sm text-slate-400 mt-3">{tool.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <Separator className="mt-8 bg-slate-700/50" />
                  </div>
                ))}
              </div>
            </section>
          </TabsContent>

          {/* Exercises Tab */}
          <TabsContent value="exercises" className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-white mb-2">Lab Oefeningen</h2>
              <p className="text-slate-400 mb-8">Praktische oefeningen om je SOC skills te ontwikkelen.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {labExercises.map((exercise) => (
                  <Card key={exercise.id} className="bg-slate-900/50 border-slate-700/50 card-hover overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                          <exercise.icon className="w-6 h-6 text-cyan-400" />
                        </div>
                        <Badge className={getDifficultyColor(exercise.difficulty)}>
                          {exercise.difficulty}
                        </Badge>
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2">{exercise.title}</h4>
                      <p className="text-sm text-slate-400 mb-4">{exercise.description}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" /> {exercise.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" /> {exercise.category}
                        </span>
                      </div>
                      <Button 
                        className="w-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 text-cyan-400 border border-cyan-500/30"
                        onClick={() => toast.info('Oefening wordt geladen...', { description: exercise.title })}
                      >
                        <Play className="w-4 h-4 mr-2" /> Start Oefening
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          {/* Documentation Tab */}
          <TabsContent value="docs" className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-white mb-2">Documentatie</h2>
              <p className="text-slate-400 mb-8">Handleidingen en documentatie voor het SOC Lab.</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-slate-900/50 border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-cyan-400" /> Getting Started
                    </CardTitle>
                    <CardDescription>Basis handleiding voor het gebruik van het SOC Lab</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-white">1. Platform Overzicht</h4>
                      <p className="text-sm text-slate-400">
                        Het SOC Lab is een containerized cybersecurity training platform met 15+ geïntegreerde tools 
                        voor SIEM, DFIR, CTI, SOAR en netwerk analyse.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-white">2. Toegang tot Tools</h4>
                      <p className="text-sm text-slate-400">
                        Alle tools zijn toegankelijk via de Tools tab. Klik op een tool om deze te openen in een nieuw tabblad.
                        Standaard credentials zijn: <code className="bg-slate-800 px-2 py-1 rounded">admin</code> / <code className="bg-slate-800 px-2 py-1 rounded">soclab</code>
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-white">3. Lab Oefeningen</h4>
                      <p className="text-sm text-slate-400">
                        Start met de Lab Oefeningen om praktische ervaring op te doen met de verschillende tools 
                        en technieken in een veilige omgeving.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-purple-400" /> Default Credentials
                    </CardTitle>
                    <CardDescription>Login gegevens voor de verschillende tools</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-64">
                      <div className="space-y-3">
                        {[
                          { tool: 'Wazuh', user: 'admin', pass: 'admin' },
                          { tool: 'MISP', user: 'admin@admin.test', pass: 'admin' },
                          { tool: 'TheHive', user: 'admin@thehive.local', pass: 'secret' },
                          { tool: 'Cortex', user: 'admin@cortex.local', pass: 'secret' },
                          { tool: 'Shuffle', user: 'admin', pass: 'admin' },
                          { tool: 'Velociraptor', user: 'admin', pass: 'admin' },
                          { tool: 'Arkime', user: 'admin', pass: 'password' },
                          { tool: 'Portainer', user: 'admin', pass: 'soclab123' },
                          { tool: 'FleetDM', user: 'admin', pass: 'admin123#' },
                          { tool: 'Caldera', user: 'admin', pass: 'admin' },
                          { tool: 'EveBox', user: 'admin', pass: 'evebox' },
                        ].map((cred, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                            <span className="font-medium text-white">{cred.tool}</span>
                            <div className="text-sm text-slate-400">
                              <span className="text-cyan-400">{cred.user}</span> / <span className="text-purple-400">{cred.pass}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Shield className="w-5 h-5 text-emerald-400" /> Belangrijke Veiligheidsinformatie
                    </CardTitle>
                    <CardDescription>Lees dit zorgvuldig voordat je begint</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-white">Educational Use Only</h4>
                            <p className="text-sm text-slate-400">
                              Dit platform is uitsluitend bedoeld voor educatieve doeleinden en mag niet worden gebruikt 
                              voor productieomgevingen of het verwerken van gevoelige data.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Lock className="w-5 h-5 text-cyan-400 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-white">Default Credentials</h4>
                            <p className="text-sm text-slate-400">
                              Alle tools gebruiken standaard wachtwoorden die bekend zijn. Wijzig deze voor 
                              langdurig gebruik in een geïsoleerde omgeving.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Server className="w-5 h-5 text-purple-400 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-white">Geïsoleerde Omgeving</h4>
                            <p className="text-sm text-slate-400">
                              Zorg ervoor dat dit lab draait in een geïsoleerde netwerkomgeving, 
                              los van productiesystemen.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Activity className="w-5 h-5 text-emerald-400 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-white">Geen Garanties</h4>
                            <p className="text-sm text-slate-400">
                              Dit platform wordt geleverd "as is" zonder enige garanties. 
                              Gebruik is op eigen risico.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-[#0a0f1c]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-cyan-400" />
              <span className="text-slate-400">SOC Lab Portal - Cybersecurity Training Platform</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Alle systemen operationeel
              </span>
              <span>v1.0.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
