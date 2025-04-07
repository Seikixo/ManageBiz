import { SidebarProvider, SidebarInset, } from "@/Components/ui/sidebar"
import { Toaster } from "@/Components/ui/sonner"
import { AppSidebar } from "@/Components/AppSideBar"

export default function MainLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full p-4 bg-slate-100">
        <Toaster/>
        {children}
      </main>
    </SidebarProvider>
  )
}
