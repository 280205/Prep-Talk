"use client";
import { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/contexts/SidebarContext";
import ClientHeader from "@/components/ClientHeader";
import AppSidebar from "@/components/AppSidebar";

function LayoutContent({ children }: PropsWithChildren) {
  const { isSidebarOpen } = useSidebar();
  
  return (
    <div className="flex min-h-screen w-full">
      <ClientHeader />
      <div className="flex-1 flex flex-col min-h-screen">
        <div 
          className={`h-full fixed top-16 left-0 z-30 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'
          }`}
        >
          <AppSidebar />
        </div>
        <div 
          className={`flex-1 flex flex-col min-h-0 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          <main className="flex-1 overflow-y-auto p-4 md:p-6 mt-8">
            <div className="container mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function LayoutWithSidebar({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");

  // Center auth/main pages if sidebar is hidden
  if (isAuthPage) {
    return (
      <div className="min-h-screen flex flex-col">
        <ClientHeader />
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-slate-900">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    );
  }

  return <LayoutContent>{children}</LayoutContent>;
}