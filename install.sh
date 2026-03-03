#!/bin/bash

# SOC Lab - Installation Script
# This script installs and configures the SOC Lab platform

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SOC_LAB_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="/var/log/soc-lab-install.log"

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" | tee -a "$LOG_FILE"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$LOG_FILE"
}

# Check if running as root
check_root() {
    if [[ $EUID -ne 0 ]]; then
        error "This script must be run as root or with sudo"
        exit 1
    fi
}

# Check system requirements
check_requirements() {
    log "Checking system requirements..."
    
    # Check RAM
    TOTAL_RAM=$(free -m | awk '/^Mem:/{print $2}')
    if [ "$TOTAL_RAM" -lt 8192 ]; then
        warning "Recommended RAM is 16GB+. Current: ${TOTAL_RAM}MB"
        read -p "Continue anyway? (y/N) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
    
    # Check disk space
    FREE_SPACE=$(df -m . | awk 'NR==2 {print $4}')
    if [ "$FREE_SPACE" -lt 51200 ]; then
        warning "Recommended free disk space is 50GB+. Current: ${FREE_SPACE}MB"
        read -p "Continue anyway? (y/N) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
    
    success "System requirements check completed"
}

# Install Docker
install_docker() {
    log "Installing Docker..."
    
    if command -v docker &> /dev/null; then
        warning "Docker is already installed"
        docker --version
        return
    fi
    
    # Install Docker
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    
    # Start Docker service
    systemctl start docker
    systemctl enable docker
    
    # Add current user to docker group
    usermod -aG docker $SUDO_USER 2>/dev/null || true
    
    success "Docker installed successfully"
}

# Install Docker Compose
install_docker_compose() {
    log "Installing Docker Compose..."
    
    if command -v docker-compose &> /dev/null; then
        warning "Docker Compose is already installed"
        docker-compose --version
        return
    fi
    
    # Install Docker Compose
    DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep 'tag_name' | cut -d'"' -f4)
    curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    
    success "Docker Compose installed successfully"
}

# Create necessary directories
create_directories() {
    log "Creating necessary directories..."
    
    mkdir -p "$SOC_LAB_DIR"/{wazuh,suricata,velociraptor,misp,shuffle,thehive,cortex,arkime,fleet,caldera,wireshark,ssl}
    mkdir -p "$SOC_LAB_DIR/suricata"/{config,logs,rules}
    mkdir -p "$SOC_LAB_DIR/wireshark/captures"
    mkdir -p "$SOC_LAB_DIR/velociraptor/config"
    
    success "Directories created"
}

# Setup Suricata configuration
setup_suricata() {
    log "Setting up Suricata configuration..."
    
    # Download default Suricata configuration
    curl -o "$SOC_LAB_DIR/suricata/config/suricata.yaml" https://raw.githubusercontent.com/OISF/suricata/master/suricata.yaml.in 2>/dev/null || \
        warning "Could not download Suricata config, using default"
    
    success "Suricata configuration setup completed"
}

# Create environment file
create_env_file() {
    log "Creating environment configuration..."
    
    # Get host IP
    HOST_IP=$(hostname -I | awk '{print $1}')
    
    cat > "$SOC_LAB_DIR/.env" << EOF
# SOC Lab Environment Configuration
HOST_IP=$HOST_IP
SOC_LAB_DIR=$SOC_LAB_DIR

# Default Credentials (Change these for production!)
WAZUH_ADMIN_USER=admin
WAZUH_ADMIN_PASS=admin

MISP_ADMIN_EMAIL=admin@admin.test
MISP_ADMIN_PASS=admin

THEHIVE_ADMIN_EMAIL=admin@thehive.local
THEHIVE_ADMIN_PASS=secret

CORTEX_ADMIN_EMAIL=admin@cortex.local
CORTEX_ADMIN_PASS=secret

SHUFFLE_ADMIN_USER=admin
SHUFFLE_ADMIN_PASS=admin

VELociraptor_ADMIN_USER=admin
VELociraptor_ADMIN_PASS=admin

ARKIME_ADMIN_USER=admin
ARKIME_ADMIN_PASS=password

PORTAINER_ADMIN_PASS=soclab123

FLEET_ADMIN_USER=admin
FLEET_ADMIN_PASS=admin123#

CALDERA_ADMIN_USER=admin
CALDERA_ADMIN_PASS=admin

EVEBOX_ADMIN_USER=admin
EVEBOX_ADMIN_PASS=evebox
EOF
    
    success "Environment file created at $SOC_LAB_DIR/.env"
}

# Pull Docker images
pull_images() {
    log "Pulling Docker images..."
    
    cd "$SOC_LAB_DIR"
    docker-compose pull 2>&1 | tee -a "$LOG_FILE"
    
    success "Docker images pulled successfully"
}

# Start services
start_services() {
    log "Starting SOC Lab services..."
    
    cd "$SOC_LAB_DIR"
    docker-compose up -d 2>&1 | tee -a "$LOG_FILE"
    
    success "Services started successfully"
}

# Print access information
print_access_info() {
    HOST_IP=$(hostname -I | awk '{print $1}')
    
    echo -e "\n${GREEN}========================================${NC}"
    echo -e "${GREEN}    SOC Lab Installation Complete!      ${NC}"
    echo -e "${GREEN}========================================${NC}\n"
    
    echo -e "${BLUE}Access the SOC Lab Portal:${NC}"
    echo -e "  http://$HOST_IP:5500\n"
    
    echo -e "${BLUE}Tool Access URLs:${NC}"
    echo -e "  Wazuh Dashboard:    https://$HOST_IP:443"
    echo -e "  Portainer:          https://$HOST_IP:9443"
    echo -e "  MISP:               https://$HOST_IP:8443"
    echo -e "  MITRE Navigator:    http://$HOST_IP:7013"
    echo -e "  Shuffle:            http://$HOST_IP:3443"
    echo -e "  TheHive:            http://$HOST_IP:9000"
    echo -e "  Cortex:             http://$HOST_IP:9001"
    echo -e "  Velociraptor:       https://$HOST_IP:8889"
    echo -e "  Arkime:             http://$HOST_IP:8005"
    echo -e "  EveBox:             http://$HOST_IP:5636"
    echo -e "  CyberChef:          http://$HOST_IP:7020"
    echo -e "  FleetDM:            http://$HOST_IP:8412"
    echo -e "  Caldera:            http://$HOST_IP:8888"
    echo -e "  Wireshark:          http://$HOST_IP:3000\n"
    
    echo -e "${YELLOW}Default Credentials:${NC}"
    echo -e "  Most tools: admin / admin or admin / soclab"
    echo -e "  See $SOC_LAB_DIR/.env for all credentials\n"
    
    echo -e "${YELLOW}Important:${NC}"
    echo -e "  - This is an educational environment only"
    echo -e "  - Change default passwords for long-term use"
    echo -e "  - Keep this environment isolated from production\n"
    
    echo -e "${BLUE}Useful Commands:${NC}"
    echo -e "  Start services:   docker-compose up -d"
    echo -e "  Stop services:    docker-compose down"
    echo -e "  View logs:        docker-compose logs -f [service]"
    echo -e "  Check status:     docker-compose ps\n"
}

# Main installation function
main() {
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}   SOC Lab - Installation Script        ${NC}"
    echo -e "${GREEN}========================================${NC}\n"
    
    check_root
    check_requirements
    install_docker
    install_docker_compose
    create_directories
    setup_suricata
    create_env_file
    pull_images
    start_services
    print_access_info
    
    success "Installation completed successfully!"
}

# Run main function
main "$@"
