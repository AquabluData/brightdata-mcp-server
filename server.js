const { spawn } = require('child_process');

const port = process.env.PORT || 10000;

// Start supergateway to expose MCP over HTTP
const gateway = spawn('npx', [
  '-y',
  'supergateway',
  '--stdio', 'npx -y @brightdata/mcp',
  '--port', port.toString(),
  '--baseUrl', `https://brightdata-mcp-server-wh2k.onrender.com`,
  '--ssePath', '/sse',
  '--messagePath', '/message'
], {
  env: { 
    ...process.env,
    NODE_ENV: 'production'
  },
  stdio: 'inherit'
});

// Keep the process alive
process.on('SIGTERM', () => {
  gateway.kill();
  process.exit(0);
});
