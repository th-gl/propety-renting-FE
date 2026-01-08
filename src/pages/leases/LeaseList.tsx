import { useState } from "react"
import { Link } from "react-router-dom"
import { PageContainer } from "@/components/layout/PageContainer"
import { DataTable, type Column } from "@/components/common/DataTable"
import { FilterBar } from "@/components/common/FilterBar"
import { Button } from "@/components/ui/button"
import { BadgeStatus } from "@/components/common/BadgeStatus"
import { Plus, Eye, Calendar } from "lucide-react"

const leases = [
  { id: "1", leaseNumber: "LSE-001", tenant: "John Doe", property: "Building A - Unit 101", startDate: "2024-01-01", endDate: "2024-12-31", monthlyRent: 5000, status: "active" },
  { id: "2", leaseNumber: "LSE-002", tenant: "Jane Smith", property: "Building B - Unit 205", startDate: "2024-02-01", endDate: "2025-01-31", monthlyRent: 7500, status: "active" },
  { id: "3", leaseNumber: "LSE-003", tenant: "Mike Johnson", property: "Building C - Unit 310", startDate: "2023-06-01", endDate: "2024-05-31", monthlyRent: 6000, status: "expired" },
]

export function LeaseList() {
  const [search, setSearch] = useState("")

  const columns: Column<typeof leases[0]>[] = [
    { key: "leaseNumber", header: "Lease #" },
    { key: "tenant", header: "Tenant" },
    { key: "property", header: "Property" },
    { key: "startDate", header: "Start Date" },
    { key: "endDate", header: "End Date" },
    { key: "monthlyRent", header: "Monthly Rent", render: (row) => `$${row.monthlyRent.toLocaleString()}` },
    {
      key: "status",
      header: "Status",
      render: (row) => <BadgeStatus status={row.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <Button variant="ghost" size="icon" asChild>
          <Link to={`/leases/${row.id}`}>
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      ),
    },
  ]

  return (
    <PageContainer
      title="Leases"
      description="Manage lease agreements"
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Renewal Reminders
          </Button>
          <Button asChild>
            <Link to="/leases/create">
              <Plus className="mr-2 h-4 w-4" />
              New Lease
            </Link>
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <FilterBar
          searchValue={search}
          onSearchChange={setSearch}
          onClear={() => setSearch("")}
        />
        <DataTable columns={columns} data={leases} />
      </div>
    </PageContainer>
  )
}

