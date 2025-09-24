"use client";

import { useSidebar } from "@/contexts/SidebarContext";
import { Menu, X } from "lucide-react";

export function FloatingSidebarToggle() {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className={`fixed bottom-6 left-6 z-50 p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
        isSidebarOpen ? 'translate-x-64' : 'translate-x-0'
      }`}
      title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
    >
      {isSidebarOpen ? (
        <X className="w-5 h-5" />
      ) : (
        <Menu className="w-5 h-5" />
      )}
    </button>
  );
}