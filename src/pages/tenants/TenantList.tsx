import { useState } from "react"
import { Link } from "react-router-dom"
import { PageContainer } from "@/components/layout/PageContainer"
import { DataTable, type Column } from "@/components/common/DataTable"
import { FilterBar } from "@/components/common/FilterBar"
import { Button } from "@/components/ui/button"
import { BadgeStatus } from "@/components/common/BadgeStatus"
import { Plus, Eye } from "lucide-react"

const tenants = [
  { id: "1", name: "John Doe", email: "john@example.com", phone: "+1234567890", property: "Building A - Unit 101", category: "regular", status: "active" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", phone: "+1234567891", property: "Building B - Unit 205", category: "family_member", status: "active" },
  { id: "3", name: "Mike Johnson", email: "mike@example.com", phone: "+1234567892", property: "Building C - Unit 310", category: "mall_tenant", status: "inactive" },
]

export function TenantList() {
  const [search, setSearch] = useState("")

  const columns: Column<typeof tenants[0]>[] = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "phone", header: "Phone" },
    { key: "property", header: "Property" },
    { key: "category", header: "Category" },
    {
      key: "status",
      header: "Status",
      render: (row) => <BadgeStatus status={row.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/tenants/${row.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      ),
    },
  ]

  return (
    <PageContainer
      title="Tenants"
      description="Manage tenant information"
      actions={
        <Button asChild>
          <Link to="/tenants/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Tenant
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
        <DataTable columns={columns} data={tenants} />
      </div>
    </PageContainer>
  )
}

