# SOC Lab - Quick Start Guide

Snelle installatie instructies voor ervaren gebruikers.

---

## 🚀 Ubuntu Server/Desktop (Snel)

```bash
# 1. Update systeem
sudo apt update && sudo apt upgrade -y

# 2. Installeer Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker

# 3. Download SOC Lab
git clone https://github.com/jouw-organisatie/soc-lab.git ~/soc-lab
cd ~/soc-lab

# 4. Start installatie
chmod +x install.sh && sudo ./install.sh

# 5. Toegang
# Open browser: http://localhost:5500
```

---

## 🖥️ Windows 11 (Snel)

```powershell
# 1. Installeer WSL2 (PowerShell Admin)
wsl --install -d Ubuntu-22.04

# Herstart computer

# 2. Start Ubuntu en installeer Docker
wsl -d Ubuntu-22.04
```

```bash
# In WSL Ubuntu:
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# 3. Download SOC Lab
git clone https://github.com/jouw-organisatie/soc-lab.git ~/soc-lab
cd ~/soc-lab

# 4. Start installatie
chmod +x install.sh && sudo ./install.sh

# 5. Toegang
# Vind WSL IP: ip addr show eth0
# Open browser: http://[WSL-IP]:5500
```

---

## 📋 Commando Overzicht

### Dagelijks Gebruik

```bash
# Start SOC Lab
cd ~/soc-lab && docker compose up -d

# Stop SOC Lab
cd ~/soc-lab && docker compose down

# Herstart
cd ~/soc-lab && docker compose restart

# Logs bekijken
cd ~/soc-lab && docker compose logs -f [service]

# Status
cd ~/soc-lab && docker compose ps
```

### Poorten

| Service | Poort | URL |
|---------|-------|-----|
| Portal | 5500 | http://localhost:5500 |
| Wazuh | 443 | https://localhost |
| Portainer | 9443 | https://localhost:9443 |
| MISP | 8443 | https://localhost:8443 |
| Shuffle | 3443 | http://localhost:3443 |
| TheHive | 9000 | http://localhost:9000 |
| Velociraptor | 8889 | https://localhost:8889 |
| Arkime | 8005 | http://localhost:8005 |
| CyberChef | 7020 | http://localhost:7020 |

### Default Credentials

| Tool | Gebruiker | Wachtwoord |
|------|-----------|------------|
| Wazuh | admin | admin |
| MISP | admin@admin.test | admin |
| TheHive | admin@thehive.local | secret |
| Shuffle | admin | admin |
| Velociraptor | admin | admin |
| Portainer | admin | soclab123 |

---

## 🔧 Problemen?

```bash
# Docker werkt niet
sudo systemctl start docker

# Containers starten niet
docker compose down && docker compose up -d

# Logs bekijken
docker compose logs [service-name]

# Alles resetten
docker compose down -v
docker compose up -d
```

---

Meer details: [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md)
