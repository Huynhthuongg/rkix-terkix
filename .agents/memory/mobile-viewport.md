---
name: Mobile Viewport Rules
description: Required settings for perfect mobile layout — no zoom, no bounce, no overflow.
---

**index.html viewport meta must include:**
```
width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover
```
Plus: `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`, `theme-color`.

**CSS resets required:**
- `html, body`: `height: 100%; height: -webkit-fill-available; overflow: hidden; overscroll-behavior: none`
- `#root`: `width: 100%; height: 100%; height: -webkit-fill-available; overflow: hidden`
- Root app div: `w-full h-full` (NOT `w-screen h-screen` which can overflow on mobile)
- Inputs: `font-size: 16px` on mobile to prevent iOS auto-zoom (override to `inherit` on md+)

**Why:** iOS Safari address bar causes height issues; `w-screen` can exceed 100vw on some devices; iOS zooms into inputs with font-size < 16px.
