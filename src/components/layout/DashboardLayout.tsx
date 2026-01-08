import { useLocation } from "react-router-dom"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Sidebar } from "./Sidebar"
import { AppRoutes } from "@/routes"

function PageHeader() {
  const location = useLocation()
  const currentPath = location.pathname
  const pathSegments = currentPath.split("/").filter(Boolean)
  const pageTitle = pathSegments.length > 0 
    ? pathSegments[pathSegments.length - 1].split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
    : "Dashboard"

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">
          {pageTitle}
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
          <AppRoutes />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

