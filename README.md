# TwinAgent OS — Proactive Enterprise Digital Twin Engine & MCP Server

[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)
[![Fastify](https://img.shields.io/badge/Fastify-4.27-green.svg)](https://www.fastify.io/)
[![Prisma](https://img.shields.io/badge/Prisma-5.14-05122A.svg)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791.svg)](https://www.postgresql.org/)
[![NitroStack](https://img.shields.io/badge/NitroStack-1.0-FF5722.svg)](https://nitrostack.ai)
[![MCP Protocol](https://img.shields.io/badge/MCP-1.30-8A2BE2.svg)](https://modelcontextprotocol.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**TwinAgent OS** is a proactive, enterprise-grade Digital Twin backend engine and Model Context Protocol (MCP) server built on top of **NitroStack** and **Fastify**. It aggregates real-time telemetry from enterprise platforms (GitHub, Slack, Jira, Google Workspace, Linear, Notion), constructs an interactive **Organizational Knowledge Graph**, models multi-dimensional digital twins of projects, teams, and employees, predicts delivery risks and burnout, executes automated approval workflows, and exposes a comprehensive MCP interface featuring **15 Enterprise Tools**, **4 Telemetry Resources**, and **3 Reusable Prompt Templates** across both **STDIO** and **HTTP/SSE** transports.

---

## 📑 Table of Contents

- [🏛️ Overview & Key Capabilities](#-overview--key-capabilities)
- [🏗️ System Architecture](#️-system-architecture)
- [⚡ Model Context Protocol (MCP) Specification](#-model-context-protocol-mcp-specification)
  - [15 Enterprise MCP Tools](#15-enterprise-mcp-tools)
  - [4 Telemetry Resources](#4-telemetry-resources)
  - [3 Reusable Prompt Templates](#3-reusable-prompt-templates)
- [🔌 Multi-Transport Client Connection Guide](#-multi-transport-client-connection-guide)
  - [NitroStudio](#nitrostudio)
  - [Claude Desktop](#claude-desktop)
  - [Cursor IDE](#cursor-ide)
  - [Gemini CLI / Agent](#gemini-cli--agent)
  - [Custom Node.js / Python MCP Clients](#custom-nodejs--python-mcp-clients)
- [🌐 REST API Reference](#-rest-api-reference)
- [🗄️ Database Schema & Data Models](#-database-schema--data-models)
- [🔌 Enterprise Connectors & Sync Engine](#-enterprise-connectors--sync-engine)
- [⚙️ Environment Configuration](#️-environment-configuration)
- [🚀 Quick Start & Installation](#-quick-start--installation)
- [🛠️ Development, Building & Deployment](#️-development-building--deployment)
  - [Local Development](#local-development)
  - [Production Build & Execution](#production-build--execution)
  - [Docker & Docker Compose](#docker--docker-compose)
- [🧪 Testing, Linting & MCP Validation](#-testing-linting--mcp-validation)
- [📁 Codebase Directory Structure](#-codebase-directory-structure)
- [🔒 Security, RBAC & Compliance](#-security-rbac--compliance)
- [📄 License & Credits](#-license--credits)

---

## 🏛️ Overview & Key Capabilities

TwinAgent OS converts unstructured enterprise activity (commits, PRs, messages, tickets, calendar events) into actionable organizational intelligence:

- **Proactive Risk & Burnout Modeling**: Calculates real-time delivery risk scores for projects and flags burnout vectors for employees operating beyond sustainable capacity.
- **Organizational Knowledge Graph**: Maintains dynamic directional graph nodes and edges connecting employees, teams, skills, projects, tasks, and system dependencies.
- **Timeline & Decision Memory**: Records immutable historical timelines of strategic decisions, architectural notes, and meeting outcomes.
- **Automated Workflows & Approval Gates**: Triggers automated action gates requiring manager, executive, or automated approval before execution.
- **Dual-Transport MCP Server**: Exposes complete Model Context Protocol integration over both STDIO (for desktop IDEs and local agents) and HTTP/SSE (for web-based AI clients and microservices).

---

## 🏗️ System Architecture

```
                                  ┌───────────────────────────────────────────────────────────┐
                                  │                  AI Clients & IDE Agents                  │
                                  │   (NitroStudio / Claude / Cursor / Gemini / Custom SDKs)   │
                                  └─────────────┬───────────────────────────────┬─────────────┘
                                                │                               │
                                       ┌────────▼────────┐             ┌────────▼────────┐
                                       │ STDIO Transport │             │ HTTP/SSE Stream │
                                       │  (JSON-RPC 2.0) │             │ (/api/v1/mcp)   │
                                       └────────┬────────┘             └────────┬────────┘
                                                │                               │
┌───────────────────────────────────────────────▼───────────────────────────────▼───────────────────────────────────────────────┐
│                                                      TwinAgent OS Engine                                                     │
├───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────┐ ┌─────────────────────────────┐ ┌─────────────────────────────┐ ┌───────────────────────────┐ │
│ │     Digital Twin Engine     │ │   Graph & Memory Pipeline   │ │      Predictive Engine      │ │      Workflow Engine      │ │
│ │ (User/Project Twin Scores)  │ │ (Nodes, Edges, Timeline)    │ │   (Burnout & Risk Models)   │ │(Approval Gates & Actions) │ │
│ └─────────────────────────────┘ └─────────────────────────────┘ └─────────────────────────────┘ └───────────────────────────┘ │
│ ┌─────────────────────────────┐ ┌─────────────────────────────┐ ┌─────────────────────────────┐ ┌───────────────────────────┐ │
│ │    Enterprise Connectors    │ │     REST & WS Controller      │ │    Security & Audit Layer    │ │   Async Queue & Scheduler │ │
│ │ (GitHub, Slack, Jira, etc.) │ │ (Fastify OpenApi/Swagger UI)│ │   (JWT Validation & RBAC)   │ │    (BullMQ, Redis, Cron)  │ │
│ └─────────────────────────────┘ └─────────────────────────────┘ └─────────────────────────────┘ └───────────────────────────┘ │
└───────────────────────────────────────────────┬───────────────────────────────────────────────┬───────────────────────────────┘
                                                │                                               │
                                      ┌─────────▼─────────┐                           ┌─────────▼─────────┐
                                      │  PostgreSQL 16    │                           │    Redis 7.x     │
                                      │   (Prisma ORM)    │                           │  (Pub/Sub Queue)  │
                                      └───────────────────┘                           └───────────────────┘
```

---

## ⚡ Model Context Protocol (MCP) Specification

TwinAgent OS strictly implements the Model Context Protocol (MCP) spec, enabling direct interoperability with any standard MCP host application.

### 15 Enterprise MCP Tools

| Tool Name | Description | Required Parameters | Schema Properties |
| :--- | :--- | :--- | :--- |
| **`predictProjectRisk`** | Calculates real-time project risk score, health score, delivery confidence, and task completion metrics. | `projectId` | `projectId` (string UUID) |
| **`predictBurnout`** | Scans an organization for employee burnout risks, workload imbalances, and delayed project dependencies. | `organizationId` | `organizationId` (string UUID) |
| **`updateTask`** | Updates status, priority, or risk score of an enterprise task. | `taskId`, `userId` | `taskId` (UUID), `userId` (UUID), `status` (`BACKLOG`, `TODO`, `IN_PROGRESS`, `IN_REVIEW`, `DONE`, `BLOCKED`), `priority` (`LOW`, `MEDIUM`, `HIGH`, `URGENT`, `CRITICAL`), `riskScore` (number 0-100) |
| **`searchKnowledge`** | Performs semantic & keyword search across organizational memory entries and strategic decisions. | `organizationId`, `query` | `organizationId` (UUID), `query` (string), `category` (optional string) |
| **`organizationHealth`** | Retrieves executive dashboard metrics including overall digital twin health score, burnout index, and sprint velocity. | `organizationId` | `organizationId` (string UUID) |
| **`summarizeProject`** | Retrieves comprehensive project details including tasks, milestones, sprints, and assigned team members. | `projectId` | `projectId` (string UUID) |
| **`recommendAssignee`** | Recommends optimal task assignee based on current workload capacity and skill availability. | `organizationId` | `organizationId` (UUID), `requiredSkills` (array of strings) |
| **`findExpert`** | Finds organizational subject matter experts by specific skill keyword and proficiency level. | `organizationId`, `skillName` | `organizationId` (UUID), `skillName` (string) |
| **`runWorkflow`** | Triggers an automated TwinAgent workflow execution or approval gate. | `workflowId`, `requesterId` | `workflowId` (UUID), `requesterId` (UUID), `payload` (object) |
| **`approveAction`** | Reviews and approves or rejects a pending workflow action gate. | `approvalId`, `reviewerId`, `status` | `approvalId` (UUID), `reviewerId` (UUID), `status` (`APPROVED`, `REJECTED`), `reason` (optional string) |
| **`syncConnector`** | Triggers synchronization job for connected enterprise accounts (GitHub, Slack, Jira, Google Workspace). | `accountId` | `accountId` (UUID), `mode` (`FULL`, `INCREMENTAL`) |
| **`calculateDigitalTwin`** | Recalculates multi-dimensional digital twin scores for a target user or project. | `targetType`, `targetId` | `targetType` (`USER`, `PROJECT`), `targetId` (string UUID) |
| **`getGraph`** | Retrieves Enterprise Knowledge Graph nodes and relationship edges for an organization. | `organizationId` | `organizationId` (string UUID) |
| **`globalSearch`** | Executes cross-entity global search across tasks, projects, users, and organizational memory. | `organizationId`, `query` | `organizationId` (UUID), `query` (string) |
| **`getAuditLogs`** | Retrieves organization security audit logs for compliance review. | `organizationId` | `organizationId` (string UUID) |

---

### 4 Telemetry Resources

| Resource URI | Name | MIME Type | Description & Content Payload |
| :--- | :--- | :--- | :--- |
| `twinagent://memory/timeline` | **Organizational Timeline Memory** | `application/json` | Array of historical decisions, meeting notes, project milestones, and architectural logs. |
| `twinagent://graph/enterprise` | **Enterprise Knowledge Graph** | `application/json` | Dynamic node graph containing employees, projects, tasks, skills, and inter-entity edge relationships. |
| `twinagent://analytics/dashboard` | **Organizational Telemetry Dashboard** | `application/json` | Executive KPI indicators covering digital twin health, org burnout index, risk distribution, and team velocity. |
| `twinagent://system/health` | **TwinAgent Engine System Health** | `application/json` | Real-time system health metrics, service statuses, uptime, and engine runtime metrics. |

---

### 3 Reusable Prompt Templates

#### 1. `summarize_project_risk`
- **Description**: Generates an executive risk mitigation briefing for a project based on telemetry scores and dependency bottlenecks.
- **Arguments**: `projectId` (required)
- **Prompt Logic**: Automatically invokes `predictProjectRisk` and `summarizeProject` tools to evaluate delivery confidence, identify blocked dependencies, and formulate a 3-step risk mitigation strategy.

#### 2. `recommend_workload_rebalance`
- **Description**: Generates actionable task rebalancing recommendations for employees experiencing burnout risk.
- **Arguments**: `organizationId` (required)
- **Prompt Logic**: Scans the organization using `predictBurnout` and `recommendAssignee` tools to identify employees over 120% capacity and suggest optimal task reallocations.

#### 3. `query_organizational_memory`
- **Description**: Synthesizes past decisions, meeting outcomes, and historical patterns for a specific query topic.
- **Arguments**: `topic` (required)
- **Prompt Logic**: Queries enterprise memory for the given topic using `searchKnowledge` and the `twinagent://memory/timeline` resource to synthesize strategic lessons learned.

---

## 🔌 Multi-Transport Client Connection Guide

TwinAgent OS supports both **STDIO** (standard input/output JSON-RPC) and **HTTP Server-Sent Events (SSE)**.

### NitroStudio

#### Option A: STDIO Command Connection (Recommended)
- **Server Name**: `TwinAgent OS`
- **Connection Type**: `STDIO`
- **Command**: `npm`
- **Arguments**: `run`, `--silent`, `mcp:start`
- **Working Directory**: `/path/to/TwinAgent OS`
- **Environment**: `{"NODE_ENV": "production"}`

#### Option B: HTTP / SSE Connection
- **Server Name**: `TwinAgent OS (SSE)`
- **Connection Type**: `SSE` / `HTTP`
- **Server URL**: `http://localhost:4000/api/v1/mcp/sse`

---

### Claude Desktop

Add the following configuration to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "twinagent-os": {
      "command": "npx",
      "args": [
        "-y",
        "tsx",
        "/path/to/TwinAgent OS/src/mcp/cli.ts"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

---

### Cursor IDE

1. Open **Cursor Settings** ➔ **Features** ➔ **MCP Servers** ➔ **+ Add New MCP Server**.
2. Configure as follows:
   - **Name**: `twinagent-os`
   - **Type**: `command`
   - **Command**: `npx -y tsx /path/to/TwinAgent OS/src/mcp/cli.ts`

---

### Gemini CLI / Agent

Add the server definition to your `~/.gemini/mcp_servers.json`:

```json
{
  "mcpServers": {
    "twinagent-os": {
      "command": "npx",
      "args": [
        "-y",
        "tsx",
        "/path/to/TwinAgent OS/src/mcp/cli.ts"
      ]
    }
  }
}
```

---

### Custom Node.js / Python MCP Clients

#### Node.js Client Example:
```typescript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const transport = new StdioClientTransport({
  command: 'npx',
  args: ['-y', 'tsx', '/path/to/TwinAgent OS/src/mcp/cli.ts'],
});

const client = new Client({ name: 'custom-mcp-client', version: '1.0.0' }, { capabilities: {} });
await client.connect(transport);

// Call an enterprise MCP tool
const result = await client.callTool({
  name: 'organizationHealth',
  arguments: { organizationId: 'your-org-uuid' },
});
console.log(result);
```

---

## 🌐 REST API Reference

The backend Fastify REST server runs by default on port `4000` under `/api/v1`. Full OpenAPI/Swagger documentation is available interactively at `http://localhost:4000/documentation`.

| Module | Route Prefix | Key Endpoints | Description |
| :--- | :--- | :--- | :--- |
| **Authentication** | `/api/v1/auth` | `POST /login`, `POST /register`, `GET /me`, `POST /refresh` | User registration, JWT login, profile fetching, token refresh |
| **Users & Roles** | `/api/v1/users` | `GET /`, `GET /:id`, `PATCH /:id`, `GET /:id/skills` | Employee management, RBAC updates, capacity and skill tracking |
| **Organizations** | `/api/v1/organizations` | `GET /:id`, `GET /:id/health`, `GET /:id/audit-logs` | Multi-tenant organization settings, executive health metrics, audit logs |
| **Projects** | `/api/v1/projects` | `GET /`, `POST /`, `GET /:id`, `GET /:id/summary` | Project management, milestone planning, status tracking |
| **Tasks** | `/api/v1/tasks` | `GET /`, `POST /`, `PATCH /:id`, `DELETE /:id` | Task tracking, priority assignment, risk scoring updates |
| **Digital Twin** | `/api/v1/digital-twin` | `GET /scores`, `POST /calculate`, `GET /snapshots` | Compute and retrieve multi-dimensional twin snapshots |
| **Predictions** | `/api/v1/predictions` | `GET /project-risk`, `GET /burnout`, `POST /evaluate` | AI predictive risk modeling and burnout detection |
| **Knowledge Graph** | `/api/v1/graph` | `GET /nodes`, `GET /edges`, `GET /subgraph` | Enterprise knowledge graph structure and relation queries |
| **Organizational Memory**| `/api/v1/memory` | `GET /timeline`, `POST /entries`, `GET /search` | Immutable decision timeline and semantic memory log |
| **Workflows** | `/api/v1/workflows` | `GET /`, `POST /execute`, `GET /:id/status` | Automated workflow triggers and multi-step pipeline tracking |
| **Approvals** | `/api/v1/approvals` | `GET /pending`, `POST /approve`, `POST /reject` | Workflow approval gate reviews and decision handling |
| **MCP SSE Transport** | `/api/v1/mcp` | `GET /sse`, `POST /messages` | HTTP Server-Sent Events stream and message handler for MCP |
| **Integrations** | `/api/v1/integrations`| `GET /connectors`, `POST /sync`, `POST /webhook` | Enterprise connector account sync (GitHub, Slack, Jira) |
| **Analytics & KPIs** | `/api/v1/analytics` | `GET /dashboard`, `GET /burnout-index` | Executive analytics, department workload distribution |
| **Search Engine** | `/api/v1/search` | `GET /global`, `GET /knowledge` | Full-text global search across org entities and memory |
| **System Health** | `/health`, `/metrics` | `GET /health`, `GET /metrics` | Service uptime, heap memory usage, runtime readiness checks |

---

## 🗄️ Database Schema & Data Models

TwinAgent OS utilizes **Prisma ORM** backed by **PostgreSQL 16**.

### Core Data Models

- **`Organization`**: Multi-tenant top-level boundary holding departments, teams, projects, settings, and compliance policies.
- **`User`**: Enterprise members with assigned RBAC roles (`EMPLOYEE`, `MANAGER`, `EXECUTIVE`, `ADMIN`, `OWNER`), weekly capacity, workload tracking, and skill relationships.
- **`Department` & `Team`**: Organizational hierarchy structures for team leads, subordinates, and department metrics.
- **`Project`**: High-level enterprise initiatives with project status (`PLANNING`, `ACTIVE`, `ON_HOLD`, `COMPLETED`, `CANCELLED`, `AT_RISK`) and calculated risk scores.
- **`Task`**: Unit of work assigned to users with statuses (`BACKLOG`, `TODO`, `IN_PROGRESS`, `IN_REVIEW`, `DONE`, `BLOCKED`), priorities (`LOW` to `CRITICAL`), and individual risk metrics.
- **`TwinSnapshot`**: Historical records of multi-dimensional digital twin scores (health, productivity, burnout risk, delivery confidence).
- **`MemoryEntry`**: Organizational memory entries capturing strategic decisions, meeting transcripts, and architectural notes.
- **`GraphNode` & `GraphEdge`**: Vertices and directed edges representing employees, tasks, skills, and dependencies in the enterprise knowledge graph.
- **`Workflow` & `ApprovalRequest`**: Multi-step automated workflows with explicit approval gates (`AUTOMATIC`, `MANAGER_APPROVAL`, `MANUAL_APPROVAL`).
- **`Prediction`**: AI-generated predictions covering burnout, project delays, resourcing shortages, and bus factor risks.
- **`ConnectorAccount`**: Integration credentials and sync statuses for third-party enterprise tools.
- **`AuditLog`**: Immutable compliance audit trail capturing user actions, IP addresses, and authorization changes.

---

## 🔌 Enterprise Connectors & Sync Engine

TwinAgent OS integrates telemetry from external enterprise tools to keep digital twin scores updated:

- **GitHub**: Pull requests, commit activity, code review velocity, repository bus factors.
- **Slack & Teams**: Communication frequency, sentiment signals, notification overload indicators.
- **Jira & Linear**: Ticket transition speed, epic progress, blocked item duration.
- **Google Workspace & Outlook**: Meeting frequency, focus time availability, calendar overload metrics.

---

## ⚙️ Environment Configuration

Create a `.env` file in the project root directory based on `.env.example`:

```env
# Server Runtime
PORT=4000
HOST=0.0.0.0
NODE_ENV=development

# Database Connection (PostgreSQL 16)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/twinagent_os?schema=public"

# Redis Cache & Task Queue
REDIS_URL="redis://localhost:6379"

# JWT Authentication
JWT_SECRET="twinagent_super_secret_jwt_key_32_chars_min_length_spec"

# CORS Security
CORS_ORIGIN="*"
```

---

## 🚀 Quick Start & Installation

### Prerequisites
- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher
- **PostgreSQL**: `v16.x`
- **Redis**: `v7.x`

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/realrichelle19/TwinAgent_OS.git
cd TwinAgent_OS
npm install
```

### 2. Configure Environment & Database
```bash
# Copy example environment file
cp .env.example .env

# Generate Prisma Client
npm run prisma:generate

# Seed initial database records
npm run prisma:seed
```

---

## 🛠️ Development, Building & Deployment

### Local Development

Run the full NitroStack stack:
```bash
npm run dev
```

Or run individual sub-services during development:
```bash
# Fastify REST Server Watcher
npm run backend:dev

# STDIO MCP Server directly
npm run mcp:start
```

### Production Build & Execution

Compile TypeScript and package for production:
```bash
# Generate Prisma Client and build TypeScript files
npm run build

# Start production server
npm run start:prod
```

### Docker & Docker Compose

Deploy the complete containerized stack (PostgreSQL, Redis, TwinAgent OS Backend):

```bash
# Build and bring up containers in detached mode
docker-compose up --build -d

# View container logs
docker-compose logs -f backend

# Stop services
docker-compose down
```

---

## 🧪 Testing, Linting & MCP Validation

TwinAgent OS includes an automated test suite and an MCP protocol validation runner:

```bash
# Run Vitest unit & integration test suite
npm run test

# Run automated MCP Protocol compatibility suite
npm run validate:mcp

# Typecheck TypeScript source code
npm run typecheck

# Code formatting & lint checks
npm run lint
npm run format
```

---

## 📁 Codebase Directory Structure

```
TwinAgent OS/
├── .env.example              # Sample environment configuration
├── Dockerfile                # Multi-stage Docker build specification
├── docker-compose.yml        # Orchestration for Postgres, Redis & Backend
├── mcp.json                  # MCP Server manifest configuration
├── MCP_COMPATIBILITY.md      # Dual-transport MCP integration guide
├── package.json              # NPM package & dependency management
├── prisma/
│   ├── schema.prisma         # Enterprise database models & enums
│   └── seed.ts               # Initial database seed script
├── scripts/
│   └── validate-mcp.ts       # Automated MCP protocol validator
├── src/
│   ├── app.ts                # Fastify application setup & middleware
│   ├── server.ts             # REST server entrypoint
│   ├── config/               # Environment & Swagger configurations
│   ├── core/                 # Modular domain core logic
│   │   ├── analytics/        # Org KPIs & dashboard metrics
│   │   ├── approval/         # Workflow approval gates
│   │   ├── audit/            # Security audit log services
│   │   ├── auth/             # Authentication & JWT security
│   │   ├── digitalTwin/      # Twin scoring & snapshot computation
│   │   ├── graph/            # Knowledge graph node/edge services
│   │   ├── memory/           # Timeline memory & search logic
│   │   ├── prediction/       # Burnout & risk prediction models
│   │   ├── projects/         # Project lifecycle management
│   │   ├── tasks/            # Task management & risk updates
│   │   ├── users/            # User profile & RBAC handlers
│   │   └── workflows/        # Automated workflow engines
│   ├── mcp/                  # Model Context Protocol implementation
│   │   ├── cli.ts            # STDIO MCP Server CLI entrypoint
│   │   ├── tools/            # 15 Enterprise MCP Tool definitions
│   │   ├── resources/        # 4 Telemetry Resource definitions
│   │   ├── prompts/          # 3 Prompt Template definitions
│   │   ├── handlers/         # Request & execution dispatchers
│   │   └── server/           # STDIO & SSE server instances
│   └── shared/               # Shared errors, utilities & middleware
├── tsconfig.json             # TypeScript compiler settings
└── vitest.config.ts          # Vitest testing setup
```

---

## 🔒 Security, RBAC & Compliance

- **Role-Based Access Control (RBAC)**: Enforces permission boundaries across 5 roles: `EMPLOYEE`, `MANAGER`, `EXECUTIVE`, `ADMIN`, and `OWNER`.
- **JWT & Session Security**: Secure JSON Web Tokens with refresh token rotation and session revocation capabilities.
- **Audit Trails**: All data mutations, workflow approvals, and privilege changes generate immutable `AuditLog` records containing user IDs, action names, and IP addresses.
- **Security Headers**: Fastify Helmet enforcement against standard web vulnerabilities (XSS, Clickjacking, MIME-sniffing).

---

## 📄 License & Credits

Distributed under the **MIT License**. Built with ⚡ **[NitroStack](https://nitrostack.ai)** and **[Model Context Protocol](https://modelcontextprotocol.io)**.
