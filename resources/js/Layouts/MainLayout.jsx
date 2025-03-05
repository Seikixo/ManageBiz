import { SidebarProvider, SidebarTrigger, SidebarInset, } from "@/Components/ui/sidebar"
import { AppSidebar } from "@/Components/AppSideBar"

export default function MainLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
