import {
    LayoutDashboardIcon,
    HandshakeIcon,
    Users,
    Package,
    Cog,
    HandCoins,
    LogOut,
} from "lucide-react";
import { usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
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
} from "@/Components/ui/sidebar";

// Menu groups
const overview = [
    {
        title: "Dashboard",
        url: route("dashboard.index"),
        icon: LayoutDashboardIcon,
    },
];

const sales_and_customers = [
    {
        title: "Customers",
        url: route("customers.index"),
        icon: Users,
    },
    {
        title: "Orders",
        url: route("orders.index"),
        icon: HandshakeIcon,
    },
    {
        title: "Payments",
        url: route("payments.index"),
        icon: HandCoins,
    },
];

const inventory_and_operations = [
    {
        title: "Products",
        url: route("products.index"),
        icon: Package,
    },
    {
        title: "Production",
        url: route("productions.index"),
        icon: Cog,
    },
];

// helper renderer
const RenderMenu = ({ items }) => (
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
);

export function AppSidebar() {
    const user = usePage().props.auth.user;

    return (
        <nav>
            <Sidebar variant="sidebar" collapsible="icon">
                <SidebarContent className="bg-white mt-2">
                    {/* Logo */}
                    <SidebarGroup>
                        <div className="flex justify-center w-full mb-6">
                            <SidebarGroupLabel className="flex text-gray-700 text-lg font-semibold items-center">
                                <img
                                    src="/images/ManageBiz-Logo.png"
                                    alt=""
                                    className="w-10 h-10"
                                />
                                Managebiz
                            </SidebarGroupLabel>
                        </div>
                    </SidebarGroup>

                    {/* Overview */}
                    <SidebarGroup>
                        <SidebarGroupLabel>Overview</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <RenderMenu items={overview} />
                        </SidebarGroupContent>
                    </SidebarGroup>

                    {/* Sales & Customers */}
                    <SidebarGroup>
                        <SidebarGroupLabel>Sales & Customers</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <RenderMenu items={sales_and_customers} />
                        </SidebarGroupContent>
                    </SidebarGroup>

                    {/* Inventory & Operations */}
                    <SidebarGroup>
                        <SidebarGroupLabel>
                            Inventory & Operations
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <RenderMenu items={inventory_and_operations} />
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                {/* Footer */}
                <SidebarFooter className="bg-white">
                    <SidebarGroupLabel>
                        <span>{user.name}</span>
                    </SidebarGroupLabel>

                    <Link method="post" href={route("logout")} as="a">
                        <SidebarMenuButton>
                            <LogOut />
                            <span>Logout</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarFooter>
            </Sidebar>
        </nav>
    );
}
