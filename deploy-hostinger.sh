#!/bin/bash

# ==============================================================================
# Sodayon Production Deployment Script for Hostinger VPS
# ==============================================================================

set -e

PROJECT_DIR="/var/www/sodayon"

echo "🔄 [1/5] Navigating to project directory: $PROJECT_DIR..."
cd $PROJECT_DIR

echo "📥 [2/5] Fetching latest production code from GitHub..."
git fetch origin production
git checkout production
git pull origin production

echo "🛠️ [3/5] Building Backend API..."
cd $PROJECT_DIR/backend
npm ci
npm run build

echo "🎨 [4/5] Building Next.js Frontend..."
cd $PROJECT_DIR/frontend
npm ci
npm run build

echo "⚡ [5/5] Reloading PM2 processes (Zero-Downtime)..."
cd $PROJECT_DIR
pm2 startOrReload ecosystem.config.js --env production
pm2 save

echo "=========================================================================="
echo "🎉 DEPLOYMENT TO HOSTINGER VPS COMPLETED SUCCESSFULLY!"
echo "=========================================================================="
