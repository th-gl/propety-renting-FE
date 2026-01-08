import { PageContainer } from "@/components/layout/PageContainer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsSection } from "@/components/common/TabsSection"
import { StatCard } from "@/components/common/StatCard"
import { DataTable, type Column } from "@/components/common/DataTable"
import { DollarSign, TrendingUp, Wrench, Zap } from "lucide-react"

const rentRoll = [
  { id: "1", property: "Building A", unit: "Unit 101", tenant: "John Doe", monthlyRent: 5000, status: "paid" },
  { id: "2", property: "Building B", unit: "Unit 205", tenant: "Jane Smith", monthlyRent: 7500, status: "pending" },
]

const opex = [
  { id: "1", category: "Maintenance", amount: 5000, date: "2024-01-15", property: "Building A" },
  { id: "2", category: "Utilities", amount: 3000, date: "2024-01-15", property: "Building B" },
]

const capex = [
  { id: "1", project: "Roof Replacement", amount: 50000, date: "2024-01-15", property: "Building A" },
  { id: "2", project: "HVAC Upgrade", amount: 30000, date: "2024-01-14", property: "Building B" },
]

export function Assets() {
  const rentRollColumns: Column<typeof rentRoll[0]>[] = [
    { key: "property", header: "Property" },
    { key: "unit", header: "Unit" },
    { key: "tenant", header: "Tenant" },
    { key: "monthlyRent", header: "Monthly Rent", render: (row) => `$${row.monthlyRent.toLocaleString()}` },
    { key: "status", header: "Status" },
  ]

  const opexColumns: Column<typeof opex[0]>[] = [
    { key: "category", header: "Category" },
    { key: "property", header: "Property" },
    { key: "amount", header: "Amount", render: (row) => `$${row.amount.toLocaleString()}` },
    { key: "date", header: "Date" },
  ]

  const capexColumns: Column<typeof capex[0]>[] = [
    { key: "project", header: "Project" },
    { key: "property", header: "Property" },
    { key: "amount", header: "Amount", render: (row) => `$${row.amount.toLocaleString()}` },
    { key: "date", header: "Date" },
  ]

  return (
    <PageContainer
      title="Asset & Financial Management"
      description="Track rent roll, OPEX, CapEx, and utilities"
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard title="Total Revenue" value="$245,000" icon={DollarSign} />
          <StatCard title="OPEX" value="$45,000" icon={TrendingUp} />
          <StatCard title="CapEx" value="$80,000" icon={Wrench} />
          <StatCard title="Utility Recovery" value="$12,000" icon={Zap} />
        </div>

        <TabsSection
          tabs={[
            {
              value: "rent-roll",
              label: "Rent Roll",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Rent Roll</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DataTable columns={rentRollColumns} data={rentRoll} />
                  </CardContent>
                </Card>
              ),
            },
            {
              value: "opex",
              label: "OPEX Tracking",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Operating Expenses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DataTable columns={opexColumns} data={opex} />
                  </CardContent>
                </Card>
              ),
            },
            {
              value: "capex",
              label: "CapEx Tracking",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Capital Expenditures</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DataTable columns={capexColumns} data={capex} />
                  </CardContent>
                </Card>
              ),
            },
            {
              value: "utilities",
              label: "Utility Recovery",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Utility Recovery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Utility recovery tracking will appear here</p>
                  </CardContent>
                </Card>
              ),
            },
            {
              value: "maintenance-history",
              label: "Maintenance Cost History",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Maintenance Cost History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Maintenance cost history will appear here</p>
                  </CardContent>
                </Card>
              ),
            },
          ]}
        />
      </div>
    </PageContainer>
  )
}

