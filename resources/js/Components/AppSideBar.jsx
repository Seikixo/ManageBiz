import { Calendar, Home, Inbox, Search, Settings, LogOut, LogOutIcon } from "lucide-react";
import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/Components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  
]

export function AppSidebar() {
    const user = usePage().props.auth.user;

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Application</SidebarGroupLabel>

                <SidebarGroupContent>        

                <SidebarMenu>
                    {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                        <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                        </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    ))}               
                </SidebarMenu>    
                    
                </SidebarGroupContent>
            </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
            <SidebarGroupLabel>
                <span>{user.name}</span>
            </SidebarGroupLabel>

            
            <Link
                method="post"
                href={route('logout')}
                as="button"
            >
                <SidebarMenuButton>
                    <LogOut/>
                    <span>Logout</span>
                </SidebarMenuButton>   
            </Link>
            
        </SidebarFooter>
    </Sidebar>
  )
}
