# Design System & Style Guide

This document establishes the official visual language, design tokens, component architecture, and styling rules for the entire application. All future pages, components, and modifications **must** adhere strictly to this guide to maintain 100% aesthetic consistency.

---

## 1. Core Visual Concept: "The Connected Blue Canvas"

The UI uses a **two-tier architecture**:
1. **Tier 1: Royal Blue Outer Environment (Frame & Rail)**
   - The entire application lives inside a vibrant, deep royal blue canvas (`#2563EB` to `#1D4ED8`) with subtle atmospheric lighting.
   - The left sidebar is an integrated vertical navigation rail sitting directly inside this blue zone.
   - Active navigation items use an **electric lime squircle (`#E2FD52`)** for maximum visual contrast and tactile clarity.
2. **Tier 2: Elevated Inset White Surface (Application Canvas)**
   - The main workspace is an elevated, floating white card with generous corner radius (`rounded-[28px]` or `rounded-[32px]`).
   - It seamlessly connects with the blue frame via smooth borders and deep diffused drop shadows (`shadow-[0_20px_50px_rgba(15,23,42,0.18)]`).
   - Clean, bright, airy interior with subtle slate borders (`border-slate-100` / `border-blue-50/50`).

---

## 2. Color Palette & Tokens

### 2.1 Primary & Canvas
| Token Name | Hex Code | Purpose / Usage |
| :--- | :--- | :--- |
| `blue-frame-start` | `#2563EB` | Outer frame gradient top |
| `blue-frame-end` | `#1D4ED8` | Outer frame gradient bottom |
| `blue-frame-dark` | `#1E40AF` | Deep contrast in rail & shadow accents |
| `accent-lime` | `#E2FD52` | Active rail icon highlight, high-energy accents |
| `accent-lime-hover` | `#D4FF32` | Hover on lime buttons / badges |
| `surface-white` | `#FFFFFF` | Main inner app card background |
| `surface-subtle` | `#F8FAFC` | Secondary backgrounds, inactive tabs, stat cards |
| `surface-inset` | `#F1F5F9` | Input fields, search bars, tag backgrounds |

### 2.2 Semantic & Accent Colors
| Category | Hex Code | Token | Usage |
| :--- | :--- | :--- | :--- |
| **Primary Action** | `#2563EB` / `#1D4ED8` | `blue-600` / `blue-700` | CTA buttons, active tabs, primary links |
| **Success** | `#10B981` / `#ECFDF5` | `emerald-500` / `emerald-50` | Completed status, 100% progress, positive change |
| **Warning / Flame** | `#F59E0B` / `#FEF3C7` | `amber-500` / `amber-50` | Streak flame, days left countdown, urgent reminders |
| **Purple / Analytics** | `#7C3AED` / `#F5F3FF` | `violet-600` / `violet-50` | Preparation score, AI tags, donut charts |
| **Alert / Critical** | `#EF4444` / `#FEF2F2` | `red-500` / `red-50` | Unread notification dots, errors, warnings |

### 2.3 Typography & Neutral Hierarchy
| Level | Font Size | Weight | Color | Hex |
| :--- | :--- | :--- | :--- | :--- |
| **Display / Page Title** | 24px - 28px (`text-2xl`) | Bold (`font-bold`) | Slate 900 | `#0F172A` |
| **Section Heading** | 18px - 20px (`text-lg` / `text-xl`) | Semi-Bold (`font-semibold`) | Slate 800 | `#1E293B` |
| **Card Title** | 15px - 16px (`text-base`) | Semi-Bold (`font-semibold`) | Slate 800 | `#1E293B` |
| **Body Text** | 13px - 14px (`text-sm`) | Normal / Medium | Slate 600 | `#475569` |
| **Subtext / Captions** | 11px - 12px (`text-xs`) | Medium | Slate 400 | `#94A3B8` |

---

## 3. Spacing & Geometry Tokens

- **Outer App Padding**: `p-3 md:p-5 lg:p-6` around the blue container.
- **Inner Canvas Border Radius**: `rounded-[28px]` or `rounded-[32px]`.
- **Card Border Radius**: `rounded-2xl` (16px) for interior cards, `rounded-xl` (12px) for nested widgets.
- **Pill Badges**: `rounded-full` with `px-3 py-1 text-xs font-semibold`.
- **Rail Icon Buttons**: 44px x 44px (`w-11 h-11`), `rounded-2xl` with centered iconography.

---

## 4. Component Rules & Standards

### 4.1 Navigation Rail (`Sidebar.tsx`)
1. Always positioned within the blue outer frame on the left.
2. Contains:
   - Top: Brand Logo pill/squircle.
   - Middle: Navigation icons (Home, Kits, Practice, Schedule, Resources, Analytics).
   - Bottom: Profile and Settings icons.
3. States:
   - **Active**: `bg-[#E2FD52] text-slate-900 shadow-md scale-105`
   - **Inactive**: `bg-white/10 hover:bg-white/20 text-white/90 hover:scale-105 transition-all`

### 4.2 Top Header (`Header.tsx`)
1. Lives inside the white inner canvas at the top.
2. Contains:
   - Quick search input (`bg-slate-50 border border-slate-200/80 rounded-full pl-10 pr-4 py-2`).
   - Notification Bell & Message Mail icons with red active status indicator dot.
   - User profile pill showing avatar, "Harsh Singh", and role "Aspiring Full Stack Developer".
   - Primary CTA button "+ Create New Interview Kit" with vibrant blue styling.

### 4.3 Stat Cards
1. Four symmetric cards in a grid.
2. Distinct category accent (Blue, Green, Peach, Purple).
3. Accompanied by micro-visual indicators: mini bar charts, sparklines, or radial circles.
4. Trend indicator (`↑ 2 this month`) in colored text with upward arrow.

### 4.4 Hero Callout Card
1. Soft gradient background (`from-blue-50/90 via-sky-50/60 to-indigo-50/40`).
2. Border with soft glow (`border border-blue-100/80`).
3. Left side: "GET STARTED" badge, title, descriptive copy, and dual action buttons.
4. Right side: Interactive diagram card with AI orb badge, workflow steps, and handwritten cursive accent.

### 4.5 Interview Kit Cards
1. Company logo avatar badge (Google, OpenAI, Stripe, etc.).
2. Status pill:
   - `In Progress`: Blue soft pill (`bg-blue-50 text-blue-700 border-blue-150`)
   - `Completed`: Emerald soft pill (`bg-emerald-50 text-emerald-700 border-emerald-150`)
   - `Not Started`: Slate/Violet soft pill (`bg-slate-100 text-slate-600`)
3. Skill/Topic tags (`bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md`).
4. Progress bar with rounded caps and percentage label.
5. Action button with arrow indicator ("Continue ->" or "View Kit ->").

### 4.6 Today's Focus & Widgets
1. Checkbox items with custom circular check marks that toggle completed state.
2. Study streak widget with Mon-Sun pill tracker and active highlighted day.
3. Motivation card with mountain landscape illustration and encouraging quote.

---

## 5. Do's and Don'ts

| Do | Don't |
| :--- | :--- |
| Maintain the outer blue frame + inner rounded white card on all routes | Do not remove the blue outer framing on sub-pages |
| Use `#E2FD52` electric lime for active rail indicator | Do not use plain generic colors for active indicators |
| Use soft tints (`bg-blue-50`, `bg-emerald-50`) for status chips | Do not use saturated primary colors for card backgrounds |
| Keep typography crisp with `font-sans` and slate shades | Do not use default un-styled system fonts |
| Add subtle transitions (`transition-all duration-200`) | Do not create abrupt un-animated hover states |
