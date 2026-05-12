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

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    fetch(`${API_URL}/api/analytics/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("admin_token");
          router.replace("/admin/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setData(data);
      })
      .catch(() => setError("Failed to load analytics"))
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
      </main>
    </div>
  );
}
