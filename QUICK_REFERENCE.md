# SOC Lab - Quick Reference Guide

## 🚀 Snelle Toegang

| Tool | URL | Credentials |
|------|-----|-------------|
| **SOC Lab Portal** | http://localhost:5500 | - |
| Wazuh Dashboard | https://localhost:443 | admin / admin |
| Portainer | https://localhost:9443 | admin / soclab123 |
| MISP | https://localhost:8443 | admin@admin.test / admin |
| MITRE Navigator | http://localhost:7013 | - |
| Shuffle | http://localhost:3443 | admin / admin |
| TheHive | http://localhost:9000 | admin@thehive.local / secret |
| Cortex | http://localhost:9001 | admin@cortex.local / secret |
| Velociraptor | https://localhost:8889 | admin / admin |
| Arkime | http://localhost:8005 | admin / password |
| EveBox | http://localhost:5636 | admin / evebox |
| CyberChef | http://localhost:7020 | - |
| FleetDM | http://localhost:8412 | admin / admin123# |
| Caldera | http://localhost:8888 | admin / admin |
| Wireshark | http://localhost:3000 | - |

## 🛠️ Docker Commands

```bash
# Start alle services
docker-compose up -d

# Stop alle services
docker-compose down

# Herstart specifieke service
docker-compose restart [service-name]

# Bekijk logs
docker-compose logs -f [service-name]

# Status check
docker-compose ps

# Resource gebruik
docker stats

# Update alle images
docker-compose pull
docker-compose up -d
```

## 📊 Service Status

```bash
# Alle running containers
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Container details
docker inspect [container-name]

# Container resource gebruik
docker stats [container-name]
```

## 🔧 Troubleshooting

### Services starten niet
```bash
# Controleer logs
docker-compose logs [service-name]

# Herstart met verbose output
docker-compose up [service-name]

# Reset container
docker-compose rm -f [service-name]
docker-compose up -d [service-name]
```

### Geheugen problemen
```bash
# Vrij geheugen controleren
free -h

# Docker memory gebruik
docker system df

# Opruimen ongebruikte resources
docker system prune -a
```

### Netwerk problemen
```bash
# Netwerk inspecteren
docker network ls
docker network inspect soc-lab_soc-lab

# Poort conflicten controleren
sudo netstat -tlnp | grep [poort]
```

## 💾 Backup & Restore

### Backup
```bash
# Alle volumes backuppen
mkdir -p backups
docker run --rm -v soc-lab_wazuh-data:/data -v $(pwd)/backups:/backup alpine tar czf /backup/wazuh-backup.tar.gz -C /data .
```

### Restore
```bash
# Restore van backup
docker run --rm -v soc-lab_wazuh-data:/data -v $(pwd)/backups:/backup alpine sh -c "cd /data && tar xzf /backup/wazuh-backup.tar.gz"
```

## 📝 Configuratie Bestanden

| Bestand | Locatie | Beschrijving |
|---------|---------|--------------|
| docker-compose.yml | `./` | Hoofd configuratie |
| .env | `./` | Omgevingsvariabelen |
| Wazuh config | `./wazuh/` | Wazuh agent/manager config |
| Suricata config | `./suricata/config/` | Suricata rules & config |
| Velociraptor config | `./velociraptor/config/` | Velociraptor server config |

## 🎯 Lab Oefeningen

| Oefening | Niveau | Duur | Tools |
|----------|--------|------|-------|
| SIEM Log Analyse | Beginner | 45 min | Wazuh |
| Network Traffic Analysis | Intermediate | 60 min | Suricata, Arkime |
| Endpoint Forensics | Advanced | 90 min | Velociraptor |
| Threat Intelligence | Intermediate | 50 min | MISP |
| Automated Incident Response | Advanced | 75 min | Shuffle, TheHive |
| Malware Analysis | Intermediate | 55 min | YARA, CyberChef |

## 🔐 Security Checklist

- [ ] Wijzig alle default wachtwoorden
- [ ] Configureer firewall rules
- [ ] Schakel onnodige services uit
- [ ] Update regelmatig
- [ ] Monitor logs
- [ ] Geïsoleerde netwerk
- [ ] Backup strategie

## 📞 Support

- 🐛 GitHub Issues: https://github.com/jouw-organisatie/soc-lab/issues
- 📧 Email: support@jouw-organisatie.nl
- 💬 Discord: https://discord.gg/jouw-server

---

**Versie:** 1.0.0  
**Laatste update:** 2025-02-25
