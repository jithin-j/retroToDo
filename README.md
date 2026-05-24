# ToDO_ — Retro Task Terminal

A retro CRT-themed task manager built with React + Vite. Cream paper meets terracotta ink, scanlines, double-line borders, and a blinking cursor — productivity that looks like it ships on a floppy disk.

![Favicon](./public/favicon.svg)

---

## Features

- **Three columns** — Pending / In Progress / Done
- **Drag & drop** tasks between columns
- **Add tasks** via the composer bar — press `/` to focus, `Enter` to add
- **Inline edit** — double-click any task to rename it
- **Toggle done** — checking a task auto-moves it to the Done column, unchecking bounces it back to Pending
- **Move buttons** — `◀ ▶` arrows to step a task left or right between columns
- **Clear archive** — one-click wipe of the Done column
- **Light / Dark mode** — `☀ DAY` / `☾ NITE` toggle, or press `⌘D` / `Ctrl+D`
- **Progress bar** — `█░` block-style bar showing overall completion percentage
- **Live clock** — real-time date + time in the header
- **localStorage persistence** — tasks and theme survive page reloads

## Design

| Token | Light | Dark |
|---|---|---|
| Background | `#f3ebd8` cream | `#1a120b` espresso |
| Paper | `#faf3e0` | `#221710` |
| Accent | `#c1532a` terracotta | `#e0723c` |
| Text | `#3a1f12` dark brown | `#f3e6cc` |

Fonts: **VT323** (display) + **IBM Plex Mono** (body)  
Effects: scanline overlay, radial vignette, double-line borders, blinking cursor

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

## Project Structure

```
src/
├── App.jsx                 # Root — all state & task logic
├── index.css               # CSS variables, scanlines, vignette, animations
├── components/
│   ├── Header.jsx          # Live clock, theme toggle
│   ├── Composer.jsx        # New task input + column selector
│   ├── Column.jsx          # Drop target, task list, count badge
│   ├── TaskItem.jsx        # Drag source, inline edit, action buttons
│   ├── Footer.jsx          # Stats and progress bar
│   └── ui.jsx              # DoubleBorder + Blink primitives
└── lib/
    ├── tasks.js            # Column config, uid, seed data, migration
    └── storage.js          # localStorage helpers
```

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `/` | Focus the task input |
| `Enter` | Add the task |
| `Escape` | Blur input / cancel inline edit |
| `⌘D` / `Ctrl+D` | Toggle light/dark theme |
