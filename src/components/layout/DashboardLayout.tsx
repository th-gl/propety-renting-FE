import { useState } from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Sidebar } from "./Sidebar"
import { Dashboard } from "@/components/dashboard/Dashboard"
import { Zones } from "@/components/modules/Zones"
import { Properties } from "@/components/modules/Properties"
import { Finance } from "@/components/modules/Finance"
import { Contracts } from "@/components/modules/Contracts"
import { Tenants } from "@/components/modules/Tenants"

const menuItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "zones", label: "Zones" },
  { id: "properties", label: "Properties" },
  { id: "finance", label: "Finance" },
  { id: "maintenance", label: "Maintenance" },
  { id: "contracts", label: "Contracts" },
  { id: "tenants", label: "Tenants" },
  { id: "settings", label: "Settings" },
]

export function DashboardLayout() {
  const [activeView, setActiveView] = useState("dashboard")

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />
      case "zones":
        return <Zones />
      case "properties":
        return <Properties />
      case "finance":
        return <Finance />
      case "maintenance":
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Maintenance</h1>
            <p className="text-muted-foreground">Maintenance tracking view coming soon...</p>
          </div>
        )
      case "contracts":
        return <Contracts />
      case "tenants":
        return <Tenants />
      case "settings":
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Settings</h1>
            <p className="text-muted-foreground">Settings view coming soon...</p>
          </div>
        )
      default:
        return <Dashboard />
    }
  }

  return (
    <SidebarProvider>
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">
              {activeView === "dashboard" ? "Dashboard" : menuItems.find(m => m.id === activeView)?.label || "Dashboard"}
            </h2>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 overflow-auto">
          {renderContent()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

