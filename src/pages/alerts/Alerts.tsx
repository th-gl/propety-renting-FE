import { PageContainer } from "@/components/layout/PageContainer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DataTable, type Column } from "@/components/common/DataTable"
import { FilterBar } from "@/components/common/FilterBar"
import { BadgeStatus } from "@/components/common/BadgeStatus"
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"

const alerts = [
  { id: "1", title: "Contract Expiring Soon", message: "3 contracts expiring in 30 days", severity: "warning", status: "active", createdAt: "2024-01-15 10:30:00" },
  { id: "2", title: "Payment Overdue", message: "Payment overdue: Building A - Unit 101", severity: "error", status: "active", createdAt: "2024-01-15 09:15:00" },
  { id: "3", title: "Maintenance Completed", message: "Maintenance request #123 completed", severity: "info", status: "resolved", createdAt: "2024-01-14 16:45:00" },
]

export function Alerts() {
  const [search, setSearch] = useState("")

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-blue-500" />
    }
  }

  const columns: Column<typeof alerts[0]>[] = [
    {
      key: "severity",
      header: "Severity",
      render: (row) => (
        <div className="flex items-center gap-2">
          {getSeverityIcon(row.severity)}
          <span className="capitalize">{row.severity}</span>
        </div>
      ),
    },
    { key: "title", header: "Title" },
    { key: "message", header: "Message" },
    {
      key: "status",
      header: "Status",
      render: (row) => <BadgeStatus status={row.status} />,
    },
    { key: "createdAt", header: "Created" },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          {row.status === "active" && (
            <>
              <Button variant="ghost" size="sm">Acknowledge</Button>
              <Button variant="ghost" size="sm">Resolve</Button>
            </>
          )}
        </div>
      ),
    },
  ]

  return (
    <PageContainer
      title="Alert Management"
      description="View and manage system alerts"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Alert Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Contract Expiry Alert (Days)</label>
                <input type="number" className="w-full px-3 py-2 border rounded-md" defaultValue="30" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Payment Overdue Alert (Days)</label>
                <input type="number" className="w-full px-3 py-2 border rounded-md" defaultValue="7" />
              </div>
            </div>
            <Button>Save Configuration</Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <FilterBar
            searchValue={search}
            onSearchChange={setSearch}
            onClear={() => setSearch("")}
          />
          <DataTable columns={columns} data={alerts} />
        </div>
      </div>
    </PageContainer>
  )
}

