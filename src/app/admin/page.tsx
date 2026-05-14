"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, MessageSquare, Mail, FileText, LogOut } from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import { ProjectViewsChart } from "@/components/admin/Charts";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface DashboardData {
  total_visitors: number;
  unique_sessions: number;
  resume_requests: number;
  total_chats: number;
  total_messages: number;
  contact_messages: number;
  visitors_today: number;
  top_projects: { name: string; views: number }[];
}

interface Visitor {
  ip: string;
  referrer: string | null;
  device: string | null;
  browser: string | null;
  session_id: string | null;
  page: string | null;
  visited_at: string;
}

interface ContactMsg {
  id: number;
  name: string;
  email: string;
  message: string;
  company: string | null;
  role: string | null;
  created_at: string;
}

interface ResumeReq {
  id: number;
  email: string;
  company: string | null;
  sent: boolean;
  created_at: string;
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [messages, setMessages] = useState<ContactMsg[]>([]);
  const [resumeReqs, setResumeReqs] = useState<ResumeReq[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", {
      day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  }

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch(`${API_URL}/api/analytics/dashboard`, { headers }).then((r) => {
        if (r.status === 401) throw new Error("unauthorized");
        return r.json();
      }),
      fetch(`${API_URL}/api/analytics/visitors`, { headers }).then((r) => {
        if (r.status === 401) throw new Error("unauthorized");
        return r.json();
      }),
      fetch(`${API_URL}/api/analytics/messages`, { headers }).then((r) => {
        if (r.status === 401) throw new Error("unauthorized");
        return r.json();
      }),
      fetch(`${API_URL}/api/analytics/resume-requests`, { headers }).then((r) => {
        if (r.status === 401) throw new Error("unauthorized");
        return r.json();
      }),
    ])
      .then(([dashboardData, visitorsData, messagesData, resumeData]) => {
        setData(dashboardData);
        setVisitors(visitorsData);
        setMessages(messagesData);
        setResumeReqs(resumeData);
      })
      .catch(() => {
        localStorage.removeItem("admin_token");
        router.replace("/admin/login");
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.replace("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-sm text-foreground/40">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <h1 className="text-sm font-medium text-foreground">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-foreground/40 hover:text-foreground transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Visitors"
            value={data?.total_visitors ?? 0}
            icon={<Users className="w-4 h-4" />}
            trend={`${data?.visitors_today ?? 0} today`}
          />
          <StatCard
            label="Unique Sessions"
            value={data?.unique_sessions ?? 0}
            icon={<Users className="w-4 h-4" />}
          />
          <StatCard
            label="Chat Sessions"
            value={data?.total_chats ?? 0}
            icon={<MessageSquare className="w-4 h-4" />}
            trend={`${data?.total_messages ?? 0} messages`}
          />
          <StatCard
            label="Contact Messages"
            value={data?.contact_messages ?? 0}
            icon={<Mail className="w-4 h-4" />}
          />
          <StatCard
            label="Resume Requests"
            value={data?.resume_requests ?? 0}
            icon={<FileText className="w-4 h-4" />}
          />
        </div>

        {data?.top_projects && data.top_projects.length > 0 && (
          <ProjectViewsChart topProjects={data.top_projects} />
        )}

        <section className="mt-10">
          <h2 className="text-sm font-medium text-foreground mb-4">Contact Messages</h2>
          {messages.length === 0 ? (
            <p className="text-xs text-foreground/40">No messages yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="text-foreground/40 border-b border-border">
                    <th className="pb-2 pr-4 font-medium">Name</th>
                    <th className="pb-2 pr-4 font-medium">Email</th>
                    <th className="pb-2 pr-4 font-medium">Company</th>
                    <th className="pb-2 pr-4 font-medium">Message</th>
                    <th className="pb-2 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((m) => (
                    <tr key={m.id} className="border-b border-border/50 text-foreground/70">
                      <td className="py-2 pr-4 font-medium text-foreground">{m.name}</td>
                      <td className="py-2 pr-4"><a href={`mailto:${m.email}`} className="text-accent hover:underline">{m.email}</a></td>
                      <td className="py-2 pr-4">{m.company || "—"}</td>
                      <td className="py-2 pr-4 max-w-[300px] truncate" title={m.message}>{m.message}</td>
                      <td className="py-2 whitespace-nowrap">{m.created_at ? formatDate(m.created_at) : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-medium text-foreground mb-4">Resume Requests</h2>
          {resumeReqs.length === 0 ? (
            <p className="text-xs text-foreground/40">No requests yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="text-foreground/40 border-b border-border">
                    <th className="pb-2 pr-4 font-medium">Email</th>
                    <th className="pb-2 pr-4 font-medium">Company</th>
                    <th className="pb-2 pr-4 font-medium">Delivered</th>
                    <th className="pb-2 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {resumeReqs.map((r) => (
                    <tr key={r.id} className="border-b border-border/50 text-foreground/70">
                      <td className="py-2 pr-4"><a href={`mailto:${r.email}`} className="text-accent hover:underline">{r.email}</a></td>
                      <td className="py-2 pr-4">{r.company || "—"}</td>
                      <td className="py-2 pr-4">{r.sent ? <span className="text-green-500">Yes</span> : <span className="text-red-400">No</span>}</td>
                      <td className="py-2 whitespace-nowrap">{r.created_at ? formatDate(r.created_at) : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-medium text-foreground mb-4">Recent Visitors</h2>
          {visitors.length === 0 ? (
            <p className="text-xs text-foreground/40">No visitors yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="text-foreground/40 border-b border-border">
                    <th className="pb-2 pr-4 font-medium">IP</th>
                    <th className="pb-2 pr-4 font-medium">Referrer</th>
                    <th className="pb-2 pr-4 font-medium">Page</th>
                    <th className="pb-2 pr-4 font-medium">Browser</th>
                    <th className="pb-2 pr-4 font-medium">Device</th>
                    <th className="pb-2 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors.map((v, i) => (
                    <tr key={v.session_id || i} className="border-b border-border/50 text-foreground/70">
                      <td className="py-2 pr-4 font-mono text-accent">{v.ip || "—"}</td>
                      <td className="py-2 pr-4 max-w-[200px] truncate">
                        {v.referrer ? (
                          <a href={v.referrer} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">{v.referrer}</a>
                        ) : "Direct"}
                      </td>
                      <td className="py-2 pr-4 font-mono text-foreground/50">{v.page || "/"}</td>
                      <td className="py-2 pr-4">{v.browser || "—"}</td>
                      <td className="py-2 pr-4">{v.device || "—"}</td>
                      <td className="py-2 whitespace-nowrap">{v.visited_at ? formatDate(v.visited_at) : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
