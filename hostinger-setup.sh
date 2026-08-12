#!/bin/bash

# ==============================================================================
# Hostinger KVM 2 VPS Automatic Setup Script for Sodayon E-Commerce Fullstack
# ==============================================================================
# This script provisions an Ubuntu VPS with:
# - Node.js 20.x & NPM
# - PM2 Process Manager
# - Nginx Web Server
# - Certbot for SSL (Let's Encrypt)
# - Git & UFW Firewall
# ==============================================================================

set -e

echo "🚀 [1/6] Updating system packages..."
sudo apt-get update -y && sudo apt-get upgrade -y
sudo apt-get install -y curl wget git unzip ufw build-essential

echo "📦 [2/6] Installing Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "⚡ [3/6] Installing PM2 globally..."
sudo npm install -g pm2
pm2 startup systemd -u root --hp /root || true

echo "🌐 [4/6] Installing Nginx & Certbot..."
sudo apt-get install -y nginx certbot python3-certbot-nginx

echo "🛡️ [5/6] Configuring Firewall (UFW)..."
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

echo "📂 [6/6] Setting up project directory..."
sudo mkdir -p /var/www/sodayon
sudo chown -R $USER:$USER /var/www/sodayon

echo ""
echo "=========================================================================="
echo "✅ HOSTINGER VPS PROVISIONING COMPLETED SUCCESSFULLY!"
echo "=========================================================================="
echo "Next Steps:"
echo "1. Clone your repo: git clone https://github.com/dmmonir2003/test_sodyaon.git /var/www/sodayon"
echo "2. Copy your backend .env to /var/www/sodayon/backend/.env"
echo "3. Copy your frontend .env to /var/www/sodayon/frontend/.env.production"
echo "4. Run setup deployment: bash /var/www/sodayon/deploy-hostinger.sh"
echo "=========================================================================="
