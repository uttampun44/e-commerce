import { LinkTypes } from "@/types/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Link } from "react-router";
import { LayoutDashboard, Package, ShoppingCart, Users, Settings } from "lucide-react";

const iconMap: { [key: string]: React.ReactNode } = {
  "Dashboard": <LayoutDashboard size={20} />,
  "Products": <Package size={20} />,
  "Orders": <ShoppingCart size={20} />,
  "Customers": <Users size={20} />,
  "Settings": <Settings size={20} />,
};

export default function AppSidebar() {
  const sidebarItems = LinkTypes;

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">Unit Deals</h1>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-4">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Object.values(sidebarItems).map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center gap-3">
                      <span>{iconMap[item.name] || <LayoutDashboard size={20} />}</span>
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <p className="text-xs text-gray-500">© 2025 Unit Deals</p>
      </SidebarFooter>
    </Sidebar>
  );
}
