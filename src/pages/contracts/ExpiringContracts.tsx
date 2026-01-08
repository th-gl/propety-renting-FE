import { PageContainer } from "@/components/layout/PageContainer"
import { DataTable, type Column } from "@/components/common/DataTable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BadgeStatus } from "@/components/common/BadgeStatus"
import { StatCard } from "@/components/common/StatCard"
import { Calendar, AlertTriangle } from "lucide-react"

const expiringContracts = [
  { id: "1", contractNumber: "CNT-001", tenant: "John Doe", property: "Building A - Unit 101", expiryDate: "2024-12-31", daysLeft: 15 },
  { id: "2", contractNumber: "CNT-002", tenant: "Jane Smith", property: "Building B - Unit 205", expiryDate: "2025-01-15", daysLeft: 30 },
  { id: "3", contractNumber: "CNT-003", tenant: "Mike Johnson", property: "Building C - Unit 310", expiryDate: "2025-01-20", daysLeft: 35 },
]

export function ExpiringContracts() {
  const columns: Column<typeof expiringContracts[0]>[] = [
    { key: "contractNumber", header: "Contract #" },
    { key: "tenant", header: "Tenant" },
    { key: "property", header: "Property" },
    { key: "expiryDate", header: "Expiry Date" },
    {
      key: "daysLeft",
      header: "Days Left",
      render: (row) => (
        <span className={row.daysLeft <= 30 ? "text-red-600 font-medium" : ""}>
          {row.daysLeft} days
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <Button variant="outline" size="sm">
          Assign Follow-up
        </Button>
      ),
    },
  ]

  return (
    <PageContainer
      title="Expiring Contracts"
      description="Contracts expiring within the next 90 days"
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            title="Expiring in 30 Days"
            value={3}
            icon={AlertTriangle}
          />
          <StatCard
            title="Expiring in 60 Days"
            value={8}
            icon={Calendar}
          />
          <StatCard
            title="Expiring in 90 Days"
            value={15}
            icon={Calendar}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Expirations</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={expiringContracts} />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}

