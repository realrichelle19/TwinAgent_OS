import { prisma } from '../../config/database.js';

export class AnalyticsService {
  async getDashboardAnalytics(organizationId: string) {
    const userCount = await prisma.user.count({ where: { organizationId, deletedAt: null } });
    const projectCount = await prisma.project.count({ where: { organizationId, deletedAt: null } });
    const taskCount = await prisma.task.count({
      where: { project: { organizationId }, deletedAt: null },
    });
    const completedTaskCount = await prisma.task.count({
      where: { project: { organizationId }, status: 'DONE', deletedAt: null },
    });

    const activePredictionsCount = await prisma.prediction.count({
      where: { organizationId, isResolved: false },
    });

    const activeWorkflowsCount = await prisma.workflow.count({
      where: { organizationId, status: 'ACTIVE' },
    });

    const connectedAppsCount = await prisma.connectorAccount.count({
      where: { organizationId, status: 'CONNECTED' },
    });

    const taskCompletionRate = taskCount > 0 ? Math.round((completedTaskCount / taskCount) * 100) : 0;
    const organizationHealth = Math.max(0, 100 - activePredictionsCount * 12);
    const burnoutIndex = Math.min(100, activePredictionsCount * 15);
    const focusTimeAverage = 78; // % of productive focus time
    const teamVelocity = 84; // Story points / sprint speed index

    return {
      organizationHealth,
      burnoutIndex,
      teamVelocity,
      taskCompletionRate,
      focusTimeAverage,
      counts: {
        users: userCount,
        projects: projectCount,
        tasks: taskCount,
        completedTasks: completedTaskCount,
        activePredictions: activePredictionsCount,
        activeWorkflows: activeWorkflowsCount,
        connectedApps: connectedAppsCount,
      },
    };
  }
}

export const analyticsService = new AnalyticsService();
