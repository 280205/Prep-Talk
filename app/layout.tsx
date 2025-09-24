import type React from "react"
import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import { Inter } from "next/font/google"
import "./globals.css"
import MainLayout from "@/components/MainLayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PrepTalk - AI Mock Interview Practice",
  description: "Practice mock interviews with AI feedback for Indian job seekers",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://accounts.google.com/gsi/client" async defer></script>
      </head>
      <body className={inter.className}>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
