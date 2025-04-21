'use client'

import ProtectedRoute from "@/src/processes/ProtectedRoute"
import { SidebarProvider, SidebarTrigger } from "@/src/shared/ui/sidebar"
import { AppSidebar } from "@/src/widgets/dashboard/AppSidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      
    <SidebarProvider>
      <AppSidebar />
      <main style={{width: '100%'}}>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
    </ProtectedRoute>

  )
}
