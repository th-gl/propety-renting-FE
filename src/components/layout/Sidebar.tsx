import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Building2,
  MapPin,
  DollarSign,
  Wrench,
  FileText,
  Users,
  Settings,
  BarChart3,
} from "lucide-react"
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import logoImage from "@/assets/logo.png"

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { id: "reports", label: "Reports", icon: BarChart3, path: "/reports" },
  { id: "properties", label: "Properties", icon: Building2, path: "/properties" },
  { id: "zones", label: "Zones", icon: MapPin, path: "/zones" },
  { id: "finance", label: "Finance", icon: DollarSign, path: "/finance" },
  { id: "contracts", label: "Contracts", icon: FileText, path: "/contracts" },
  { id: "tenants", label: "Tenants", icon: Users, path: "/tenants" },
  { id: "maintenance", label: "Maintenance", icon: Wrench, path: "/maintenance" },
  { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
]

export function Sidebar() {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <ShadcnSidebar className="border-r">
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center gap-3 px-4 py-6">
            <img 
              src={logoImage} 
              alt="Property Manager Logo" 
              className="h-12 mb-4 object-contain"
            />
            {/* <SidebarGroupLabel className="text-lg font-bold">
              Property Manager
            </SidebarGroupLabel> */}
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = currentPath === item.path || (currentPath === "/" && item.id === "dashboard")
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        "w-full justify-start",
                        isActive && "bg-accent"
                      )}
                    >
                      <Link to={item.path}>
                        <Icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </ShadcnSidebar>
  )
}

