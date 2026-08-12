module.exports = {
  apps: [
    {
      name: 'sodayon-backend',
      script: 'dist/server.js',
      cwd: './backend',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1000M',
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    },
    {
      name: 'sodayon-frontend',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      cwd: './frontend',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1500M',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
