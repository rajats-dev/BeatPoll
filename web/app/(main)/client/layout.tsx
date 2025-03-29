import type React from "react";
import Header from "@/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-800">
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <Header />
        {children}
      </div>
    </div>
  );
}
