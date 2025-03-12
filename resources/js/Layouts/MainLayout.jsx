import { SidebarProvider, SidebarTrigger, SidebarInset, } from "@/Components/ui/sidebar"
import { AppSidebar } from "@/Components/AppSideBar"

export default function MainLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-4">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
