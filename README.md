# 💪 FitLog — High-Performance Gym Companion & Daily Workout Logger

[![Next.js](https://img.shields.io/badge/Next.js-15%2B-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**FitLog** is a dark, no-nonsense gym companion and workout planner designed for athletes who train with intent and log every set. Pick from 12 major lifts across all muscle groups, lock them into your custom daily plan, track live duration and calorie burn metrics, and crush your workout goals.

---

## 🔗 Project Links

- **Live Demo (Vercel)**: [https://assignment06-sjahanothye.vercel.app](https://assignment06-sjahanothye.vercel.app)
- **GitHub Repository**: [https://github.com/sjahanothye/Assignment06](https://github.com/sjahanothye/Assignment06)


---

## 🌟 Key Features (5+ Core Features)

1. **🏋️‍♂️ Comprehensive Workout Library (3x4 Responsive Grid)**
   - Curated catalog of 12 major lifts spanning Chest, Back, Legs, Core, Arms, Shoulders, and Full Body.
   - Each card highlights equipment, difficulty badges, duration (min), calories burned (kcal), and athlete ratings.

2. **⚡ Real-Time Multi-Criteria Sorting & Live Filtering (Challenge C1)**
   - Dynamic sorting dropdown with options for **Duration**, **Calories Burned**, and **Rating**, with bidirectional sorting order (Highest/Lowest First).
   - Instant search bar and quick muscle-group filter pills (`Chest`, `Legs`, `Back`, `Core`, etc.).

3. **📊 Two-Column In-Depth Workout Details View**
   - Full-bleed media visual column with high-contrast contrast overlay.
   - Key Specifications Matrix (Equipment, Difficulty, Sets, Reps, Duration, Calories Burned, Rating).
   - Step-by-step numbered execution instructions.
   - One-click **"Add to today's plan"** and **"Save for later"** actions with toast feedback.

4. **📈 Interactive My Plan & Live Metrics Dashboard**
   - Live reactive metrics summary cards: **Exercises** (with 5-lift cap progress bar), **Estimated Minutes**, and **Target Calories Burned**.
   - Dual-tab workflow with **Today's Plan** and **Saved Bookmarks**, both synced to persistent storage.

5. **✅ "Mark as Done" Completion & Confetti Celebration (Challenge C3)**
   - Mark lifts as completed with interactive strike-through, verified green `DONE` badge, and celebratory confetti effects.
   - Instant removal (`X`) and seamless promote-to-plan buttons.

6. **💾 LocalStorage State Persistence & 5-Lift Cap Guard**
   - All today's plan selections and saved bookmarks survive page reloads and browser sessions without hydration mismatch.
   - Automatic 5-lift daily maximum cap guard with friendly user notifications.

7. **🛡️ 100% Resilient API Fallback & Custom 404 Page**
   - Multi-tier API fetching architecture (Primary Cloudflare Worker → Secondary Worker → Static Offline Dataset) preventing 429 rate limit disruptions.
   - Custom gym-themed 404 Not Found and Error Boundary pages.

---

## 🛠️ Technologies Used

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 15+ (App Router) | Server-Side Rendering (SSR), Static Generation (SSG), and client routing |
| **Library** | React 19 | Component architecture and state lifecycle |
| **Styling** | Tailwind CSS v4 | Dark gym aesthetic, custom `#ccff00` volt accents, and responsive layout |
| **Typography** | Google Fonts (Oswald & Inter) | Athletic bold uppercase display headings & clean UI typography |
| **Icons** | Lucide React | Clean, scalable vector fitness and navigation icons |
| **Notifications** | Sonner | Sleek, customizable dark-themed toast notifications |
| **Celebrations** | Canvas-Confetti | Micro-interactions when marking workouts complete |
| **Language** | TypeScript | Type-safe interfaces and robust data models |

---

## 📂 Project Structure

```text
├── public/
│   ├── assets/
│   │   ├── banner.png          # Hero banner graphic
│   │   └── logo.png            # FitLog brand logo
│   ├── banner.png
│   └── logo.png
├── src/
│   ├── app/
│   │   ├── error.tsx           # Global error boundary
│   │   ├── globals.css         # Custom tokens, Oswald headings, neon glow
│   │   ├── layout.tsx          # Root layout with fonts, PlanProvider, Toaster
│   │   ├── loading.tsx         # Global loading spinner
│   │   ├── not-found.tsx       # Custom 404 Not Found page
│   │   ├── page.tsx            # Home Page (Hero + 3x4 Library Grid)
│   │   ├── my-plan/
│   │   │   └── page.tsx        # My Plan page (Metrics + Today's Plan & Saved)
│   │   └── workout/
│   │       └── [id]/
│   │           └── page.tsx    # Dynamic Workout Details (2-Column Spec View)
│   ├── components/
│   │   ├── home/
│   │   │   ├── HeroBanner.tsx      # Hero section with smooth scroll CTA
│   │   │   ├── LibrarySection.tsx  # 3x4 Grid, Sort dropdown, muscle filters
│   │   │   └── WorkoutCard.tsx     # Card with stats, tags, and plan actions
│   │   ├── layout/
│   │   │   ├── Footer.tsx          # Brand footer with copyright
│   │   │   └── Navbar.tsx          # Sticky Navbar with live Plan & Saved counters
│   │   ├── plan/
│   │   │   ├── EmptyPlanState.tsx  # "Nothing Here Yet" state
│   │   │   ├── MetricsSummary.tsx  # 3 reactive metric cards
│   │   │   ├── MyPlanView.tsx      # Main plan view with tabs
│   │   │   └── PlanCard.tsx        # Planned workout card with Mark Done & Remove
│   │   └── workout/
│   │       └── WorkoutDetailsView.tsx  # 2-column detail specifications
│   ├── context/
│   │   └── PlanContext.tsx     # State management, LocalStorage sync & toast dispatch
│   ├── data/
│   │   └── mockWorkouts.ts     # Offline resilient fallback dataset
│   ├── services/
│   │   └── api.ts              # Resilient multi-tier API fetcher
│   └── types/
│       └── workout.ts          # TypeScript interfaces & types
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/sjahanothye/Assignment06.git
cd Assignment06
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 📝 Assignment Requirements Checklist

- [x] Responsive layout across Mobile, Tablet, and Desktop screens
- [x] Minimum 8+ meaningful Git commits
- [x] Navbar with Logo, Workout/My Plan navigation, and active highlighted state
- [x] Live `#ccff00` filled "Plan" counter badge and outlined "Saved" counter badge linking to `/my-plan`
- [x] Hero Section with eyebrow, Oswald display heading, and smooth anchor CTA scroll to `#library`
- [x] 3x4 Responsive Library Grid with category tags, equipment, and duration/calorie/rating stats
- [x] Two-column Workout Details page with large visual, Key Specs matrix, and 4 instruction steps
- [x] "Add to today's plan" (with 5-lift cap protection) and "Save for later" with instant toasts
- [x] My Plan page with live 3-metric dashboard (`Exercises`, `Minutes`, `Calories`)
- [x] Challenge C1: Sort By dropdown (`Duration`, `Calories`, `Rating`) with sorting order
- [x] Challenge C2: Detailed, comprehensive GitHub README.md
- [x] Challenge C3: "Mark as Done" with confetti celebration and Remove (`X`) buttons with toasts
- [x] Custom 404 Not Found and Loading skeleton animations
- [x] LocalStorage persistence for plans and saved workouts

---

## 👤 Author

**Sumaya Jahan Othye**  
- GitHub: [@sjahanothye](https://github.com/sjahanothye)
- Repository: [Assignment06](https://github.com/sjahanothye/Assignment06)

---

*© 2026 FitLog — Workout Library. Train hard, log honest.*
