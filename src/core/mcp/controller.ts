import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { mcpRegistry } from './registry.js';
import { successResponse } from '../../shared/utils/response.js';
import { UserPayload } from '../../types/fastify.d.js';

export class MCPController {
  async getCapabilities(request: FastifyRequest, reply: FastifyReply) {
    const tools = mcpRegistry.getTools().map((t) => ({
      name: t.name,
      description: t.description,
      inputSchema: t.inputSchema,
    }));

    const resources = [
      { uri: 'twinagent://memory/timeline', name: 'Organizational Timeline Memory' },
      { uri: 'twinagent://graph/enterprise', name: 'Enterprise Knowledge Graph' },
      { uri: 'twinagent://twin/health', name: 'Digital Twin Health Status' },
    ];

    const prompts = [
      { name: 'summarize_project_risk', description: 'Generates executive summary of project risks' },
      { name: 'recommend_workload_rebalance', description: 'Recommends task reallocations for overloaded employees' },
    ];

    return reply.send(
      successResponse({
        mcpVersion: '1.0.0',
        capabilities: { tools: true, resources: true, prompts: true },
        tools,
        resources,
        prompts,
      })
    );
  }

  async executeTool(request: FastifyRequest, reply: FastifyReply) {
    const userPayload = request.user as UserPayload;
    const schema = z.object({
      name: z.string(),
      arguments: z.record(z.unknown()).default({}),
    });

    const { name, arguments: toolArgs } = schema.parse(request.body);
    const result = await mcpRegistry.executeTool(name, toolArgs, {
      organizationId: userPayload.organizationId,
      userId: userPayload.userId,
    });

    return reply.send(
      successResponse({
        tool: name,
        result,
      })
    );
  }
}

export const mcpController = new MCPController();
