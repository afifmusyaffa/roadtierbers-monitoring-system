# AGENTS.md — RoadTierbers

## Role

You are an AI coding assistant working on RoadTierbers.

RoadTierbers is a Smart Traffic Command Center for safer and smarter roads. It combines public traffic information and officer command center workflows powered by Deep Learning models.

You must follow the project PRD:

- `docs/PRD.md`

## Core Principle

Do not build a generic AI SaaS website.

RoadTierbers must feel like an Apple-inspired modern traffic intelligence product:

- clean
- premium
- minimal
- professional
- high white space
- strong typography
- clear hierarchy
- calm but intelligent
- public-friendly
- officer-ready

## Design Direction

Use an Apple-inspired visual direction, but do not copy Apple directly.

Use:
- white and off-white background
- strong typography
- large spacing
- subtle rounded cards
- soft shadow
- minimal color usage
- dark navy / police blue accent
- cyan or teal only as subtle accent
- functional status colors only when needed

Avoid:
- generic AI gradient
- cyberpunk
- neon
- random blob backgrounds
- emoji-heavy UI
- noisy dashboard
- too many colors
- overdecorated cards
- fake startup landing page style

## Project Rules

Work step by step.

For every task:
1. Read `docs/PRD.md`.
2. Modify only the files required by the task.
3. Do not create unrelated pages or components.
4. Do not add dependencies unless explicitly asked.
5. Use Bahasa Indonesia for user-facing text.
6. Keep TypeScript clean.
7. Make the UI premium and aligned with PRD.
8. Run lint and build after changes.
9. Commit only after the task is complete.

## Public Area Rules

Public Area includes:

- `/`
- `/traffic-overview`
- `/congestion-prediction`
- `/departure-recommendation`
- `/traffic-sign-education`
- `/about`

Public Area must not show:
- license plate data
- tax status
- detection history
- report/export
- confidence score
- detailed violation analytics
- officer AI assistant
- sensitive officer-only data

## Officer Area Rules

Officer Area includes:

- `/login`
- `/officer/dashboard`
- `/officer/ai-detection`
- `/officer/violation-monitoring`
- `/officer/vehicle-plate`
- `/officer/forecasting`
- `/officer/smart-insight`
- `/officer/history`
- `/officer/report`
- `/officer/assistant`

Officer Area should feel like a premium command center:
- clean
- operational
- decision-support oriented
- compact but readable
- not too dark
- not too crowded

## Data Wording

Do not use "dummy data" in the UI.

Use:
- sample case
- preloaded case
- sample pemantauan
- contoh area pemantauan
- data simulasi prototype

## Tech Stack

Frontend:
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts
- TanStack Table
- TanStack Query
- React Hook Form
- Zod
- Lucide React
- Framer Motion minimal

Backend later:
- FastAPI
- SQLite
- REST API

## Quality Gate

Before finishing any implementation task, ensure:

- `npm run lint` passes
- `npm run build` passes
- no unrelated files are changed
- UI is aligned with `docs/PRD.md`