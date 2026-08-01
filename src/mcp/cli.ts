import { startStdioMCPServer } from './server/index.js';

startStdioMCPServer().catch((err) => {
  console.error('[MCP Fatal Error]', err);
  process.exit(1);
});
