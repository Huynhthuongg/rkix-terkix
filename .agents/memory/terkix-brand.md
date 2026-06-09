---
name: TerKix Brand
description: Brand name, logo badge, and replacement pattern for TerKix app.
---

The correct brand name is **TerKix** (not RKix, RKix OS, or any variant).

- Logo badge text: **TK** (2 chars), color: `#58A6FF` (blue)
- Sidebar title: "TerKix", subtitle: "AI Workspace v1.0.5"
- Header mobile badge: "TK" same blue
- Replace with: `sed -i 's/RKix/TerKix/g; s/rkix/terkix/g; s/RKIX/TERKIX/g'`

**Why:** User explicitly owns the TerKix brand. Any agent-generated text defaulted to RKix which was wrong.

**How to apply:** After any large code generation, grep for RKix and replace. CNAME file already points to terkix.com.
