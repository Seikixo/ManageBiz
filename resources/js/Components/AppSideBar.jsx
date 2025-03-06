import { LayoutDashboardIcon, HandshakeIcon, ListOrderedIcon, BaggageClaimIcon, LogOut, } from "lucide-react";
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
    title: "Dashboard",
    url: route('dashboard'),
    icon: LayoutDashboardIcon,
  },
  {
    title: "Inventory",
    url: route('inventory'),
    icon: ListOrderedIcon,
  },
  {
    title: "Products",
    url: route('products'),
    icon: BaggageClaimIcon,
  },
  {
    title: "Orders",
    url: route('orders'),
    icon: HandshakeIcon,
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

                        <Link href={item.url} preserveState>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>

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
