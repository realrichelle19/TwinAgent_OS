import { projectRepository } from './repository.js';
import { NotFoundError } from '../../shared/errors/AppError.js';
import { ProjectStatus } from '@prisma/client';

export class ProjectService {
  async getProjects(organizationId: string) {
    return projectRepository.findAllByOrg(organizationId);
  }

  async getProjectById(id: string) {
    const project = await projectRepository.findById(id);
    if (!project) throw new NotFoundError('Project not found');
    return project;
  }

  async createProject(organizationId: string, data: {
    name: string;
    key: string;
    description?: string;
    managerId?: string;
    targetEndDate?: Date;
    budget?: number;
  }) {
    return projectRepository.create(organizationId, data);
  }

  async updateProject(id: string, data: {
    name?: string;
    status?: ProjectStatus;
    riskScore?: number;
    healthScore?: number;
    completionRate?: number;
  }) {
    return projectRepository.update(id, data);
  }

  async createMilestone(projectId: string, name: string, dueDate?: Date) {
    return projectRepository.createMilestone(projectId, name, dueDate);
  }

  async createSprint(projectId: string, name: string, startDate: Date, endDate: Date, goal?: string) {
    return projectRepository.createSprint(projectId, name, startDate, endDate, goal);
  }

  async createObjective(projectId: string, title: string, targetValue: number, metric: string) {
    return projectRepository.createObjective(projectId, title, targetValue, metric);
  }

  async calculateProjectMetrics(projectId: string) {
    const project = await this.getProjectById(projectId);
    const totalTasks = project.tasks.length;
    if (totalTasks === 0) {
      return { completionRate: 0, riskScore: 0, healthScore: 100 };
    }

    const completed = project.tasks.filter((t) => t.status === 'DONE').length;
    const blocked = project.tasks.filter((t) => t.status === 'BLOCKED').length;
    const highRisk = project.tasks.filter((t) => t.riskScore > 60).length;

    const completionRate = Math.round((completed / totalTasks) * 100);
    const riskScore = Math.min(100, Math.round(((blocked * 25 + highRisk * 15) / totalTasks) * 100));
    const healthScore = Math.max(0, 100 - riskScore);

    await projectRepository.update(projectId, { completionRate, riskScore, healthScore });

    return { completionRate, riskScore, healthScore, totalTasks, completed, blocked };
  }
}

export const projectService = new ProjectService();
