# Mr-Emeka-career-coach
Modern landing page for NYSC career coach - responsive sidebar, conversion-focused, vanilla JS
# NYSC Money-Smart — Landing Page V1
> Don't let your fear and proscastination destroy your chances of landing your dream job.

Built for 2026 Batch B Corps Members to track financial readiness and capture leads for a 4-week savings plan.

**Live Demo:** https://emekacoach.vercel.app
**Status:** Day 5 — live (NYSC Green Theme + Google Sheet Backend)

![Nigeria](https://img.shields.io/badge/Nigeria-At66-008751?style=flat)
![Stack](https://img.shields.io/badge/Stack-Vanilla%20JS-FFF?logo=javascript)
![Leads](https://img.shields.io/badge/Backend-Google%20Sheets-34A853?logo=googlesheets)

### 🎯 Why this project?
78% of corps members don't know what to do after service or how to optimize themselves to get their dream jobs . This page solves it with:
- Interactive checklist (dopamine loop → higher conversion)
- localStorage (works offline)
- Email capture → Google Sheet (zero monthly cost for client)

### ✨ Features (V1)
- [x] 60/40 Hero split (Desktop) / Stacked (Mobile) — conversion-focused layout
- [x] NYSC Uniform Theme — Exact colors: #008751 (flag green), #00602E (cap green)
- [x] Google Apps Script backend — duplicate check + timestamp
- [x] < 100kb total, LCP < 2s on 3G
- [ ] Thank-you page with PDF download (Day 4)
- [ ] WhatsApp group auto-join

### 🧠 System Design

No server. Free forever up to 10k leads. See full docs in `/docs`.

- **PRD:** [`docs/prd.md`](./docs/prd.md) — Problem, persona, journey
- **System Design:** [`docs/system-design.md`](./docs/system-design.md) — Architecture, API, failures

### 🎨 Design System
```css
:root {
  --nysc-green-primary: #008751; /* Nigerian Flag Green */
  --nysc-green-dark: #00602E; /* NYSC Cap Green */
  --nysc-green-light: #E6F4EA; /* Light wash */
  --nysc-white: #FFFFFF;
  --primary: var(--nysc-green-primary);
}
