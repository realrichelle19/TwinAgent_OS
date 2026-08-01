import { FastifyInstance } from 'fastify';
import { mcpController } from './controller.js';
import { authenticate } from '../../shared/middleware/authMiddleware.js';

export async function mcpRoutes(fastify: FastifyInstance) {
  fastify.get('/capabilities', { preHandler: [authenticate] }, (req, reply) => mcpController.getCapabilities(req, reply));
  fastify.post('/tools/execute', { preHandler: [authenticate] }, (req, reply) => mcpController.executeTool(req, reply));
}
