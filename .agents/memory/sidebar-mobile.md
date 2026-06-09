---
name: Sidebar Responsive Pattern
description: How the TerKix sidebar works on mobile vs desktop.
---

**Desktop (md+):** Sidebar is `md:static`, always visible, 220px wide. Part of flex layout.

**Mobile:** Sidebar is `fixed inset-y-0 left-0 z-40`, slides in/out via `translate-x`.
- Hidden: `-translate-x-full`
- Open: `translate-x-0`
- `sidebarOpen` state (boolean, default false) controls this
- Backdrop: `fixed inset-0 z-30 bg-black/60 md:hidden` rendered when open, click closes sidebar
- Each nav item onClick calls `setSidebarOpen(false)` to auto-close after navigation
- Close button (X) visible only on mobile (`md:hidden`)

**Why:** User requires sidebar to not occupy screen space on mobile, but remain always-on on desktop.
