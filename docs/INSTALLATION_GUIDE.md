# SOC Lab - Installatie Handleiding

Deze handleiding beschrijft hoe je het SOC Lab installeert op **Ubuntu Server**, **Ubuntu Desktop** en **Windows 11**.

## 📋 Inhoudsopgave

1. [Systeem Vereisten](#systeem-vereisten)
2. [Ubuntu Server Installatie](#ubuntu-server-installatie)
3. [Ubuntu Desktop Installatie](#ubuntu-desktop-installatie)
4. [Windows 11 Installatie](#windows-11-installatie)
5. [Post-Installatie Configuratie](#post-installatie-configuratie)
6. [Troubleshooting](#troubleshooting)

---

## Systeem Vereisten

### Minimum Vereisten

| Component | Minimum | Aanbevolen |
|-----------|---------|------------|
| **RAM** | 8 GB | 16+ GB |
| **Opslag** | 50 GB vrije ruimte | 100+ GB SSD |
| **CPU** | 4 cores | 8+ cores |
| **Netwerk** | Geïsoleerd netwerk | Geïsoleerd van productie |

### Ondersteunde Besturingssystemen

- ✅ Ubuntu Server 20.04 LTS / 22.04 LTS / 24.04 LTS
- ✅ Ubuntu Desktop 20.04 LTS / 22.04 LTS / 24.04 LTS
- ✅ Windows 11 Pro/Enterprise (met WSL2)

---

## Ubuntu Server Installatie

### Stap 1: Systeem Update

```bash
# Log in als root of gebruik sudo
ssh gebruiker@jouw-server-ip

# Update het systeem
sudo apt update && sudo apt upgrade -y

# Installeer basis tools
sudo apt install -y curl wget git vim htop net-tools
```

### Stap 2: Docker Installeren

```bash
# Verwijder oude Docker versies (indien aanwezig)
sudo apt remove -y docker docker-engine docker.io containerd runc

# Installeer dependencies
sudo apt install -y ca-certificates gnupg lsb-release

# Voeg Docker's officiële GPG key toe
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Configureer de repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update en installeer Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Start en enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Voeg gebruiker toe aan docker group
sudo usermod -aG docker $USER

# Controleer installatie
docker --version
docker compose version
```

### Stap 3: SOC Lab Downloaden

```bash
# Maak directory aan
mkdir -p ~/soc-lab
cd ~/soc-lab

# Download de SOC Lab bestanden
# Optie A: Via git clone
git clone https://github.com/jouw-organisatie/soc-lab.git .

# Optie B: Download en extract zip
wget https://github.com/jouw-organisatie/soc-lab/archive/main.zip
unzip main.zip
mv soc-lab-main/* .
rm -rf soc-lab-main main.zip
```

### Stap 4: Installatie Script Uitvoeren

```bash
# Maak het script uitvoerbaar
chmod +x install.sh

# Voer het installatie script uit
sudo ./install.sh
```

Of handmatig:

```bash
# Maak benodigde directories
mkdir -p {wazuh,suricata,velociraptor,misp,shuffle,thehive,cortex,arkime,fleet,caldera,wireshark,ssl}
mkdir -p suricata/{config,logs,rules}
mkdir -p wireshark/captures
mkdir -p velociraptor/config

# Maak environment file
HOST_IP=$(hostname -I | awk '{print $1}')
cat > .env << EOF
HOST_IP=$HOST_IP
SOC_LAB_DIR=$(pwd)
EOF

# Download Docker images
docker compose pull

# Start services
docker compose up -d
```

### Stap 5: Controleer Installatie

```bash
# Controleer of alle containers draaien
docker compose ps

# Bekijk logs
docker compose logs -f portal

# Test toegang
curl http://localhost:5500
```

### Stap 6: Firewall Configuratie (Optioneel)

```bash
# Installeer UFW (indien niet geïnstalleerd)
sudo apt install -y ufw

# Sta SOC Lab poorten toe
sudo ufw allow 5500/tcp    # Portal
sudo ufw allow 443/tcp     # Wazuh
sudo ufw allow 9443/tcp    # Portainer
sudo ufw allow 8443/tcp    # MISP
sudo ufw allow 3443/tcp    # Shuffle
sudo ufw allow 9000/tcp    # TheHive
sudo ufw allow 9001/tcp    # Cortex
sudo ufw allow 8889/tcp    # Velociraptor
sudo ufw allow 8005/tcp    # Arkime
sudo ufw allow 5636/tcp    # EveBox
sudo ufw allow 7020/tcp    # CyberChef
sudo ufw allow 8412/tcp    # FleetDM
sudo ufw allow 8888/tcp    # Caldera
sudo ufw allow 3000/tcp    # Wireshark
sudo ufw allow 7013/tcp    # MITRE Navigator

# Enable firewall
sudo ufw enable

# Controleer status
sudo ufw status
```

---

## Ubuntu Desktop Installatie

### Stap 1: Systeem Update

```bash
# Open een terminal (Ctrl+Alt+T)

# Update het systeem
sudo apt update && sudo apt upgrade -y

# Installeer basis tools
sudo apt install -y curl wget git vim htop net-tools
```

### Stap 2: Docker Installeren

```bash
# Verwijder oude Docker versies
sudo apt remove -y docker docker-engine docker.io containerd runc

# Installeer dependencies
sudo apt install -y ca-certificates gnupg lsb-release

# Voeg Docker's officiële GPG key toe
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Configureer de repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update en installeer Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Start Docker
sudo systemctl start docker
sudo systemctl enable docker

# Voeg gebruiker toe aan docker group
sudo usermod -aG docker $USER

# Controleer installatie
docker --version
docker compose version
```

### Stap 3: Docker Desktop (Optioneel maar Aanbevolen)

```bash
# Download Docker Desktop
wget https://desktop.docker.com/linux/main/amd64/docker-desktop-4.28.0-amd64.deb

# Installeer
sudo apt install -y ./docker-desktop-4.28.0-amd64.deb

# Start Docker Desktop
# Zoek naar "Docker Desktop" in applicatiemenu

# Verwijder installatiebestand
rm docker-desktop-4.28.0-amd64.deb
```

### Stap 4: SOC Lab Downloaden

```bash
# Maak directory aan in home
mkdir -p ~/soc-lab
cd ~/soc-lab

# Download de SOC Lab bestanden
git clone https://github.com/jouw-organisatie/soc-lab.git .

# Of download zip
# wget https://github.com/jouw-organisatie/soc-lab/archive/main.zip
# unzip main.zip
# mv soc-lab-main/* .
```

### Stap 5: Installatie

```bash
# Maak het script uitvoerbaar
chmod +x install.sh

# Voer installatie uit
sudo ./install.sh
```

### Stap 6: Start het Portal

```bash
# Open browser en ga naar
http://localhost:5500

# Of via commando
xdg-open http://localhost:5500
```

---

## Windows 11 Installatie

Windows 11 vereist WSL2 (Windows Subsystem for Linux) om Docker te draaien.

### Stap 1: WSL2 Installeren

#### Optie A: Via PowerShell (Administrator)

```powershell
# Open PowerShell als Administrator
# Rechtsklik Start → Windows Terminal (Admin) of PowerShell (Admin)

# Installeer WSL met Ubuntu
wsl --install -d Ubuntu-22.04

# Herstart de computer wanneer gevraagd
```

#### Optie B: Handmatige Installatie

```powershell
# Enable WSL
 dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

# Enable Virtual Machine Platform
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

# Herstart de computer

# Download WSL2 Kernel update
# Ga naar: https://aka.ms/wsl2kernel
# Download en installeer het update package

# Stel WSL2 als default in
wsl --set-default-version 2

# Installeer Ubuntu uit Microsoft Store
# Zoek "Ubuntu 22.04 LTS" in Microsoft Store
# Klik op "Installeren"
```

### Stap 2: Ubuntu Configureren in WSL2

```bash
# Start Ubuntu vanuit Start Menu
# Of via PowerShell: wsl -d Ubuntu-22.04

# Configureer gebruiker (eerste start)
# Voer gebruikersnaam en wachtwoord in

# Update Ubuntu
sudo apt update && sudo apt upgrade -y

# Installeer basis tools
sudo apt install -y curl wget git vim htop net-tools
```

### Stap 3: Docker Installeren in WSL2

```bash
# Verwijder oude Docker versies
sudo apt remove -y docker docker-engine docker.io containerd runc

# Installeer dependencies
sudo apt install -y ca-certificates gnupg lsb-release

# Voeg Docker's officiële GPG key toe
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Configureer de repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update en installeer Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Configureer Docker om zonder sudo te werken
sudo usermod -aG docker $USER

# Start Docker service
sudo service docker start

# Controleer installatie
docker --version
docker compose version
```

### Stap 4: Docker Desktop voor Windows (Aanbevolen)

```powershell
# Download Docker Desktop
# Ga naar: https://www.docker.com/products/docker-desktop
# Download "Docker Desktop for Windows"

# Installeer Docker Desktop
# Dubbelklik op het gedownloade bestand
# Volg de installatiewizard

# Configureer Docker Desktop
# Open Docker Desktop
# Ga naar Settings → Resources → WSL Integration
# Enable "Integrate with my default WSL distro"
# Klik "Apply & Restart"
```

### Stap 5: SOC Lab Downloaden

```bash
# In WSL Ubuntu terminal

# Maak directory aan
mkdir -p ~/soc-lab
cd ~/soc-lab

# Download SOC Lab
git clone https://github.com/jouw-organisatie/soc-lab.git .

# Of download via Windows en kopieer naar WSL
# In Windows PowerShell:
# cd C:\Users\%USERNAME%\Downloads
# wget https://github.com/jouw-organisatie/soc-lab/archive/main.zip -OutFile soc-lab.zip
# Expand-Archive soc-lab.zip -DestinationPath .\soc-lab

# Kopieer naar WSL:
# cp -r /mnt/c/Users/$USER/Downloads/soc-lab/* ~/soc-lab/
```

### Stap 6: Installatie

```bash
# In WSL Ubuntu terminal
cd ~/soc-lab

# Maak script uitvoerbaar
chmod +x install.sh

# Voer installatie uit
sudo ./install.sh
```

### Stap 7: Toegang vanuit Windows

```powershell
# Vind WSL IP adres
wsl hostname -I

# Of in WSL:
ip addr show eth0 | grep "inet " | awk '{print $2}' | cut -d/ -f1

# Open browser in Windows
# Ga naar: http://[WSL-IP]:5500
# Bijvoorbeeld: http://172.25.123.45:5500
```

#### Port Forwarding (Optioneel)

```powershell
# Open PowerShell als Administrator

# Forward poort van WSL naar Windows
netsh interface portproxy add v4tov4 listenport=5500 listenaddress=0.0.0.0 connectport=5500 connectaddress=[WSL-IP]

# Voorbeeld:
netsh interface portproxy add v4tov4 listenport=5500 listenaddress=0.0.0.0 connectport=5500 connectaddress=172.25.123.45

# Nu toegankelijk via:
# http://localhost:5500
```

---

## Post-Installatie Configuratie

### 1. Wachtwoorden Wijzigen

```bash
# Log in op elke tool en wijzig default wachtwoorden
# Zie QUICK_REFERENCE.md voor de lijst
```

### 2. Wazuh Configureren

```bash
# Ga naar Wazuh Dashboard
# https://localhost:443

# Default: admin / admin

# Configureer:
# - Agents toevoegen
# - Rules aanpassen
# - Alerts configureren
```

### 3. MISP Feeds Configureren

```bash
# In WSL/Server terminal
cd ~/soc-lab

# Configureer threat feeds
bash misp/configure-threat-feeds.sh
```

### 4. Backup Instellen

```bash
# Maak backup script
cat > ~/soc-lab/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/backup/soc-lab/$(date +%Y%m%d)"
mkdir -p "$BACKUP_DIR"

# Backup volumes
docker run --rm -v soc-lab_wazuh-data:/data -v "$BACKUP_DIR":/backup alpine tar czf /backup/wazuh-backup.tar.gz -C /data .
docker run --rm -v soc-lab_misp-data:/data -v "$BACKUP_DIR":/backup alpine tar czf /backup/misp-backup.tar.gz -C /data .
docker run --rm -v soc-lab_thehive-data:/data -v "$BACKUP_DIR":/backup alpine tar czf /backup/thehive-backup.tar.gz -C /data .

echo "Backup completed: $BACKUP_DIR"
EOF

chmod +x ~/soc-lab/backup.sh

# Voeg toe aan crontab voor dagelijkse backup
crontab -e
# Voeg toe:
# 0 2 * * * /home/gebruiker/soc-lab/backup.sh
```

### 5. Auto-Start Configureren

```bash
# Voor Ubuntu Server/Desktop
# Maak systemd service

sudo tee /etc/systemd/system/soc-lab.service << 'EOF'
[Unit]
Description=SOC Lab Platform
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/gebruiker/soc-lab
ExecStart=/usr/bin/docker compose up -d
ExecStop=/usr/bin/docker compose down
User=gebruiker

[Install]
WantedBy=multi-user.target
EOF

# Enable service
sudo systemctl enable soc-lab.service
sudo systemctl start soc-lab.service
```

---

## Troubleshooting

### Docker Start Niet

```bash
# Controleer Docker status
sudo systemctl status docker

# Start Docker
sudo systemctl start docker

# Herstart Docker
sudo systemctl restart docker
```

### Containers Starten Niet

```bash
# Controleer logs
cd ~/soc-lab
docker compose logs

# Specifieke service logs
docker compose logs wazuh-dashboard

# Herstart services
docker compose down
docker compose up -d
```

### Geheugen Problemen

```bash
# Controleer geheugen gebruik
free -h
docker stats

# Verhoog swap (indien nodig)
sudo fallocate -l 8G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### Windows WSL Problemen

```powershell
# Reset WSL (LET OP: verwijdert alle WSL data!)
wsl --unregister Ubuntu-22.04
wsl --install -d Ubuntu-22.04

# Update WSL
wsl --update

# Controleer WSL status
wsl --status
wsl --list --verbose
```

### Netwerk Problemen

```bash
# Controleer of poorten in gebruik zijn
sudo netstat -tlnp | grep 5500

# Controleer firewall
sudo ufw status

# Reset Docker netwerk
docker network prune
```

---

## Nuttige Commando's

### Docker Compose

```bash
# Start alle services
docker compose up -d

# Stop alle services
docker compose down

# Herstart specifieke service
docker compose restart [service-name]

# Bekijk logs
docker compose logs -f [service-name]

# Status check
docker compose ps

# Update images
docker compose pull
docker compose up -d
```

### Systeem Monitoring

```bash
# Docker stats
docker stats

# Systeem resources
htop

# Disk gebruik
df -h
du -sh /var/lib/docker

# Geheugen
free -h
```

---

## Support

- 🐛 [GitHub Issues](https://github.com/jouw-organisatie/soc-lab/issues)
- 📧 Email: support@jouw-organisatie.nl
- 💬 [Discord Community](https://discord.gg/jouw-server)

---

**Versie:** 1.0.0  
**Laatste update:** 2025-02-25
