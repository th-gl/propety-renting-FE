import { useState } from "react"
import { Link } from "react-router-dom"
import { PageContainer } from "@/components/layout/PageContainer"
import { DataTable, type Column } from "@/components/common/DataTable"
import { FilterBar } from "@/components/common/FilterBar"
import { Button } from "@/components/ui/button"
import { BadgeStatus } from "@/components/common/BadgeStatus"
import { Plus, Eye, Image as ImageIcon, Share2 } from "lucide-react"

const properties = [
  { id: "1", name: "Building A", address: "123 Main St", zone: "Zone A", totalUnits: 50, occupiedUnits: 45, emptyUnits: 5, daysEmpty: 30, status: "active" },
  { id: "2", name: "Building B", address: "456 Oak Ave", zone: "Zone B", totalUnits: 30, occupiedUnits: 28, emptyUnits: 2, daysEmpty: 15, status: "active" },
  { id: "3", name: "Building C", address: "789 Pine Rd", zone: "Zone C", totalUnits: 40, occupiedUnits: 35, emptyUnits: 5, daysEmpty: 60, status: "active" },
]

export function PropertyList() {
  const [search, setSearch] = useState("")

  const columns: Column<typeof properties[0]>[] = [
    { key: "name", header: "Property Name" },
    { key: "address", header: "Address" },
    { key: "zone", header: "Zone" },
    { key: "totalUnits", header: "Total Units" },
    { key: "occupiedUnits", header: "Occupied" },
    { key: "emptyUnits", header: "Empty" },
    {
      key: "daysEmpty",
      header: "Days Empty",
      render: (row) => (
        <span className={row.daysEmpty > 30 ? "text-red-600 font-medium" : ""}>
          {row.daysEmpty} days
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/properties/${row.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <PageContainer
      title="Properties"
      description="Manage properties and facilities"
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            Empty Facilities
          </Button>
          <Button asChild>
            <Link to="/properties/create">
              <Plus className="mr-2 h-4 w-4" />
              Add Property
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
        <DataTable columns={columns} data={properties} />
      </div>
    </PageContainer>
  )
}

