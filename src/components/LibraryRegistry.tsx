import React, { useState, useMemo } from "react";
import { Search, Star, Download, ExternalLink, Copy, Check, Package, Code2, Blocks, Cpu, Globe, BookOpen, Zap, Filter } from "lucide-react";

type LibEntry = {
  name: string;
  org: string;
  avatar: string;
  desc: string;
  category: string;
  type: "npm" | "github" | "vscode" | "pypi" | "cargo";
  stars?: string;
  weekly?: string;
  version: string;
  install: string;
  tags: string[];
  lang: string;
};

const CATEGORIES = [
  { id: "all", label: "Tất cả", icon: Blocks },
  { id: "frontend", label: "Frontend", icon: Globe },
  { id: "backend", label: "Backend", icon: Cpu },
  { id: "css", label: "CSS / UI", icon: Zap },
  { id: "tools", label: "Build Tools", icon: Package },
  { id: "testing", label: "Testing", icon: Check },
  { id: "database", label: "Database", icon: BookOpen },
  { id: "state", label: "State / Data", icon: Code2 },
  { id: "vscode", label: "VSCode", icon: ExternalLink },
];

const TYPE_BADGE: Record<string, { bg: string; text: string; label: string }> = {
  npm:    { bg: "#CC3534", text: "#fff", label: "npm" },
  github: { bg: "#21262D", text: "#c9d1d9", label: "GitHub" },
  vscode: { bg: "#007ACC", text: "#fff", label: "VS Code" },
  pypi:   { bg: "#3572A5", text: "#fff", label: "PyPI" },
  cargo:  { bg: "#dea584", text: "#1a0f08", label: "Cargo" },
};

const LIBS: LibEntry[] = [
  // Frontend
  { name:"react", org:"facebook", avatar:"https://github.com/facebook.png", desc:"A JavaScript library for building user interfaces with components.", category:"frontend", type:"npm", stars:"230k", weekly:"27M", version:"18.3.1", install:"npm i react react-dom", tags:["ui","frontend","jsx"], lang:"JavaScript" },
  { name:"next.js", org:"vercel", avatar:"https://github.com/vercel.png", desc:"The React Framework – production-grade React apps with SSR, SSG, ISR.", category:"frontend", type:"npm", stars:"126k", weekly:"8.4M", version:"15.2.4", install:"npx create-next-app@latest", tags:["react","ssr","fullstack"], lang:"TypeScript" },
  { name:"vue", org:"vuejs", avatar:"https://github.com/vuejs.png", desc:"Progressive JavaScript Framework for building user interfaces.", category:"frontend", type:"npm", stars:"207k", weekly:"4.2M", version:"3.5.13", install:"npm i vue", tags:["vue","ui","reactive"], lang:"TypeScript" },
  { name:"svelte", org:"sveltejs", avatar:"https://github.com/sveltejs.png", desc:"Cybernetically enhanced web apps – compiles at build time.", category:"frontend", type:"npm", stars:"80k", weekly:"1.8M", version:"5.8.1", install:"npx sv create my-app", tags:["compiler","frontend","performance"], lang:"TypeScript" },
  { name:"astro", org:"withastro", avatar:"https://github.com/withastro.png", desc:"The web framework for content-driven websites with island architecture.", category:"frontend", type:"npm", stars:"47k", weekly:"980k", version:"5.4.3", install:"npm create astro@latest", tags:["ssg","islands","performance"], lang:"TypeScript" },
  { name:"remix", org:"remix-run", avatar:"https://github.com/remix-run.png", desc:"Build Better Websites with full-stack React framework.", category:"frontend", type:"npm", stars:"30k", weekly:"760k", version:"2.15.3", install:"npx create-remix@latest", tags:["react","ssr","routing"], lang:"TypeScript" },
  { name:"angular", org:"angular", avatar:"https://github.com/angular.png", desc:"Deliver web apps with confidence. One framework, mobile & desktop.", category:"frontend", type:"npm", stars:"96k", weekly:"3.8M", version:"19.2.0", install:"ng new my-app", tags:["framework","spa","typescript"], lang:"TypeScript" },
  { name:"nuxt", org:"nuxt", avatar:"https://github.com/nuxt.png", desc:"The Intuitive Vue Framework – universal Vue applications.", category:"frontend", type:"npm", stars:"55k", weekly:"1.2M", version:"3.15.4", install:"npx nuxi@latest init my-app", tags:["vue","ssr","universal"], lang:"TypeScript" },
  // CSS / UI
  { name:"tailwindcss", org:"tailwindlabs", avatar:"https://github.com/tailwindlabs.png", desc:"A utility-first CSS framework for rapid UI development.", category:"css", type:"npm", stars:"84k", weekly:"14M", version:"4.1.3", install:"npm i tailwindcss", tags:["css","utility","design"], lang:"CSS" },
  { name:"shadcn-ui", org:"shadcn-ui", avatar:"https://github.com/shadcn-ui.png", desc:"Beautifully designed components built on Radix UI + Tailwind.", category:"css", type:"github", stars:"83k", weekly:"610k", version:"0.9.4", install:"npx shadcn@latest init", tags:["components","radix","tailwind"], lang:"TypeScript" },
  { name:"radix-ui", org:"radix-ui", avatar:"https://github.com/radix-ui.png", desc:"Unstyled, accessible UI components for React applications.", category:"css", type:"npm", stars:"16k", weekly:"4.8M", version:"1.1.3", install:"npm i @radix-ui/react-dialog", tags:["accessibility","headless","react"], lang:"TypeScript" },
  { name:"framer-motion", org:"framer", avatar:"https://github.com/framer.png", desc:"Production-ready animations for React with a declarative API.", category:"css", type:"npm", stars:"24k", weekly:"4.1M", version:"12.5.0", install:"npm i framer-motion", tags:["animation","react","motion"], lang:"TypeScript" },
  { name:"styled-components", org:"styled-components", avatar:"https://github.com/styled-components.png", desc:"Visual primitives for the component age — CSS-in-JS.", category:"css", type:"npm", stars:"40k", weekly:"5.2M", version:"6.1.14", install:"npm i styled-components", tags:["css-in-js","react","styling"], lang:"TypeScript" },
  { name:"bootstrap", org:"twbs", avatar:"https://github.com/twbs.png", desc:"The most popular HTML, CSS, and JS library in the world.", category:"css", type:"npm", stars:"171k", weekly:"6.7M", version:"5.3.3", install:"npm i bootstrap", tags:["css","responsive","components"], lang:"CSS" },
  { name:"lucide-react", org:"lucide-icons", avatar:"https://github.com/lucide-icons.png", desc:"Beautiful & consistent icon toolkit made by the community.", category:"css", type:"npm", stars:"12k", weekly:"3.9M", version:"0.475.0", install:"npm i lucide-react", tags:["icons","react","svg"], lang:"TypeScript" },
  { name:"recharts", org:"recharts", avatar:"https://github.com/recharts.png", desc:"Redefined chart library built with React and D3.", category:"css", type:"npm", stars:"24k", weekly:"2.1M", version:"2.15.0", install:"npm i recharts", tags:["charts","react","d3"], lang:"TypeScript" },
  // Build Tools
  { name:"vite", org:"vitejs", avatar:"https://github.com/vitejs.png", desc:"Next generation frontend tooling — blazing fast dev server & build.", category:"tools", type:"npm", stars:"69k", weekly:"11M", version:"6.2.3", install:"npm create vite@latest", tags:["bundler","build","fast"], lang:"TypeScript" },
  { name:"typescript", org:"microsoft", avatar:"https://github.com/microsoft.png", desc:"TypeScript is JavaScript with syntax for types — superset of JS.", category:"tools", type:"npm", stars:"101k", weekly:"55M", version:"5.7.3", install:"npm i -D typescript", tags:["types","compiler","javascript"], lang:"TypeScript" },
  { name:"eslint", org:"eslint", avatar:"https://github.com/eslint.png", desc:"Find and fix problems in your JavaScript code. Pluggable linter.", category:"tools", type:"npm", stars:"25k", weekly:"43M", version:"9.21.0", install:"npm i -D eslint", tags:["linting","code-quality","javascript"], lang:"JavaScript" },
  { name:"prettier", org:"prettier", avatar:"https://github.com/prettier.png", desc:"Opinionated code formatter. Enforces consistent style automatically.", category:"tools", type:"npm", stars:"49k", weekly:"34M", version:"3.5.3", install:"npm i -D prettier", tags:["formatter","code-style","tools"], lang:"JavaScript" },
  { name:"webpack", org:"webpack", avatar:"https://github.com/webpack.png", desc:"A static module bundler for modern JavaScript applications.", category:"tools", type:"npm", stars:"64k", weekly:"22M", version:"5.98.0", install:"npm i -D webpack webpack-cli", tags:["bundler","module","build"], lang:"JavaScript" },
  { name:"rollup", org:"rollup", avatar:"https://github.com/rollup.png", desc:"Module bundler for JavaScript — compile small pieces of code.", category:"tools", type:"npm", stars:"25k", weekly:"18M", version:"4.29.1", install:"npm i -D rollup", tags:["bundler","esm","library"], lang:"JavaScript" },
  { name:"turbo", org:"vercel", avatar:"https://github.com/vercel.png", desc:"Turborepo — high-performance build system for JavaScript & TypeScript.", category:"tools", type:"npm", stars:"26k", weekly:"2.8M", version:"2.3.4", install:"npx turbo init", tags:["monorepo","build","cache"], lang:"TypeScript" },
  { name:"biome", org:"biomejs", avatar:"https://github.com/biomejs.png", desc:"One toolchain for your web project. Format, lint, check in milliseconds.", category:"tools", type:"npm", stars:"16k", weekly:"1.4M", version:"1.9.4", install:"npm i -D @biomejs/biome", tags:["linter","formatter","fast"], lang:"Rust" },
  // Backend
  { name:"express", org:"expressjs", avatar:"https://github.com/expressjs.png", desc:"Fast, unopinionated, minimalist web framework for Node.js.", category:"backend", type:"npm", stars:"65k", weekly:"35M", version:"4.21.2", install:"npm i express", tags:["http","server","nodejs"], lang:"JavaScript" },
  { name:"fastify", org:"fastify", avatar:"https://github.com/fastify.png", desc:"Fast and low overhead web framework for Node.js. Blazingly fast.", category:"backend", type:"npm", stars:"33k", weekly:"3.8M", version:"5.2.1", install:"npm i fastify", tags:["http","performance","nodejs"], lang:"JavaScript" },
  { name:"nestjs", org:"nestjs", avatar:"https://github.com/nestjs.png", desc:"A progressive Node.js framework for efficient, scalable server-side apps.", category:"backend", type:"npm", stars:"68k", weekly:"4.2M", version:"10.4.15", install:"npm i @nestjs/cli -g", tags:["typescript","enterprise","oop"], lang:"TypeScript" },
  { name:"hono", org:"honojs", avatar:"https://github.com/honojs.png", desc:"Ultrafast web framework for the Edges — Workers, Deno, Bun, Node.", category:"backend", type:"npm", stars:"22k", weekly:"1.2M", version:"4.7.0", install:"npm i hono", tags:["edge","cloudflare","fast"], lang:"TypeScript" },
  { name:"trpc", org:"trpc", avatar:"https://github.com/trpc.png", desc:"End-to-end typesafe APIs made easy — TypeScript from client to server.", category:"backend", type:"npm", stars:"35k", weekly:"1.8M", version:"11.1.0", install:"npm i @trpc/server @trpc/client", tags:["api","typesafe","rpc"], lang:"TypeScript" },
  { name:"socket.io", org:"socketio", avatar:"https://github.com/socketio.png", desc:"Bidirectional and low-latency event-based communication for every platform.", category:"backend", type:"npm", stars:"61k", weekly:"6.2M", version:"4.8.1", install:"npm i socket.io", tags:["websocket","realtime","events"], lang:"TypeScript" },
  { name:"graphql-js", org:"graphql", avatar:"https://github.com/graphql.png", desc:"A reference implementation of GraphQL for JavaScript.", category:"backend", type:"npm", stars:"20k", weekly:"8.1M", version:"16.10.0", install:"npm i graphql", tags:["api","schema","query"], lang:"TypeScript" },
  // Database / ORM
  { name:"prisma", org:"prisma", avatar:"https://github.com/prisma.png", desc:"Next-generation Node.js and TypeScript ORM for PostgreSQL, MySQL, SQLite, MongoDB.", category:"database", type:"npm", stars:"39k", weekly:"2.6M", version:"6.4.1", install:"npm i prisma @prisma/client", tags:["orm","sql","typescript"], lang:"TypeScript" },
  { name:"drizzle-orm", org:"drizzle-team", avatar:"https://github.com/drizzle-team.png", desc:"Headless TypeScript ORM with a head. It is the only ORM with both relational and SQL-like query APIs.", category:"database", type:"npm", stars:"26k", weekly:"1.4M", version:"0.40.0", install:"npm i drizzle-orm", tags:["orm","sql","typesafe"], lang:"TypeScript" },
  { name:"mongoose", org:"Automattic", avatar:"https://github.com/Automattic.png", desc:"MongoDB object modeling for Node.js. Schema-based solution for modeling data.", category:"database", type:"npm", stars:"27k", weekly:"3.2M", version:"8.11.0", install:"npm i mongoose", tags:["mongodb","odm","nodejs"], lang:"TypeScript" },
  { name:"supabase-js", org:"supabase", avatar:"https://github.com/supabase.png", desc:"An isomorphic Javascript client for Supabase. Realtime, auth, storage, database.", category:"database", type:"npm", stars:"6k", weekly:"1.1M", version:"2.49.1", install:"npm i @supabase/supabase-js", tags:["postgres","realtime","backend"], lang:"TypeScript" },
  { name:"redis", org:"redis", avatar:"https://github.com/redis.png", desc:"A high-performance Node.js Redis client. Modern, efficient, reliable.", category:"database", type:"npm", stars:"17k", weekly:"5.4M", version:"4.7.0", install:"npm i redis", tags:["cache","in-memory","pub-sub"], lang:"TypeScript" },
  // State / Data
  { name:"zustand", org:"pmndrs", avatar:"https://github.com/pmndrs.png", desc:"Bear necessities for state management in React. Small, fast, scalable.", category:"state", type:"npm", stars:"49k", weekly:"7.8M", version:"5.0.3", install:"npm i zustand", tags:["state","react","simple"], lang:"TypeScript" },
  { name:"tanstack-query", org:"TanStack", avatar:"https://github.com/TanStack.png", desc:"Powerful server-state management for TS/JS. Fetch, cache, sync, update.", category:"state", type:"npm", stars:"42k", weekly:"6.9M", version:"5.69.0", install:"npm i @tanstack/react-query", tags:["server-state","fetching","cache"], lang:"TypeScript" },
  { name:"redux-toolkit", org:"reduxjs", avatar:"https://github.com/reduxjs.png", desc:"The official, opinionated, batteries-included Redux toolset.", category:"state", type:"npm", stars:"11k", weekly:"5.2M", version:"2.5.1", install:"npm i @reduxjs/toolkit react-redux", tags:["redux","state","predictable"], lang:"TypeScript" },
  { name:"jotai", org:"pmndrs", avatar:"https://github.com/pmndrs.png", desc:"Primitive and flexible state management for React — atomic.", category:"state", type:"npm", stars:"18k", weekly:"2.9M", version:"2.12.3", install:"npm i jotai", tags:["atoms","state","react"], lang:"TypeScript" },
  { name:"zod", org:"colinhacks", avatar:"https://github.com/colinhacks.png", desc:"TypeScript-first schema validation with static type inference.", category:"state", type:"npm", stars:"34k", weekly:"24M", version:"3.24.2", install:"npm i zod", tags:["validation","schema","types"], lang:"TypeScript" },
  { name:"axios", org:"axios", avatar:"https://github.com/axios.png", desc:"Promise based HTTP client for the browser and node.js. Interceptors, transforms.", category:"state", type:"npm", stars:"105k", weekly:"56M", version:"1.7.9", install:"npm i axios", tags:["http","fetch","promise"], lang:"JavaScript" },
  { name:"swr", org:"vercel", avatar:"https://github.com/vercel.png", desc:"React Hooks for Data Fetching — stale-while-revalidate strategy.", category:"state", type:"npm", stars:"30k", weekly:"4.1M", version:"2.3.3", install:"npm i swr", tags:["fetching","cache","react"], lang:"TypeScript" },
  // Testing
  { name:"jest", org:"jestjs", avatar:"https://github.com/jestjs.png", desc:"Delightful JavaScript Testing. Zero config, fast, snapshot testing.", category:"testing", type:"npm", stars:"44k", weekly:"20M", version:"29.7.0", install:"npm i -D jest", tags:["unit","snapshot","runner"], lang:"JavaScript" },
  { name:"vitest", org:"vitest-dev", avatar:"https://github.com/vitest-dev.png", desc:"Next generation testing framework powered by Vite. Native ESM support.", category:"testing", type:"npm", stars:"13k", weekly:"6.4M", version:"3.0.9", install:"npm i -D vitest", tags:["vite","fast","modern"], lang:"TypeScript" },
  { name:"playwright", org:"microsoft", avatar:"https://github.com/microsoft.png", desc:"Reliable end-to-end testing for modern web apps across all browsers.", category:"testing", type:"npm", stars:"68k", weekly:"4.8M", version:"1.50.0", install:"npm i -D @playwright/test", tags:["e2e","browser","automation"], lang:"TypeScript" },
  { name:"cypress", org:"cypress-io", avatar:"https://github.com/cypress-io.png", desc:"Fast, easy, reliable testing for anything that runs in a browser.", category:"testing", type:"npm", stars:"47k", weekly:"3.2M", version:"14.0.3", install:"npm i -D cypress", tags:["e2e","component","visual"], lang:"JavaScript" },
  { name:"testing-library", org:"testing-library", avatar:"https://github.com/testing-library.png", desc:"Simple and complete testing utilities that encourage good testing practices.", category:"testing", type:"npm", stars:"19k", weekly:"8.7M", version:"16.3.0", install:"npm i -D @testing-library/react", tags:["react","dom","accessibility"], lang:"TypeScript" },
  // VSCode Extensions
  { name:"Prettier", org:"prettier", avatar:"https://github.com/prettier.png", desc:"VS Code extension for Prettier — code formatter. Auto format on save.", category:"vscode", type:"vscode", stars:"9.2M", version:"11.0.0", install:"ext install esbenp.prettier-vscode", tags:["formatter","code-style"], lang:"TypeScript" },
  { name:"ESLint", org:"eslint", avatar:"https://github.com/eslint.png", desc:"Integrates ESLint JavaScript into VS Code. Fix errors on save.", category:"vscode", type:"vscode", stars:"30M", version:"3.0.10", install:"ext install dbaeumer.vscode-eslint", tags:["linting","javascript"], lang:"TypeScript" },
  { name:"GitLens", org:"gitkraken", avatar:"https://github.com/gitkraken.png", desc:"GitLens supercharges Git inside VS Code. Blame, history, insights.", category:"vscode", type:"vscode", stars:"23M", version:"16.3.2", install:"ext install eamodio.gitlens", tags:["git","blame","history"], lang:"TypeScript" },
  { name:"GitHub Copilot", org:"github", avatar:"https://github.com/github.png", desc:"Your AI pair programmer. Get AI-based code suggestions as you type.", category:"vscode", type:"vscode", stars:"18M", version:"1.273.0", install:"ext install GitHub.copilot", tags:["ai","autocomplete","pair"], lang:"TypeScript" },
  { name:"Tailwind CSS IntelliSense", org:"tailwindlabs", avatar:"https://github.com/tailwindlabs.png", desc:"Intelligent Tailwind CSS tooling for VS Code — autocomplete, hover, linting.", category:"vscode", type:"vscode", stars:"12M", version:"0.14.10", install:"ext install bradlc.vscode-tailwindcss", tags:["tailwind","css","intellisense"], lang:"TypeScript" },
  { name:"Thunder Client", org:"thunderclient", avatar:"https://github.com/thunderclient.png", desc:"Lightweight REST API Client. Like Postman, but inside VS Code.", category:"vscode", type:"vscode", stars:"4.8M", version:"2.33.2", install:"ext install rangav.vscode-thunder-client", tags:["api","rest","http"], lang:"TypeScript" },
  { name:"Prisma", org:"prisma", avatar:"https://github.com/prisma.png", desc:"Adds syntax highlighting, formatting, jump-to-definition for Prisma schema.", category:"vscode", type:"vscode", stars:"2.1M", version:"6.4.1", install:"ext install Prisma.prisma", tags:["orm","schema","database"], lang:"TypeScript" },
  { name:"Docker", org:"microsoft", avatar:"https://github.com/microsoft.png", desc:"Makes it easy to build, manage, and deploy containerized applications.", category:"vscode", type:"vscode", stars:"7.8M", version:"1.30.0", install:"ext install ms-azuretools.vscode-docker", tags:["docker","container","devops"], lang:"TypeScript" },
];

export default function LibraryRegistry() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return LIBS.filter(lib => {
      const matchCat = category === "all" || lib.category === category;
      const matchType = typeFilter === "all" || lib.type === typeFilter;
      const matchQ = !q || lib.name.toLowerCase().includes(q) || lib.desc.toLowerCase().includes(q) || lib.tags.some(t => t.includes(q));
      return matchCat && matchType && matchQ;
    });
  }, [search, category, typeFilter]);

  const handleCopy = (id: string, cmd: string) => {
    navigator.clipboard?.writeText(cmd).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#02050c]">

      {/* ── Header ── */}
      <div className="border-b border-[#102142] bg-[#030810] px-4 py-3 shrink-0">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              <Package size={15} className="text-[#0052cc]" />
              Thư viện & Packages
            </h1>
            <p className="text-[10px] text-[#5a7aaa] mt-0.5">npm · GitHub · VSCode · PyPI · Cargo — {LIBS.length}+ thư viện</p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#3a6aaa]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Tìm thư viện, package…"
              className="bg-[#060d20] border border-[#102142] text-[11px] font-mono text-white placeholder-[#1e3355] pl-7 pr-3 py-1.5 focus:outline-none focus:border-[#0052cc]/60 w-48 md:w-64"
            />
          </div>
        </div>

        {/* Type filter */}
        <div className="flex gap-1.5 mt-2 flex-wrap">
          {(["all","npm","github","vscode","pypi","cargo"] as const).map(t => {
            const badge = TYPE_BADGE[t];
            return (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1 text-[9px] font-mono font-bold uppercase border transition cursor-pointer ${typeFilter === t ? "text-white" : "bg-[#060d20] border-[#102142] text-[#3a6aaa] hover:text-white"}`}
                style={typeFilter === t && badge ? { backgroundColor: badge.bg + "30", borderColor: badge.bg + "60", color: badge.text === "#fff" ? "#fff" : badge.text } : {}}
              >
                {t === "all" ? "Tất cả" : badge ? badge.label : t}
              </button>
            );
          })}
          <span className="ml-auto text-[9px] font-mono text-[#3a6aaa] self-center">{filtered.length} kết quả</span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 overflow-hidden flex min-h-0">

        {/* Category sidebar */}
        <div className="hidden md:flex flex-col w-44 shrink-0 border-r border-[#102142] bg-[#030810] overflow-y-auto">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const count = cat.id === "all" ? LIBS.length : LIBS.filter(l => l.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`flex items-center gap-2.5 px-3 py-2.5 text-left text-[11px] font-mono transition cursor-pointer border-l-2 ${
                  category === cat.id
                    ? "border-l-[#0052cc] bg-[#060d20] text-white"
                    : "border-l-transparent text-[#5a7aaa] hover:text-[#c9d1d9] hover:bg-[#060d20]/60"
                }`}
              >
                <Icon size={12} className="shrink-0" />
                <span className="flex-1 truncate">{cat.label}</span>
                <span className="text-[8px] text-[#3a6aaa] bg-[#102142] px-1.5 py-0.5">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Library grid */}
        <div className="flex-1 overflow-y-auto p-3">
          {/* Mobile category pills */}
          <div className="flex gap-1.5 flex-wrap mb-3 md:hidden">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-2.5 py-1 text-[9px] font-mono border transition cursor-pointer ${category === cat.id ? "bg-[#0052cc] border-[#0052cc] text-white" : "bg-[#060d20] border-[#102142] text-[#3a6aaa]"}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5">
            {filtered.map(lib => {
              const badge = TYPE_BADGE[lib.type];
              const isCopied = copiedId === lib.name;
              return (
                <div key={lib.name + lib.org} className="bg-[#060d20] border border-[#102142] hover:border-[#1a3660] transition flex flex-col group">

                  {/* Top */}
                  <div className="p-3 flex items-start gap-3 border-b border-[#0e1e3a]">
                    <img
                      src={lib.avatar}
                      alt={lib.org}
                      className="w-10 h-10 object-cover border border-[#102142] shrink-0"
                      onError={e => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${lib.name}&background=0d1520&color=58A6FF&size=40`;
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1 flex-wrap">
                        <span className="text-[12px] font-bold text-white font-mono truncate">{lib.name}</span>
                        <span
                          className="text-[7px] font-mono font-bold px-1.5 py-0.5 shrink-0"
                          style={{ backgroundColor: badge.bg + "25", color: badge.text === "#fff" ? "#aac8ff" : badge.text, border: `1px solid ${badge.bg}40` }}
                        >
                          {badge.label}
                        </span>
                      </div>
                      <div className="text-[9px] text-[#3a6aaa] font-mono mt-0.5">{lib.org} · v{lib.version}</div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="px-3 pt-2 pb-1 flex-1">
                    <p className="text-[10px] text-[#8b949e] leading-relaxed line-clamp-2">{lib.desc}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {lib.tags.map(tag => (
                        <span key={tag} className="text-[7px] px-1.5 py-0.5 font-mono border border-[#102142] text-[#3a6aaa]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="px-3 py-1.5 flex items-center gap-3 text-[9px] font-mono text-[#3a6aaa] border-t border-[#0e1e3a] border-b border-b-[#0e1e3a]">
                    {lib.stars && (
                      <span className="flex items-center gap-1">
                        <Star size={8} className="text-yellow-400" fill="currentColor" /> {lib.stars}
                      </span>
                    )}
                    {lib.weekly && (
                      <span className="flex items-center gap-1">
                        <Download size={8} className="text-[#3FB950]" /> {lib.weekly}/w
                      </span>
                    )}
                    <span className="ml-auto text-[#3a6aaa]">{lib.lang}</span>
                  </div>

                  {/* Install command */}
                  <div className="flex items-center bg-[#010309] border-t border-[#0e1e3a]">
                    <code className="flex-1 px-3 py-2 text-[9px] font-mono text-[#5b9bd5] truncate">{lib.install}</code>
                    <button
                      onClick={() => handleCopy(lib.name, lib.install)}
                      className={`h-full px-3 py-2 border-l border-[#0e1e3a] text-[#3a6aaa] hover:text-white transition cursor-pointer flex items-center shrink-0 ${isCopied ? "text-[#3FB950]" : ""}`}
                      title="Copy install command"
                    >
                      {isCopied ? <Check size={11} className="text-[#3FB950]" /> : <Copy size={11} />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-[#3a6aaa]">
              <Search size={32} className="mb-3 opacity-30" />
              <p className="text-[11px] font-mono">Không tìm thấy thư viện nào</p>
              <p className="text-[10px] mt-1 opacity-60">Thử từ khóa khác hoặc đổi bộ lọc</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
