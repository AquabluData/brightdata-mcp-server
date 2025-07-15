const { spawn } = require('child_process');
const port = process.env.PORT || 3000;

// Start the MCP server
const mcp = spawn('npx', ['@brightdata/mcp'], {
  env: { ...process.env },
  stdio: 'inherit'
});

// Keep the process alive
process.on('SIGTERM', () => {
  mcp.kill();
  process.exit(0);
});

console.log(`MCP server starting on port ${port}...`);
