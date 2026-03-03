# 🛡️ SOC Lab - Cybersecurity Training Platform

Een uitgebreide, containerized cybersecurity training platform met 15+ geïntegreerde tools voor SIEM, DFIR, Threat Intelligence, SOAR en netwerk analyse.

![SOC Lab Portal](docs/images/portal-preview.png)

## 🎯 Overzicht

SOC Lab is een open-source cybersecurity training platform dat studenten en professionals hands-on ervaring biedt met industry-standard security tools. Het platform is gebouwd met Docker Compose en biedt een moderne web interface voor eenvoudige toegang tot alle tools.

### Belangrijke Kenmerken

- 🚀 **One-Command Deployment** - Complete SOC omgeving in ~30 minuten
- 🎓 **Educatief Gericht** - Vooraf geconfigureerd met sample data
- 🎨 **Moderne Interface** - Dark-themed portal voor eenvoudige tool toegang
- 🔧 **Realistische Setup** - Ervaar echte security tools gebruikt in productie SOCs
- 📊 **Sample Data Inclusief** - Netwerk captures, threat intelligence, detectie rules
- 🔍 **Threat Hunting Ready** - YARA (523+ rules) & Sigma (3,047+ rules) vooraf geïnstalleerd
- 📚 **Leermaterialen** - Uitgebreide documentatie en lab oefeningen
- 🌐 **Gratis & Open Source** - Geen licentiekosten, perfect voor studenten

## 🛡️ Inbegrepen Tools

### SIEM & Monitoring
| Tool | Poort | Beschrijving |
|------|-------|--------------|
| [Wazuh](https://wazuh.com/) | 443 | Host-based intrusion detection en log analyse |
| [Suricata](https://suricata.io/) | - | Network intrusion detection en prevention |
| [EveBox](https://evebox.org/) | 5636 | Suricata event en alert management |

### DFIR & Forensics
| Tool | Poort | Beschrijving |
|------|-------|--------------|
| [Velociraptor](https://docs.velociraptor.app/) | 8889 | Endpoint visibility en digital forensics |
| [Arkime](https://arkime.com/) | 8005 | Full packet capture en network analysis |
| [Wireshark](https://www.wireshark.org/) | 3000 | Network protocol analyzer (web-based) |

### Threat Intelligence
| Tool | Poort | Beschrijving |
|------|-------|--------------|
| [MISP](https://www.misp-project.org/) | 8443 | Threat intelligence platform |
| [MITRE ATT&CK Navigator](https://mitre-attack.github.io/attack-navigator/) | 7013 | Threat modeling en visualization |

### SOAR & Automation
| Tool | Poort | Beschrijving |
|------|-------|--------------|
| [Shuffle](https://shuffler.io/) | 3443 | Security orchestration en automation |
| [TheHive](https://thehive-project.org/) | 9000 | Incident response platform |
| [Cortex](https://thehive-project.org/) | 9001 | Observable analysis engine |

### Utilities & Management
| Tool | Poort | Beschrijving |
|------|-------|--------------|
| [CyberChef](https://gchq.github.io/CyberChef/) | 7020 | Cyber Swiss Army knife |
| [Portainer](https://www.portainer.io/) | 9443 | Container management interface |
| [FleetDM](https://fleetdm.com/) | 8412 | Device management en osquery fleet |
| [Caldera](https://caldera.mitre.org/) | 8888 | Adversary emulation platform |

### Threat Hunting
- **YARA** - 523+ curated rules voor malware detectie
- **Sigma** - 3,047+ detection rules voor SIEMs

## 🚀 Snelle Start

### Systeem Vereisten

| Component | Minimum | Aanbevolen |
|-----------|---------|------------|
| RAM | 8 GB | 16+ GB |
| Opslag | 50 GB | 100+ GB SSD |
| CPU | 4 cores | 8+ cores |
| OS | Linux/Windows | Ubuntu 20.04/22.04 LTS / Windows 11 |
| Netwerk | Geïsoleerd | Geïsoleerd van productie |

### Ondersteunde Platformen

- ✅ **Ubuntu Server** 20.04/22.04/24.04 LTS
- ✅ **Ubuntu Desktop** 20.04/22.04/24.04 LTS  
- ✅ **Windows 11** Pro/Enterprise (met WSL2)

### Installatie

**Snelle installatie (Ubuntu):**
```bash
git clone https://github.com/jouw-organisatie/soc-lab.git
cd soc-lab
sudo ./install.sh
```

**Gedetailleerde installatiehandleidingen:**
- 📖 [Complete Installatie Handleiding](docs/INSTALLATION_GUIDE.md) - Stap-voor-stap voor alle platformen
- ⚡ [Quick Start Guide](docs/QUICK_START.md) - Snelle commando's voor ervaren gebruikers
- 🎓 [Student Handleiding](docs/STUDENT_GUIDE.md) - Handleiding voor studenten

**Toegang tot het Portal:**
Open je browser en ga naar: `http://localhost:5500`

## 📋 Default Credentials

| Tool | Gebruikersnaam | Wachtwoord |
|------|----------------|------------|
| Wazuh | admin | admin |
| MISP | admin@admin.test | admin |
| TheHive | admin@thehive.local | secret |
| Cortex | admin@cortex.local | secret |
| Shuffle | admin | admin |
| Velociraptor | admin | admin |
| Arkime | admin | password |
| Portainer | admin | soclab123 |
| FleetDM | admin | admin123# |
| Caldera | admin | admin |
| EveBox | admin | evebox |

⚠️ **Belangrijk:** Wijzig deze wachtwoorden voor langdurig gebruik!

## 🎓 Lab Oefeningen

Het platform bevat 6 praktische oefeningen:

1. **SIEM Log Analyse** (Beginner, 45 min)
   - Leer logs analyseren met Wazuh
   - Detecteer verdachte activiteiten

2. **Network Traffic Analysis** (Intermediate, 60 min)
   - Analyseer netwerkverkeer met Suricata en Arkime
   - Identificeer anomalies

3. **Endpoint Forensics** (Advanced, 90 min)
   - Voer digital forensics uit met Velociraptor
   - Onderzoek gecompromitteerde endpoints

4. **Threat Intelligence Investigation** (Intermediate, 50 min)
   - Onderzoek IOCs met MISP
   - Deel threat intelligence

5. **Automated Incident Response** (Advanced, 75 min)
   - Bouw SOAR workflows in Shuffle
   - Automatiseer incident respons

6. **Malware Analysis** (Intermediate, 55 min)
   - Analyseer verdachte bestanden
   - Gebruik YARA rules en CyberChef

## 🛠️ Beheer

### Services Starten/Stoppen

```bash
# Start alle services
docker-compose up -d

# Stop alle services
docker-compose down

# Herstart een specifieke service
docker-compose restart wazuh-dashboard

# Bekijk logs
docker-compose logs -f [service-name]
```

### Status Controle

```bash
# Bekijk alle running containers
docker-compose ps

# Systeem resource gebruik
docker stats
```

### Backup & Restore

```bash
# Backup volumes
docker run --rm -v soc-lab_wazuh-data:/data -v $(pwd):/backup alpine tar czf /backup/wazuh-backup.tar.gz -C /data .

# Restore volumes
docker run --rm -v soc-lab_wazuh-data:/data -v $(pwd):/backup alpine sh -c "cd /data && tar xzf /backup/wazuh-backup.tar.gz"
```

## 🔒 Veiligheidsinformatie

⚠️ **WAARSCHUWING: EDUCATIONAL USE ONLY**

Dit platform is uitsluitend bedoeld voor:
- 🎓 Cybersecurity training en certificering
- 🧪 Security tool evaluatie en testing
- 🏫 Academische instellingen en research labs
- 💻 Home lab omgevingen (geïsoleerd van productie)
- 📚 SOC analyst skill development
- 🎯 Capture-the-flag (CTF) oefeningen

**NIET GESCHIKT VOOR:**
- ❌ Productieomgevingen
- ❌ Verwerken van gevoelige data
- ❌ Monitoring van productiesystemen

### Veiligheidsmaatregelen

1. **Geïsoleerde Omgeving** - Draai altijd in een geïsoleerd netwerk
2. **Default Credentials** - Wijzig standaard wachtwoorden
3. **Regelmatige Updates** - Update containers regelmatig
4. **Firewall Rules** - Beperk toegang tot noodzakelijke poorten
5. **Monitoring** - Monitor het lab zelf voor verdachte activiteit

## 🐛 Troubleshooting

### Veelvoorkomende Problemen

**Services starten niet op**
```bash
# Controleer logs
docker-compose logs [service-name]

# Herstart services
docker-compose down
docker-compose up -d
```

**Geheugen problemen**
```bash
# Verhoog Docker memory limit
# Bewerk /etc/docker/daemon.json:
{
  "memory": 16384
}
```

**Netwerk conflicten**
```bash
# Controleer poort conflicten
sudo netstat -tlnp | grep [poort]

# Wijzig poorten in docker-compose.yml indien nodig
```

### Support

- 🐛 [GitHub Issues](https://github.com/jouw-organisatie/soc-lab/issues)
- 📧 Email: support@jouw-organisatie.nl
- 💬 [Discord Community](https://discord.gg/jouw-server)

## 🤝 Bijdragen

We verwelkomen bijdragen! Zie [CONTRIBUTING.md](CONTRIBUTING.md) voor richtlijnen.

1. Fork de repository
2. Maak een feature branch (`git checkout -b feature/amazing-feature`)
3. Commit je wijzigingen (`git commit -m 'Add amazing feature'`)
4. Push naar de branch (`git push origin feature/amazing-feature`)
5. Open een Pull Request

## 📄 Licentie

Dit project is gelicenseerd onder de MIT License - zie [LICENSE](LICENSE) voor details.

## 🙏 Dankwoord

Dit project is geïnspireerd door [CyberBlue](https://github.com/cyberblu3s/CyberBlue) en maakt gebruik van fantastische open-source tools van de cybersecurity community.

Speciale dank aan:
- Het Wazuh team
- TheHive Project
- MITRE ATT&CK team
- Alle contributors van de gebruikte tools

## 📞 Contact

- 🌐 Website: https://jouw-organisatie.nl
- 📧 Email: info@jouw-organisatie.nl
- 🐦 Twitter: [@jouw-organisatie](https://twitter.com/jouw-organisatie)
- 💼 LinkedIn: [Jouw Organisatie](https://linkedin.com/company/jouw-organisatie)

---

<p align="center">
  <strong>Made with ❤️ for the cybersecurity community</strong>
</p>

<p align="center">
  <a href="https://github.com/jouw-organisatie/soc-lab/stargazers">⭐ Star on GitHub</a> |
  <a href="https://github.com/jouw-organisatie/soc-lab/fork">🍴 Fork</a> |
  <a href="https://github.com/jouw-organisatie/soc-lab/issues">🐛 Report Bug</a>
</p>
