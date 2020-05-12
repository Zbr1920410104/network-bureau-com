module.exports = {
  apps: [
    {
      name: 'network-bureau-review-com',

      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      args: 'one two',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    }
  ],

  deploy: {
    production: {
      user: 'root',
      host: '39.97.175.30',
      ref: 'origin/master',
      repo: 'git@github.com:Zbr1920410104/network-bureau-review-com.git',
      path: '/network-bureau/network-bureau-com-review',
      'post-deploy':
        'npm install && npm run build',
      'post-setup': 'npm install && npm run build'
    }
  }
};
