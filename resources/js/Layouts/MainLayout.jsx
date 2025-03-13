import { SidebarProvider, SidebarTrigger, SidebarInset, } from "@/Components/ui/sidebar"
import { Toaster } from "@/Components/ui/sonner"
import { AppSidebar } from "@/Components/AppSideBar"

export default function MainLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-4 bg-slate-50">
        <SidebarTrigger/>
        <Toaster/>
        {children}
      </main>
    </SidebarProvider>
  )
}
