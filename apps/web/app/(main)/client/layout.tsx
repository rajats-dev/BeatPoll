import type React from "react";
import { Music, Home, Library, Settings, Users } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-800">
      {/* Sidebar */}
      <div className="w-16 md:w-64 bg-emerald-950/70 border-r border-emerald-800 flex flex-col">
        <div className="p-4 border-b border-emerald-800 flex items-center">
          <Music className="h-6 w-6 text-emerald-400 mr-2" />
          <span className="text-xl font-bold text-white hidden md:block">
            BeatPoll
          </span>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center p-2 rounded-md hover:bg-emerald-800/50 text-emerald-100"
              >
                <Home className="h-5 w-5 mr-3" />
                <span className="hidden md:block">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center p-2 rounded-md hover:bg-emerald-800/50 text-emerald-100"
              >
                <Library className="h-5 w-5 mr-3" />
                <span className="hidden md:block">My Library</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center p-2 rounded-md hover:bg-emerald-800/50 text-emerald-100"
              >
                <Users className="h-5 w-5 mr-3" />
                <span className="hidden md:block">Audience</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center p-2 rounded-md hover:bg-emerald-800/50 text-emerald-100"
              >
                <Settings className="h-5 w-5 mr-3" />
                <span className="hidden md:block">Settings</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-emerald-800">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-white font-medium">
              DJ
            </div>
            <div className="ml-3 hidden md:block">
              <p className="text-sm font-medium text-white">DJ Emerald</p>
              <p className="text-xs text-emerald-400">Pro Account</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
