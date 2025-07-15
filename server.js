const { spawn } = require('child_process');
const http = require('http');

const port = process.env.PORT || 10000;

// Create a simple HTTP server to keep Render happy
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('BrightData MCP Server is running\n');
});

server.listen(port, () => {
  console.log(`HTTP server listening on port ${port}`);
});

// Start the MCP server in stdio mode
const mcp = spawn('npx', ['@brightdata/mcp'], {
  env: { 
    ...process.env,
    NODE_ENV: 'production'
  },
  stdio: ['pipe', 'pipe', 'pipe']
});

// Handle MCP output
mcp.stdout.on('data', (data) => {
  console.log(`MCP: ${data}`);
});

mcp.stderr.on('data', (data) => {
  console.error(`MCP Error: ${data}`);
});

mcp.on('close', (code) => {
  console.log(`MCP process exited with code ${code}`);
});

// Keep the process alive
process.on('SIGTERM', () => {
  mcp.kill();
  server.close();
  process.exit(0);
});
