"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/+$/, "");

function getSessionId(): string {
  let sid = localStorage.getItem("visitor_session_id");
  if (!sid) {
    sid = crypto.randomUUID();
    localStorage.setItem("visitor_session_id", sid);
  }
  return sid;
}

function getBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari")) return "Safari";
  if (ua.includes("Edge")) return "Edge";
  return "Other";
}

function getDevice(): string {
  const ua = navigator.userAgent;
  if (/Mobi|Android|iPhone|iPad/i.test(ua)) return "Mobile";
  return "Desktop";
}

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const data = {
      session_id: getSessionId(),
      referrer: document.referrer || null,
      device: getDevice(),
      browser: getBrowser(),
      page: pathname,
    };
    fetch(`${API_URL}/api/analytics/visit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => {});
  }, [pathname]);

  return null;
}
