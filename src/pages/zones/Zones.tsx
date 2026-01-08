import { PageContainer } from "@/components/layout/PageContainer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsSection } from "@/components/common/TabsSection"
import { StatCard } from "@/components/common/StatCard"
import { DataTable, type Column } from "@/components/common/DataTable"
import { BadgeStatus } from "@/components/common/BadgeStatus"
import { BarChart } from "@/components/charts/BarChart"
import { LineChart } from "@/components/charts/LineChart"
import { Users, DollarSign, Building, TrendingUp } from "lucide-react"

const zoneKpis = {
  totalRevenue: 2450000,
  activeContracts: 342,
  occupancyRate: 87.5,
  collectionRate: 92.3,
}

const zoneManagers = [
  { id: "1", name: "John Manager", email: "john@example.com", zones: "Zone A, Zone B", status: "active" },
  { id: "2", name: "Jane Manager", email: "jane@example.com", zones: "Zone C", status: "active" },
]

const assetsByStatus = [
  { id: "1", property: "Building A", status: "occupied", units: 45 },
  { id: "2", property: "Building B", status: "vacant", units: 2 },
  { id: "3", property: "Building C", status: "maintenance", units: 3 },
]

const topOverdue = [
  { id: "1", tenant: "John Doe", property: "Building A - Unit 101", amount: 5000, daysOverdue: 15 },
  { id: "2", tenant: "Jane Smith", property: "Building B - Unit 205", amount: 7500, daysOverdue: 30 },
]

const trendData = [
  { month: "Jan", zoneA: 200000, zoneB: 180000, zoneC: 150000 },
  { month: "Feb", zoneA: 220000, zoneB: 190000, zoneC: 160000 },
  { month: "Mar", zoneA: 240000, zoneB: 200000, zoneC: 170000 },
]

export function Zones() {
  const managerColumns: Column<typeof zoneManagers[0]>[] = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "zones", header: "Zones" },
    {
      key: "status",
      header: "Status",
      render: (row) => <BadgeStatus status={row.status} />,
    },
  ]

  const assetColumns: Column<typeof assetsByStatus[0]>[] = [
    { key: "property", header: "Property" },
    {
      key: "status",
      header: "Status",
      render: (row) => <BadgeStatus status={row.status} />,
    },
    { key: "units", header: "Units" },
  ]

  const overdueColumns: Column<typeof topOverdue[0]>[] = [
    { key: "tenant", header: "Tenant" },
    { key: "property", header: "Property" },
    { key: "amount", header: "Amount", render: (row) => `$${row.amount.toLocaleString()}` },
    { key: "daysOverdue", header: "Days Overdue" },
  ]

  return (
    <PageContainer
      title="Zone Management"
      description="Manage zones and zone managers"
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard title="Total Revenue" value={`$${zoneKpis.totalRevenue.toLocaleString()}`} icon={DollarSign} />
          <StatCard title="Active Contracts" value={zoneKpis.activeContracts} icon={Building} />
          <StatCard title="Occupancy Rate" value={`${zoneKpis.occupancyRate}%`} icon={Users} />
          <StatCard title="Collection Rate" value={`${zoneKpis.collectionRate}%`} icon={TrendingUp} />
        </div>

        <TabsSection
          tabs={[
            {
              value: "dashboard",
              label: "Zone KPI Dashboard",
              content: (
                <div className="grid gap-4 md:grid-cols-2">
                  <BarChart
                    data={trendData}
                    dataKey="zoneA"
                    xAxisKey="month"
                    title="Zone A Revenue"
                  />
                  <BarChart
                    data={trendData}
                    dataKey="zoneB"
                    xAxisKey="month"
                    title="Zone B Revenue"
                  />
                </div>
              ),
            },
            {
              value: "managers",
              label: "Zone Managers",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Zone Manager Profiles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DataTable columns={managerColumns} data={zoneManagers} />
                  </CardContent>
                </Card>
              ),
            },
            {
              value: "assets",
              label: "Assets by Status",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Assets by Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DataTable columns={assetColumns} data={assetsByStatus} />
                  </CardContent>
                </Card>
              ),
            },
            {
              value: "overdue",
              label: "Top Overdue Tenants",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Top Overdue Tenants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DataTable columns={overdueColumns} data={topOverdue} />
                  </CardContent>
                </Card>
              ),
            },
            {
              value: "comparison",
              label: "Cross-Zone Comparison",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Cross-Zone Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BarChart
                      data={trendData}
                      dataKey="zoneA"
                      xAxisKey="month"
                      title="Zone Comparison"
                      multipleBars={[
                        { key: "zoneA", name: "Zone A" },
                        { key: "zoneB", name: "Zone B" },
                        { key: "zoneC", name: "Zone C" },
                      ]}
                    />
                  </CardContent>
                </Card>
              ),
            },
            {
              value: "trends",
              label: "Trend Analysis",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Trend Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LineChart
                      data={trendData}
                      dataKey="zoneA"
                      xAxisKey="month"
                      title="Revenue Trends"
                      multipleLines={[
                        { key: "zoneA", name: "Zone A" },
                        { key: "zoneB", name: "Zone B" },
                        { key: "zoneC", name: "Zone C" },
                      ]}
                    />
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

