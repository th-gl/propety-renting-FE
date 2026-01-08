import { useState } from "react"
import { Link } from "react-router-dom"
import { PageContainer } from "@/components/layout/PageContainer"
import { DataTable, type Column } from "@/components/common/DataTable"
import { FilterBar } from "@/components/common/FilterBar"
import { Button } from "@/components/ui/button"
import { BadgeStatus } from "@/components/common/BadgeStatus"
import { Plus, Eye } from "lucide-react"

const tickets = [
  { id: "1", ticketNumber: "TKT-001", title: "Leaky faucet in kitchen", tenant: "John Doe", property: "Building A - Unit 101", status: "open", priority: "medium", assignedTo: "Mike Johnson", createdAt: "2024-01-15" },
  { id: "2", ticketNumber: "TKT-002", title: "AC not working", tenant: "Jane Smith", property: "Building B - Unit 205", status: "in_progress", priority: "high", assignedTo: "Mike Johnson", createdAt: "2024-01-14" },
  { id: "3", ticketNumber: "TKT-003", title: "Broken window", tenant: "Mike Johnson", property: "Building C - Unit 310", status: "resolved", priority: "low", assignedTo: "Sarah Williams", createdAt: "2024-01-13" },
]

export function TicketList() {
  const [search, setSearch] = useState("")

  const columns: Column<typeof tickets[0]>[] = [
    { key: "ticketNumber", header: "Ticket #" },
    { key: "title", header: "Title" },
    { key: "tenant", header: "Tenant" },
    { key: "property", header: "Property" },
    {
      key: "status",
      header: "Status",
      render: (row) => <BadgeStatus status={row.status} />,
    },
    { key: "priority", header: "Priority" },
    { key: "assignedTo", header: "Assigned To" },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/tickets/${row.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      ),
    },
  ]

  return (
    <PageContainer
      title="Tickets"
      description="Manage maintenance and support tickets"
      actions={
        <Button asChild>
          <Link to="/tickets/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Ticket
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
        <DataTable columns={columns} data={tickets} />
      </div>
    </PageContainer>
  )
}

