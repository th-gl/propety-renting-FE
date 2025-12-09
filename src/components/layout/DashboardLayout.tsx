import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Sidebar } from "./Sidebar"
import { Dashboard } from "@/components/dashboard/Dashboard"
import { Reports } from "@/components/modules/Reports"
import { Zones } from "@/components/modules/Zones"
import { Properties } from "@/components/modules/Properties"
import { Finance } from "@/components/modules/Finance"
import { Contracts } from "@/components/modules/Contracts"
import { Tenants } from "@/components/modules/Tenants"

const menuItems = [
  { id: "dashboard", label: "Dashboard", path: "/dashboard" },
  { id: "reports", label: "Reports", path: "/reports" },
  { id: "properties", label: "Properties", path: "/properties" },
  { id: "zones", label: "Zones", path: "/zones" },
  { id: "finance", label: "Finance", path: "/finance" },
  { id: "contracts", label: "Contracts", path: "/contracts" },
  { id: "tenants", label: "Tenants", path: "/tenants" },
  { id: "maintenance", label: "Maintenance", path: "/maintenance" },
  { id: "settings", label: "Settings", path: "/settings" },
]

function PageHeader() {
  const location = useLocation()
  const currentPath = location.pathname
  const currentItem = menuItems.find(
    (item) => item.path === currentPath || (currentPath === "/" && item.id === "dashboard")
  )

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">
          {currentItem?.label || "Dashboard"}
        </h2>
      </div>
    </header>
  )
}

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <PageHeader />
        <div className="flex flex-1 flex-col gap-4 overflow-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/zones" element={<Zones />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/finance" element={<Finance />} />
            <Route
              path="/maintenance"
              element={
                <div className="p-8">
                  <h1 className="text-3xl font-bold mb-4">Maintenance</h1>
                  <p className="text-muted-foreground">Maintenance tracking view coming soon...</p>
                </div>
              }
            />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/tenants" element={<Tenants />} />
            <Route
              path="/settings"
              element={
                <div className="p-8">
                  <h1 className="text-3xl font-bold mb-4">Settings</h1>
                  <p className="text-muted-foreground">Settings view coming soon...</p>
                </div>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

