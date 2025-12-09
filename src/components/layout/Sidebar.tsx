import {
  LayoutDashboard,
  Building2,
  MapPin,
  DollarSign,
  Wrench,
  FileText,
  Users,
  Settings,
} from "lucide-react"
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "zones", label: "Zones", icon: MapPin },
  { id: "properties", label: "Properties", icon: Building2 },
  { id: "finance", label: "Finance", icon: DollarSign },
  { id: "maintenance", label: "Maintenance", icon: Wrench },
  { id: "contracts", label: "Contracts", icon: FileText },
  { id: "tenants", label: "Tenants", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
]

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
  return (
    <ShadcnSidebar className="border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold px-4 py-6">
            Property Manager
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveView(item.id)}
                      isActive={activeView === item.id}
                      className={cn(
                        "w-full justify-start",
                        activeView === item.id && "bg-accent"
                      )}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {item.label}
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

