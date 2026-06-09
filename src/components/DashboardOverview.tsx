import React, { useState, useEffect } from "react";
import {
  Terminal, Cpu, HardDrive, GitBranch, Globe,
  Activity, Zap, Layers, Play, ArrowUpRight,
  CheckCircle2, Clock, TrendingUp, Code2, Rocket
} from "lucide-react";
import { Project, Agent } from "../types";

interface DashboardOverviewProps {
  project: Project;
  agents: Agent[];
  setCurrentSection: (sec: string) => void;
  onRunPresetCommand: (cmd: string) => void;
  totalCommandsRun: number;
}

const presets = [
  { label: "Scaffold Landing Page", cmd: "build a modern feature gallery with beautiful responsive bento grids", icon: Code2, color: "#58A6FF" },
  { label: "Refactor Theme Style", cmd: "edit index.html to add a glowing neon violet header and improve branding typography", icon: Zap, color: "#BC8CFF" },
  { label: "Deploy to Production", cmd: "deploy production to Vercel and check route health", icon: Rocket, color: "#3FB950" },
  { label: "Run Debug Agent", cmd: "fix all typescript lint warnings inside App.tsx and simplify states", icon: Activity, color: "#D29922" },
];

export default function DashboardOverview({ project, agents, setCurrentSection, onRunPresetCommand, totalCommandsRun }: DashboardOverviewProps) {
  const [systime, setSystime] = useState(() => new Date().toLocaleTimeString());
  const [cpuUsage, setCpuUsage] = useState(12);
  const [memUsed, setMemUsed] = useState(3.15);
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const t1 = setInterval(() => setSystime(new Date().toLocaleTimeString()), 1000);
    const t2 = setInterval(() => setUptime(s => s + 1), 1000);
    const t3 = setInterval(() => {
      setCpuUsage(p => Math.min(Math.max(p + Math.floor(Math.random() * 11) - 5, 4), 72));
      setMemUsed(p => Number(Math.min(Math.max(p + (Math.random() * 0.08) - 0.04, 2.6), 4.4).toFixed(2)));
    }, 3000);
    return () => { clearInterval(t1); clearInterval(t2); clearInterval(t3); };
  }, []);

  const totalLoc = project.files.reduce((acc, f) => acc + f.content.split("\n").length, 0);
  const fmtUptime = `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${uptime % 60}s`;
  const liveCount = project.deployments.filter(d => d.status === "live").length;

  const metrics = [
    { label: "Files", value: project.files.length, sub: `${totalLoc} LOC`, icon: HardDrive, accent: "#58A6FF" },
    { label: "Commits", value: project.commitHistory.length, sub: project.activeBranch, icon: GitBranch, accent: "#D29922" },
    { label: "Live", value: liveCount, sub: "Services", icon: Globe, accent: "#3FB950" },
    { label: "Commands", value: totalCommandsRun, sub: "Executed", icon: Terminal, accent: "#BC8CFF" },
  ];

  return (
    <div className="px-3 py-4 md:px-6 md:py-6 space-y-4 md:space-y-6 w-full">

      {/* ── Hero Banner ── */}
      <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-gradient-to-br from-[#161B22] via-[#0D1117] to-[#0a0f17]">
        {/* Background glow blobs */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#58A6FF]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-[#3FB950]/6 rounded-full blur-2xl pointer-events-none" />

        <div className="relative p-4 md:p-6">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#3FB950] tracking-widest uppercase bg-[#3FB950]/10 border border-[#3FB950]/20 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3FB950] animate-pulse" />
                  TERKIX CORE ACTIVE
                </span>
              </div>
              <h1 className="text-xl md:text-3xl font-black text-white tracking-tight">
                {project.name}
              </h1>
              <p className="text-[11px] md:text-sm text-[#8B949E] font-medium">{project.description}</p>
            </div>
            <button
              onClick={() => setCurrentSection("terminal")}
              className="flex items-center gap-2 px-4 py-2 bg-[#58A6FF] hover:bg-[#79b8ff] text-[#0D1117] font-bold text-[12px] rounded-xl transition-all duration-200 shadow-lg shadow-[#58A6FF]/20 shrink-0 cursor-pointer"
            >
              <Terminal size={13} /> Open Terminal
            </button>
          </div>

          {/* Live metrics bar */}
          <div className="mt-4 grid grid-cols-3 gap-2 md:gap-3">
            {[
              { label: "CPU", value: `${cpuUsage}%`, color: cpuUsage > 50 ? "#D29922" : "#3FB950", bar: cpuUsage },
              { label: "RAM", value: `${memUsed} GB`, color: "#58A6FF", bar: (memUsed / 8) * 100 },
              { label: "UPTIME", value: fmtUptime, color: "#BC8CFF", bar: null },
            ].map(m => (
              <div key={m.label} className="bg-black/30 rounded-xl px-3 py-2 border border-white/5">
                <div className="text-[9px] font-mono text-[#8B949E] uppercase tracking-wider mb-1">{m.label}</div>
                <div className="font-mono font-bold text-sm md:text-base truncate" style={{ color: m.color }}>{m.value}</div>
                {m.bar !== null && (
                  <div className="mt-1.5 h-0.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${m.bar}%`, backgroundColor: m.color }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Status row */}
          <div className="mt-3 flex items-center gap-3 text-[10px] font-mono text-[#8B949E]">
            <span className="flex items-center gap-1"><Clock size={9} /> {systime}</span>
            <span className="text-[#30363D]">·</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={9} className="text-[#3FB950]" /> Branch: <span className="text-[#D29922] font-semibold ml-1">{project.activeBranch}</span></span>
            <span className="text-[#30363D]">·</span>
            <span className="text-[#58A6FF]">{project.status === "active" ? "LIVE" : project.status}</span>
          </div>
        </div>
      </div>

      {/* ── Metric Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {metrics.map(m => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="group relative rounded-2xl border border-white/5 bg-[#050915] hover:bg-[#1a2030] transition-all duration-200 p-4 overflow-hidden cursor-default">
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${m.accent}40, transparent)` }} />
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold text-[#8B949E] uppercase tracking-wider">{m.label}</span>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${m.accent}15` }}>
                  <Icon size={13} style={{ color: m.accent }} />
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-black text-white tabular-nums">{m.value}</div>
              <div className="text-[10px] text-[#8B949E] mt-1 font-mono truncate" style={{ color: m.accent }}>{m.sub}</div>
            </div>
          );
        })}
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* ── Left: Presets + Metadata ── */}
        <div className="lg:col-span-2 space-y-4">

          {/* Preset Commands */}
          <div className="rounded-2xl border border-white/5 bg-[#050915] overflow-hidden">
            <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-[#58A6FF]" />
                <span className="font-bold text-white text-sm">Quick Actions</span>
              </div>
              <span className="text-[9px] font-mono text-[#8B949E] bg-[#02050c] px-2 py-0.5 rounded-full border border-white/5">{presets.length} presets</span>
            </div>
            <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {presets.map((p, i) => {
                const Icon = p.icon;
                return (
                  <button
                    key={i}
                    onClick={() => { setCurrentSection("terminal"); onRunPresetCommand(p.cmd); }}
                    className="group flex items-center gap-3 p-3 rounded-xl bg-[#02050c] hover:bg-[#0d1520] border border-white/5 hover:border-white/10 text-left transition-all duration-150 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: `${p.color}15` }}>
                      <Icon size={14} style={{ color: p.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-semibold text-white group-hover:text-[#58A6FF] transition truncate">{p.label}</div>
                      <div className="text-[10px] text-[#8B949E] font-mono truncate mt-0.5">$ {p.cmd.slice(0, 28)}…</div>
                    </div>
                    <ArrowUpRight size={13} className="text-[#30363D] group-hover:text-[#58A6FF] shrink-0 transition" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project Metadata */}
          <div className="rounded-2xl border border-white/5 bg-[#050915] overflow-hidden">
            <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers size={14} className="text-[#D29922]" />
                <span className="font-bold text-white text-sm">Project Metadata</span>
              </div>
              <button
                onClick={() => setCurrentSection("files")}
                className="text-[10px] font-semibold text-[#58A6FF] hover:text-white transition flex items-center gap-1 cursor-pointer"
              >
                Browse Files <ArrowUpRight size={10} />
              </button>
            </div>
            <div className="divide-y divide-white/5">
              {[
                { label: "Name", value: project.name, color: "text-white" },
                { label: "Branch", value: project.activeBranch, color: "text-[#D29922]" },
                { label: "Status", value: project.status, color: project.status === "active" ? "text-[#3FB950]" : "text-[#8B949E]" },
                { label: "Deployments", value: `${project.deployments.length} targets`, color: "text-[#BC8CFF]" },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between px-4 py-2.5 hover:bg-white/2 transition">
                  <span className="text-[11px] text-[#8B949E] font-mono">{row.label}</span>
                  <span className={`text-[11px] font-semibold font-mono ${row.color}`}>{row.value}</span>
                </div>
              ))}
              {/* Files */}
              <div className="px-4 py-3">
                <div className="text-[10px] text-[#8B949E] font-mono mb-2">Files ({project.files.length})</div>
                <div className="flex flex-wrap gap-1.5">
                  {project.files.map((f, i) => (
                    <span key={i} className="text-[9px] px-2 py-0.5 rounded-full font-mono bg-[#02050c] border border-white/5 text-[#58A6FF]">
                      {f.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Agent Health ── */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/5 bg-[#050915] overflow-hidden">
            <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-[#3FB950]" />
                <span className="font-bold text-white text-sm">Agent Health</span>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border font-semibold" style={{ color: "#3FB950", borderColor: "#3FB950" + "30", background: "#3FB950" + "10" }}>
                {agents.filter(a => a.status === "running").length}/{agents.length} ACTIVE
              </span>
            </div>
            <div className="p-3 space-y-2">
              {agents.map(agent => {
                const isRun = agent.status === "running";
                return (
                  <div key={agent.id} className={`rounded-xl border p-3 transition-all ${isRun ? "bg-[#0d1520] border-[#58A6FF]/20" : "bg-[#02050c] border-white/5 hover:border-white/10"}`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={`w-2 h-2 rounded-full shrink-0 ${agent.color} ${isRun ? "animate-pulse" : "opacity-40"}`} />
                        <span className="text-[11px] font-bold text-white truncate">{agent.name}</span>
                      </div>
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full shrink-0 ${isRun ? "text-[#D29922] bg-[#D29922]/10 border border-[#D29922]/20" : "text-[#8B949E] bg-white/5 border border-white/5"}`}>
                        {isRun ? "ACTIVE" : "IDLE"}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#8B949E] truncate">{agent.lastAction || "Standby"}</p>
                    {isRun && (
                      <div className="mt-2 h-0.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-[#58A6FF] rounded-full animate-pulse" style={{ width: "65%" }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="px-4 py-3 border-t border-white/5">
              <button
                onClick={() => setCurrentSection("agents")}
                className="w-full flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#58A6FF] hover:text-white transition cursor-pointer"
              >
                Configure Agents <ArrowUpRight size={11} />
              </button>
            </div>
          </div>

          {/* Trend indicator */}
          <div className="rounded-2xl border border-white/5 bg-[#050915] p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={13} className="text-[#3FB950]" />
              <span className="text-[11px] font-bold text-white">Session Stats</span>
            </div>
            <div className="space-y-2">
              {[
                { label: "Commands run", value: totalCommandsRun, max: 100, color: "#58A6FF" },
                { label: "Files in project", value: project.files.length, max: 20, color: "#3FB950" },
                { label: "Commits tracked", value: project.commitHistory.length, max: 50, color: "#BC8CFF" },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] text-[#8B949E]">{s.label}</span>
                    <span className="text-[10px] font-mono font-bold" style={{ color: s.color }}>{s.value}</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.min((s.value / s.max) * 100, 100)}%`, backgroundColor: s.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
