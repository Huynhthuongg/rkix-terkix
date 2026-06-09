import React, { useState } from "react";
import {
  Star, GitFork, Eye, TrendingUp, Users, MessageSquare,
  Filter, Search, Clock, CheckCircle2, Globe, BookOpen,
  ArrowUpRight, Heart, Share2, Code2, Zap, Award, GitBranch
} from "lucide-react";

const LANGS = [
  { name: "TypeScript", color: "#3178c6" },
  { name: "JavaScript", color: "#f7df1e" },
  { name: "Python", color: "#3572A5" },
  { name: "Rust", color: "#dea584" },
  { name: "Go", color: "#00ADD8" },
  { name: "CSS", color: "#563d7c" },
];

const TRENDING_REPOS = [
  { rank: 1, org: "vercel", repo: "next.js", desc: "The React Framework for the Web. Used by some of the world's largest companies.", lang: "TypeScript", langColor: "#3178c6", stars: "126k", forks: "26.9k", today: "+847", topics: ["react","framework","ssr","nextjs"], avatar: "https://github.com/vercel.png" },
  { rank: 2, org: "tailwindlabs", repo: "tailwindcss", desc: "A utility-first CSS framework for rapid UI development.", lang: "CSS", langColor: "#563d7c", stars: "84.2k", forks: "4.3k", today: "+612", topics: ["css","design","utility"], avatar: "https://github.com/tailwindlabs.png" },
  { rank: 3, org: "vitejs", repo: "vite", desc: "Next generation frontend tooling. It's fast!", lang: "TypeScript", langColor: "#3178c6", stars: "69.4k", forks: "6.2k", today: "+534", topics: ["bundler","frontend","build-tool"], avatar: "https://github.com/vitejs.png" },
  { rank: 4, org: "facebook", repo: "react", desc: "The library for web and native user interfaces.", lang: "JavaScript", langColor: "#f7df1e", stars: "230k", forks: "47.1k", today: "+491", topics: ["javascript","ui","frontend"], avatar: "https://github.com/facebook.png" },
  { rank: 5, org: "supabase", repo: "supabase", desc: "The open source Firebase alternative. Build in a weekend, scale to millions.", lang: "TypeScript", langColor: "#3178c6", stars: "73.8k", forks: "7.1k", today: "+463", topics: ["database","backend","postgres"], avatar: "https://github.com/supabase.png" },
  { rank: 6, org: "microsoft", repo: "TypeScript", desc: "TypeScript is a superset of JavaScript that compiles to clean JavaScript output.", lang: "TypeScript", langColor: "#3178c6", stars: "101k", forks: "12.5k", today: "+402", topics: ["language","compiler","types"], avatar: "https://github.com/microsoft.png" },
  { rank: 7, org: "prisma", repo: "prisma", desc: "Next-generation Node.js and TypeScript ORM for PostgreSQL, MySQL, MongoDB.", lang: "TypeScript", langColor: "#3178c6", stars: "39.8k", forks: "1.6k", today: "+378", topics: ["orm","database","nodejs"], avatar: "https://github.com/prisma.png" },
  { rank: 8, org: "TanStack", repo: "query", desc: "Powerful asynchronous state management, server-state utilities and data fetching.", lang: "TypeScript", langColor: "#3178c6", stars: "42.1k", forks: "2.9k", today: "+355", topics: ["react","state","fetching"], avatar: "https://github.com/TanStack.png" },
  { rank: 9, org: "shadcn-ui", repo: "ui", desc: "Beautifully designed components that you can copy and paste into your apps.", lang: "TypeScript", langColor: "#3178c6", stars: "83.5k", forks: "5.8k", today: "+921", topics: ["ui","components","radix"], avatar: "https://github.com/shadcn-ui.png" },
  { rank: 10, org: "trpc", repo: "trpc", desc: "End-to-end typesafe APIs made easy.", lang: "TypeScript", langColor: "#3178c6", stars: "35.6k", forks: "1.3k", today: "+298", topics: ["api","typescript","rpc"], avatar: "https://github.com/trpc.png" },
  { rank: 11, org: "astro", repo: "astro", desc: "The web framework for content-driven websites.", lang: "TypeScript", langColor: "#3178c6", stars: "47.9k", forks: "2.6k", today: "+283", topics: ["framework","ssg","islands"], avatar: "https://github.com/withastro.png" },
  { rank: 12, org: "remix-run", repo: "remix", desc: "Build Better Websites. Create modern, resilient user experiences with web standards.", lang: "TypeScript", langColor: "#3178c6", stars: "30.4k", forks: "2.6k", today: "+267", topics: ["framework","react","ssr"], avatar: "https://github.com/remix-run.png" },
];

const COMMUNITY_POSTS = [
  { id: 1, user: "terkix_dev", avatar: "https://github.com/sindresorhus.png", time: "2 giờ trước", title: "Tôi vừa build xong real-time dashboard với TerKix AI + Supabase chỉ trong 20 phút!", desc: "Dùng TerKix để generate toàn bộ React components, setup Supabase realtime subscriptions, deploy lên Vercel. AI hoàn toàn hiểu context của project.", lang: "TypeScript", stars: 48, comments: 12, forks: 7, tags: ["TerKix","Supabase","React"], snippet: `const { data } = useRealtimeSubscription(\n  'messages',\n  (payload) => setMessages(prev => [...prev, payload.new])\n);` },
  { id: 2, user: "nguyen_code", avatar: "https://github.com/gaearon.png", time: "5 giờ trước", title: "Hướng dẫn: Build CLI tool bằng Node.js với AI agent tự gen code", desc: "Chia sẻ workflow của tôi khi dùng TerKix để scaffold một CLI tool hoàn chỉnh với argument parsing, config file, và colored output.", lang: "JavaScript", stars: 31, comments: 8, forks: 4, tags: ["CLI","Node.js","AI"], snippet: `#!/usr/bin/env node\nconst { program } = require('commander');\nprogram.version('1.0.0').parse();` },
  { id: 3, user: "ai_builder_vn", avatar: "https://github.com/rauchg.png", time: "8 giờ trước", title: "Tối ưu bundle size Next.js từ 2.4MB xuống 340KB với AI code review", desc: "AI phát hiện 15 dependencies không cần thiết, suggest tree-shaking, dynamic imports và giúp tôi viết lại 3 components cồng kềnh.", lang: "TypeScript", stars: 87, comments: 23, forks: 14, tags: ["Next.js","Optimization","Bundle"], snippet: `const HeavyChart = dynamic(\n  () => import('./Chart'),\n  { loading: () => <Skeleton /> }\n);` },
  { id: 4, user: "rustacean_dev", avatar: "https://github.com/dtolnay.png", time: "1 ngày trước", title: "Viết REST API bằng Rust Axum — AI gen toàn bộ boilerplate trong 3 phút", desc: "TerKix tự scaffold Axum server với middleware auth, error handling, database layer với SQLx và unit tests đầy đủ.", lang: "Rust", stars: 62, comments: 19, forks: 11, tags: ["Rust","Axum","API"], snippet: `async fn create_user(\n  State(db): State<PgPool>,\n  Json(payload): Json<CreateUser>\n) -> impl IntoResponse { ... }` },
];

const LEADERBOARD = [
  { rank: 1, name: "shadcn", avatar: "https://github.com/shadcn.png", stars: "12.4k", badge: "🏆" },
  { rank: 2, name: "antfu", avatar: "https://github.com/antfu.png", stars: "9.8k", badge: "🥈" },
  { rank: 3, name: "sindresorhus", avatar: "https://github.com/sindresorhus.png", stars: "8.3k", badge: "🥉" },
  { rank: 4, name: "tj", avatar: "https://github.com/tj.png", stars: "6.1k", badge: "" },
  { rank: 5, name: "yyx990803", avatar: "https://github.com/yyx990803.png", stars: "5.7k", badge: "" },
];

const TOPICS = ["react","typescript","nextjs","tailwind","nodejs","api","fullstack","open-source","ai","tools","css","rust","python","go","vue","svelte"];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<"trending" | "feed" | "explore">("trending");
  const [langFilter, setLangFilter] = useState("all");
  const [searchQ, setSearchQ] = useState("");
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const filteredRepos = TRENDING_REPOS.filter(r => {
    const matchSearch = !searchQ || r.repo.toLowerCase().includes(searchQ.toLowerCase()) || r.desc.toLowerCase().includes(searchQ.toLowerCase());
    const matchLang = langFilter === "all" || r.lang === langFilter;
    return matchSearch && matchLang;
  });

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#02050c]">

      {/* ── Page header ── */}
      <div className="border-b border-[#102142] bg-[#030810] px-4 py-3 shrink-0">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              <Users size={15} className="text-[#58A6FF]" />
              Cộng đồng TerKix
            </h1>
            <p className="text-[10px] text-[#5a7aaa] mt-0.5">Khám phá · Chia sẻ · Cộng tác cùng developers</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#3a6aaa]" />
              <input
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="Tìm repo, dự án…"
                className="bg-[#060d20] border border-[#102142] text-[11px] font-mono text-white placeholder-[#1e3355] pl-7 pr-3 py-1.5 focus:outline-none focus:border-[#0052cc]/60 w-40 md:w-52"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mt-3 border-b border-[#102142]">
          {([["trending","Trending", TrendingUp],["feed","Feed", MessageSquare],["explore","Khám phá", Globe]] as const).map(([t, label, Icon]) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`flex items-center gap-1.5 px-4 py-2 text-[11px] font-mono font-bold transition border-b-2 cursor-pointer ${
                activeTab === t
                  ? "text-white border-b-[#0052cc] bg-[#060d20]"
                  : "text-[#3a6aaa] border-b-transparent hover:text-[#c9d1d9]"
              }`}
            >
              <Icon size={11} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col lg:flex-row gap-0 min-h-full">

          {/* Main content */}
          <div className="flex-1 min-w-0 p-4 space-y-3">

            {/* TRENDING TAB */}
            {activeTab === "trending" && (
              <>
                {/* Language filter pills */}
                <div className="flex gap-1.5 flex-wrap mb-1">
                  <button
                    onClick={() => setLangFilter("all")}
                    className={`px-3 py-1 text-[9px] font-mono font-bold uppercase border transition cursor-pointer ${langFilter === "all" ? "bg-[#0052cc] border-[#0052cc] text-white" : "bg-[#060d20] border-[#102142] text-[#3a6aaa] hover:text-white"}`}
                  >
                    Tất cả
                  </button>
                  {LANGS.map(l => (
                    <button
                      key={l.name}
                      onClick={() => setLangFilter(langFilter === l.name ? "all" : l.name)}
                      className={`px-3 py-1 text-[9px] font-mono font-bold border transition cursor-pointer ${langFilter === l.name ? "border-current text-white" : "bg-[#060d20] border-[#102142] text-[#3a6aaa] hover:text-white"}`}
                      style={langFilter === l.name ? { backgroundColor: l.color + "22", color: l.color, borderColor: l.color + "66" } : {}}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>

                {/* Repo list */}
                <div className="space-y-2">
                  {filteredRepos.map(r => (
                    <div key={r.rank} className="bg-[#060d20] border border-[#102142] hover:border-[#1a3660] transition group p-4">
                      <div className="flex items-start gap-3">
                        {/* Rank */}
                        <span className="text-[10px] font-mono text-[#1e3355] font-bold w-5 shrink-0 pt-0.5">#{r.rank}</span>

                        {/* Avatar */}
                        <img
                          src={r.avatar}
                          alt={r.org}
                          className="w-8 h-8 shrink-0 object-cover"
                          onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${r.org}&background=102142&color=58A6FF&size=32`; }}
                        />

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 flex-wrap">
                            <div>
                              <a href="#" className="text-[#58A6FF] font-mono text-[12px] font-bold hover:underline flex items-center gap-1">
                                {r.org}/<span className="text-white">{r.repo}</span>
                                <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition" />
                              </a>
                              <p className="text-[11px] text-[#8b949e] mt-0.5 leading-relaxed">{r.desc}</p>
                            </div>
                          </div>

                          {/* Topics */}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {r.topics.map(t => (
                              <span key={t} className="text-[8px] px-2 py-0.5 font-mono border border-[#0052cc]/20 text-[#5b9bd5] bg-[#0052cc]/5">
                                {t}
                              </span>
                            ))}
                          </div>

                          {/* Stats row */}
                          <div className="flex items-center gap-4 mt-2 text-[10px] font-mono text-[#5a7aaa]">
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 inline-block" style={{ backgroundColor: r.langColor }} />
                              {r.lang}
                            </span>
                            <span className="flex items-center gap-1"><Star size={9} className="text-yellow-400" /> {r.stars}</span>
                            <span className="flex items-center gap-1"><GitFork size={9} /> {r.forks}</span>
                            <span className="flex items-center gap-1 text-[#3FB950]">
                              <TrendingUp size={9} /> +{r.today} hôm nay
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* FEED TAB */}
            {activeTab === "feed" && (
              <div className="space-y-3">
                {COMMUNITY_POSTS.map(post => (
                  <div key={post.id} className="bg-[#060d20] border border-[#102142] hover:border-[#1a3660] transition p-4">
                    {/* Post header */}
                    <div className="flex items-center gap-3 mb-3">
                      <img src={post.avatar} alt={post.user} className="w-7 h-7 object-cover border border-[#102142]"
                        onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${post.user}&background=102142&color=58A6FF&size=28`; }} />
                      <div>
                        <span className="text-[11px] font-bold text-[#58A6FF] font-mono">@{post.user}</span>
                        <div className="flex items-center gap-1.5 text-[9px] text-[#3a6aaa] font-mono">
                          <Clock size={8} />
                          {post.time}
                        </div>
                      </div>
                      <div className="ml-auto flex items-center gap-1">
                        {post.tags.map(tag => (
                          <span key={tag} className="text-[8px] px-1.5 py-0.5 font-mono border border-[#0052cc]/20 text-[#5b9bd5] bg-[#0052cc]/5">{tag}</span>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-[12px] font-bold text-white mb-1.5 leading-snug">{post.title}</h3>
                    <p className="text-[11px] text-[#8b949e] leading-relaxed mb-3">{post.desc}</p>

                    {/* Code snippet */}
                    <div className="bg-[#010309] border border-[#0e1e3a] border-l-2 border-l-[#0052cc] p-3 mb-3 overflow-x-auto">
                      <pre className="text-[10px] font-mono text-[#c9d1d9] whitespace-pre leading-relaxed">{post.snippet}</pre>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setLikedPosts(prev => { const s = new Set(prev); s.has(post.id) ? s.delete(post.id) : s.add(post.id); return s; })}
                        className={`flex items-center gap-1.5 text-[10px] font-mono font-bold transition cursor-pointer px-2 py-1 border ${likedPosts.has(post.id) ? "text-red-400 border-red-500/30 bg-red-500/5" : "text-[#3a6aaa] border-[#102142] hover:text-red-400"}`}
                      >
                        <Heart size={10} fill={likedPosts.has(post.id) ? "currentColor" : "none"} />
                        {post.stars + (likedPosts.has(post.id) ? 1 : 0)}
                      </button>
                      <button className="flex items-center gap-1.5 text-[10px] font-mono text-[#3a6aaa] hover:text-white transition cursor-pointer border border-[#102142] px-2 py-1">
                        <MessageSquare size={10} /> {post.comments}
                      </button>
                      <button className="flex items-center gap-1.5 text-[10px] font-mono text-[#3a6aaa] hover:text-white transition cursor-pointer border border-[#102142] px-2 py-1">
                        <GitFork size={10} /> {post.forks}
                      </button>
                      <button className="ml-auto flex items-center gap-1.5 text-[10px] font-mono text-[#3a6aaa] hover:text-white transition cursor-pointer border border-[#102142] px-2 py-1">
                        <Share2 size={10} /> Chia sẻ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* EXPLORE TAB */}
            {activeTab === "explore" && (
              <div className="space-y-4">
                <div className="bg-[#060d20] border border-[#102142] p-4">
                  <h3 className="text-[11px] font-bold text-white flex items-center gap-2 mb-3"><Zap size={12} className="text-yellow-400" /> Topics hot nhất</h3>
                  <div className="flex flex-wrap gap-2">
                    {TOPICS.map(t => (
                      <button key={t} className="px-3 py-1.5 text-[10px] font-mono border border-[#102142] text-[#5b9bd5] bg-[#0052cc]/5 hover:bg-[#0052cc]/15 hover:text-white transition cursor-pointer">
                        #{t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-[#060d20] border border-[#102142] p-4">
                  <h3 className="text-[11px] font-bold text-white flex items-center gap-2 mb-3"><Code2 size={12} className="text-[#58A6FF]" /> Ngôn ngữ phổ biến</h3>
                  <div className="space-y-2">
                    {LANGS.map((l, i) => (
                      <div key={l.name} className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-[#3a6aaa] w-4">{i + 1}</span>
                        <span className="w-2 h-2 shrink-0" style={{ backgroundColor: l.color }} />
                        <span className="text-[11px] font-mono text-[#c9d1d9] flex-1">{l.name}</span>
                        <div className="h-1.5 flex-1 max-w-24 bg-[#102142]">
                          <div className="h-full transition-all" style={{ width: `${90 - i * 12}%`, backgroundColor: l.color + "aa" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Right sidebar ── */}
          <div className="w-full lg:w-64 shrink-0 border-t lg:border-t-0 lg:border-l border-[#102142] p-4 space-y-4">

            {/* Leaderboard */}
            <div className="bg-[#060d20] border border-[#102142]">
              <div className="px-3 py-2 border-b border-[#102142] flex items-center gap-2">
                <Award size={11} className="text-yellow-400" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider font-mono">Top Contributors</span>
              </div>
              <div className="divide-y divide-[#102142]">
                {LEADERBOARD.map(u => (
                  <div key={u.rank} className="flex items-center gap-2 px-3 py-2 hover:bg-[#071428] transition cursor-pointer">
                    <span className="text-[9px] font-mono text-[#3a6aaa] w-4 shrink-0">{u.badge || `#${u.rank}`}</span>
                    <img src={u.avatar} alt={u.name} className="w-6 h-6 object-cover border border-[#102142]"
                      onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${u.name}&background=102142&color=58A6FF&size=24`; }} />
                    <span className="text-[10px] font-mono text-[#c9d1d9] flex-1 truncate">@{u.name}</span>
                    <span className="text-[9px] font-mono text-yellow-400 flex items-center gap-0.5 shrink-0">
                      <Star size={8} fill="currentColor" /> {u.stars}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity */}
            <div className="bg-[#060d20] border border-[#102142]">
              <div className="px-3 py-2 border-b border-[#102142] flex items-center gap-2">
                <Activity size={11} className="text-[#3FB950]" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider font-mono">Hoạt động mới</span>
              </div>
              <div className="p-3 space-y-2 text-[10px] font-mono text-[#5a7aaa]">
                {[
                  "★ shadcn starred tailwind/tailwindcss",
                  "⑂ antfu forked vitejs/vite",
                  "✓ sindresorhus merged PR #842",
                  "💬 gaearon commented on react#29234",
                  "⭐ yyx990803 starred vuejs/core",
                  "⑂ rauchg forked vercel/next.js",
                ].map((a, i) => (
                  <div key={i} className="truncate hover:text-[#c9d1d9] transition cursor-pointer">{a}</div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-[#060d20] border border-[#102142] p-3 space-y-1.5">
              {[
                { label: "Repos trending", value: "1,248", icon: TrendingUp, color: "#3FB950" },
                { label: "Developers active", value: "48.3k", icon: Users, color: "#58A6FF" },
                { label: "Commits hôm nay", value: "142k", icon: GitBranch, color: "#BC8CFF" },
              ].map(s => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-[9px] text-[#3a6aaa] font-mono flex items-center gap-1.5">
                      <Icon size={9} style={{ color: s.color }} /> {s.label}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-white">{s.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
