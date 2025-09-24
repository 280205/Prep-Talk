"use client";

import React from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthModalProvider } from "@/contexts/AuthModalContext";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { LoginModal } from "@/components/auth/LoginModal";
import { SignupModal } from "@/components/auth/SignupModal";
import { Toaster } from "sonner";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <AuthModalProvider>
          {children}
          <LoginModal />
          <SignupModal />
          <Toaster 
            position="top-right" 
            richColors 
            closeButton 
            theme="system"
          />
        </AuthModalProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}
