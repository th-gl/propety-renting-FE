import { useState } from "react"
import { Link } from "react-router-dom"
import { PageContainer } from "@/components/layout/PageContainer"
import { DataTable, type Column } from "@/components/common/DataTable"
import { FilterBar } from "@/components/common/FilterBar"
import { Button } from "@/components/ui/button"
import { BadgeStatus } from "@/components/common/BadgeStatus"
import { Plus, Eye, Clock } from "lucide-react"

const maintenanceRequests = [
  { id: "1", requestNumber: "MNT-001", title: "Leaky faucet", property: "Building A - Unit 101", type: "reactive", status: "pending", slaDeadline: "2024-01-17", createdAt: "2024-01-15" },
  { id: "2", requestNumber: "MNT-002", title: "AC maintenance", property: "Building B - Unit 205", type: "preventive", status: "in_progress", slaDeadline: "2024-01-20", createdAt: "2024-01-14" },
  { id: "3", requestNumber: "MNT-003", title: "Broken window", property: "Building C - Unit 310", type: "emergency", status: "completed", slaDeadline: "2024-01-16", createdAt: "2024-01-13" },
]

export function MaintenanceList() {
  const [search, setSearch] = useState("")

  const columns: Column<typeof maintenanceRequests[0]>[] = [
    { key: "requestNumber", header: "Request #" },
    { key: "title", header: "Title" },
    { key: "property", header: "Property" },
    { key: "type", header: "Type" },
    {
      key: "status",
      header: "Status",
      render: (row) => <BadgeStatus status={row.status} />,
    },
    {
      key: "slaDeadline",
      header: "SLA Deadline",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{row.slaDeadline}</span>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <Button variant="ghost" size="icon" asChild>
          <Link to={`/maintenance/${row.id}`}>
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      ),
    },
  ]

  return (
    <PageContainer
      title="Maintenance Requests"
      description="Manage maintenance and repair requests"
      actions={
        <Button asChild>
          <Link to="/maintenance/create">
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Link>
        </Button>
      }
    >
      <div className="space-y-4">
        <FilterBar
          searchValue={search}
          onSearchChange={setSearch}
          onClear={() => setSearch("")}
        />
        <DataTable columns={columns} data={maintenanceRequests} />
      </div>
    </PageContainer>
  )
}

