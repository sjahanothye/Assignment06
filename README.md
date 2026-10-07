# 💪 FitLog — High-Performance Gym Companion & Daily Workout Logger

> **FitLog** is an interactive, dark-themed gym companion and workout planner designed for athletes and fitness enthusiasts. Users can explore 12 major lifts across multiple muscle groups, assemble a customized daily workout plan, track live duration and calorie metrics, and celebrate completed sets with instant confetti rewards.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20FitLog-brightgreen?style=for-the-badge&logo=vercel)](https://assignment06-wheat.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/sjahanothye/Assignment06)

---

## 🌟 Key Features

- 🏋️‍♂️ **Comprehensive Exercise Library:** Curated catalog of 12 major lifts across Chest, Back, Legs, Core, Arms, and Shoulders with equipment and difficulty badges.
- ⚡ **Multi-Criteria Live Sorting & Filtering:** Real-time search with instant category filters and bidirectional sorting by Duration, Calories Burned, and Rating.
- 📊 **Dynamic Plan & Metrics Dashboard:** Real-time summary tracking total exercises, estimated workout time (min), and target calorie burn with a 5-lift cap progress bar.
- ✅ **Interactive Completion & Confetti:** "Mark as Done" workflow featuring celebratory visual confetti animations upon completing exercises.
- 💾 **Persistent Storage & Resilient State:** Full localStorage persistence ensuring workout plans and bookmarks survive browser reloads without hydration issues.
- 🛡️ **Multi-Tier API Fallback:** Built with Cloudflare Worker API support and offline static dataset fallback for 100% uptime.

---

## 🛠️ Tech Stack & Dependencies

### Frontend Framework & Styling:
- **Core:** [Next.js 15+](https://nextjs.org/) (App Router), [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Modern Dark UI)
- **Icons & UI FX:** [Lucide React](https://lucide.dev/), [Canvas-Confetti](https://www.npmjs.com/package/canvas-confetti)

### Package Dependencies:
- `next: 16.3.6`
- `react: ^19.0.0`
- `react-dom: ^19.0.0`
- `lucide-react: ^1.48.0`
- `canvas-confetti: ^1.9.4`

---

## 💻 Local Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/sjahanothye/Assignment06.git
cd Assignment06
