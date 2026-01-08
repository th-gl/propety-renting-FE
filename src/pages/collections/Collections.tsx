import { PageContainer } from "@/components/layout/PageContainer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable, type Column } from "@/components/common/DataTable"
import { FilterBar } from "@/components/common/FilterBar"
import { StatCard } from "@/components/common/StatCard"
import { BadgeStatus } from "@/components/common/BadgeStatus"
import { TabsSection } from "@/components/common/TabsSection"
import { DollarSign, TrendingUp, AlertTriangle, Scale } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const overdueTenants = [
  { id: "1", tenant: "John Doe", property: "Building A - Unit 101", amount: 5000, daysOverdue: 15, status: "overdue" },
  { id: "2", tenant: "Jane Smith", property: "Building B - Unit 205", amount: 7500, daysOverdue: 30, status: "overdue" },
]

const courtCases = [
  { id: "1", tenant: "John Doe", caseNumber: "CC-001", amount: 5000, status: "in_progress", raisedDate: "2024-01-01" },
  { id: "2", tenant: "Jane Smith", caseNumber: "CC-002", amount: 7500, status: "won", raisedDate: "2023-12-15" },
]

const collectionActions = [
  { id: "1", tenant: "John Doe", action: "Phone Call", date: "2024-01-15", outcome: "Promise to pay", nextAction: "2024-01-20" },
  { id: "2", tenant: "Jane Smith", action: "Email", date: "2024-01-14", outcome: "No response", nextAction: "2024-01-18" },
]

export function Collections() {
  const [search, setSearch] = useState("")

  const overdueColumns: Column<typeof overdueTenants[0]>[] = [
    { key: "tenant", header: "Tenant" },
    { key: "property", header: "Property" },
    { key: "amount", header: "Amount", render: (row) => `$${row.amount.toLocaleString()}` },
    { key: "daysOverdue", header: "Days Overdue" },
    {
      key: "status",
      header: "Status",
      render: (row) => <BadgeStatus status={row.status} />,
    },
  ]

  const courtColumns: Column<typeof courtCases[0]>[] = [
    { key: "tenant", header: "Tenant" },
    { key: "caseNumber", header: "Case #" },
    { key: "amount", header: "Amount", render: (row) => `$${row.amount.toLocaleString()}` },
    {
      key: "status",
      header: "Status",
      render: (row) => <BadgeStatus status={row.status} />,
    },
    { key: "raisedDate", header: "Raised Date" },
  ]

  const actionColumns: Column<typeof collectionActions[0]>[] = [
    { key: "tenant", header: "Tenant" },
    { key: "action", header: "Action" },
    { key: "date", header: "Date" },
    { key: "outcome", header: "Outcome" },
    { key: "nextAction", header: "Next Action" },
  ]

  return (
    <PageContainer
      title="Collection & Payments"
      description="Track collections and overdue payments"
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard title="Total Expected" value="$245,000" icon={DollarSign} />
          <StatCard title="Collected" value="$230,000" icon={TrendingUp} />
          <StatCard title="Overdue" value="$15,000" icon={AlertTriangle} />
          <StatCard title="Collection Rate" value="93.9%" icon={TrendingUp} />
        </div>

        <TabsSection
          tabs={[
            {
              value: "tracker",
              label: "Collection Tracker",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Collection Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Collection performance charts will appear here</p>
                  </CardContent>
                </Card>
              ),
            },
            {
              value: "overdue",
              label: "Overdue Tenants",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Overdue Tenants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FilterBar
                      searchValue={search}
                      onSearchChange={setSearch}
                      onClear={() => setSearch("")}
                    />
                    <div className="mt-4">
                      <DataTable columns={overdueColumns} data={overdueTenants} />
                    </div>
                  </CardContent>
                </Card>
              ),
            },
            {
              value: "court",
              label: "Court Cases",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Scale className="h-5 w-5" />
                      Court Cases
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DataTable columns={courtColumns} data={courtCases} />
                  </CardContent>
                </Card>
              ),
            },
            {
              value: "family",
              label: "Family Companies",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Family Companies Overdue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Family company overdue payments will appear here</p>
                  </CardContent>
                </Card>
              ),
            },
            {
              value: "mall",
              label: "Mall Collection",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Mall Collection Tracking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Mall collection data will appear here</p>
                  </CardContent>
                </Card>
              ),
            },
            {
              value: "actions",
              label: "Actions Log",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Collection Actions Log</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DataTable columns={actionColumns} data={collectionActions} />
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

