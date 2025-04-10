import { LayoutDashboardIcon, HandshakeIcon, Users, Package, Cog, HandCoins, LogOut, } from "lucide-react";
import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger
} from "@/Components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: route('dashboard.index'),
    icon: LayoutDashboardIcon,
  },
  {
    title: "Customers",
    url: route('customers.index'),
    icon: Users,
  },
  {
    title: "Products",
    url: route('products.index'),
    icon: Package,
  },
  {
    title: "Payments",
    url: route('payments.index'),
    icon: HandCoins,
  },
  {
    title: "Orders",
    url: route('orders.index'),
    icon: HandshakeIcon,
  },
  {
    title: "Production",
    url: route('productions.index'),
    icon: Cog,
  },

  
]

export function AppSidebar() {
    const user = usePage().props.auth.user;

  return (
    <nav>
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarContent className="bg-white mt-2">
              <SidebarGroup>
                  <div className="flex justify-center w-full mb-6">
                    <SidebarGroupLabel className="flex text-gray-700 text-lg font-semibold items-center">
                      <img src="/images/ManageBiz-Logo.png" alt="" className="w-10 h-10"/>
                      Managebiz
                    </SidebarGroupLabel>
                  </div>

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

        <SidebarFooter className="bg-white">
              <SidebarGroupLabel>
                  <span>{user.name}</span>
              </SidebarGroupLabel>

              <Link
                  method="post"
                  href={route('logout')}
                  as="a"
              >
                  <SidebarMenuButton>
                      <LogOut/>
                      <span>Logout</span>
                  </SidebarMenuButton>   
              </Link>
              
          </SidebarFooter>
      </Sidebar>
    </nav>
  )
}
