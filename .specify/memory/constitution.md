<!-- SYNC IMPACT REPORT:
Version change: N/A -> 1.0.0
Added sections: Spec-Driven Development, Separation of Concerns, Security by Default, Multi-Tenant Isolation, Deterministic APIs, Cloud-Native Design principles
Removed sections: None (completely new constitution)
Templates requiring updates: ⚠ pending - .specify/templates/plan-template.md, .specify/templates/spec-template.md, .specify/templates/tasks-template.md
Follow-up TODOs: RATIFICATION_DATE needs to be set when constitution is formally adopted
-->

# Phase II – Todo Full-Stack Web Application Constitution

## Core Principles

### Spec-Driven Development
All implementation must originate from written specifications; every feature starts with a clear spec document that defines requirements, acceptance criteria, and test cases before any code is written

### Separation of Concerns
Frontend, Backend, Database, and Authentication responsibilities are isolated; each layer has clear boundaries and interfaces without cross-contamination of concerns

### Security by Default (NON-NEGOTIABLE)
Every request is authenticated and authorized via JWT; backend must reject unauthenticated requests with HTTP 401; all database queries must be filtered by authenticated user ID

### Multi-Tenant Isolation
Users can only access and modify their own data; user ID in the URL must match the user ID in the JWT; cross-user data access is strictly forbidden

### Deterministic APIs
Backend behavior must be predictable, validated, and testable; RESTful API endpoints must follow the defined contract with appropriate HTTP status codes

### Cloud-Native Design
Stateless backend, serverless-friendly database usage; minimal viable implementations avoiding premature optimization

## Technology Standards
Frontend: Next.js 16+ using App Router; Backend: Python FastAPI; ORM: SQLModel; Database: Neon Serverless PostgreSQL; Authentication: Better Auth with JWT; Environment secrets must be managed via environment variables; Shared JWT secret must be configured via BETTER_AUTH_SECRET

## Development Workflow
All features must be implemented according to written specs; Frontend is responsive and usable on desktop and mobile; The system is explainable, auditable, and demo-ready for judging

## Governance

All implementation must follow the defined API contracts (GET/POST/PUT/DELETE/PATCH endpoints with proper JWT authentication).

### REST API Contract (LOCKED)

All implementations must conform to the following REST API contract:
- GET /api/{user_id}/tasks — List all tasks for authenticated user
- POST /api/{user_id}/tasks — Create a new task
- GET /api/{user_id}/tasks/{id} — Get task details
- PUT /api/{user_id}/tasks/{id} — Update a task
- DELETE /api/{user_id}/tasks/{id} — Delete a task
- PATCH /api/{user_id}/tasks/{id}/complete — Toggle completion

No endpoint renaming, path restructuring, or contract deviation is allowed without a constitution amendment.

No hardcoded secrets or credentials in code; Backend must remain stateless; No direct database access from frontend.

## Success Criteria
- All API endpoints require valid JWT authentication
- Users can only access and modify their own tasks
- Tasks persist reliably in Neon PostgreSQL
- Frontend, backend, and database operate independently
- Application is demo-ready and judge-verifiable

## Authority Hierarchy
Constitution > Specifications > Plans > Tasks > Code
Any conflict must be resolved in favor of the higher authority document.


**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): Original adoption date unknown | **Last Amended**: 2026-01-15