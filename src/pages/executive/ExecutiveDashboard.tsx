import { PageContainer } from "@/components/layout/PageContainer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/common/StatCard"
import { BarChart } from "@/components/charts/BarChart"
import { LineChart } from "@/components/charts/LineChart"
import { DataTable, type Column } from "@/components/common/DataTable"
import { DollarSign, TrendingUp, AlertTriangle, Bell, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const executiveKpis = {
  totalRevenue: 2450000,
  collections: 2300000,
  netRevenue: 2200000,
  activeContracts: 342,
  occupancyRate: 87.5,
  collectionRate: 93.9,
}

const revenueData = [
  { month: "Jan", revenue: 200000, collections: 195000 },
  { month: "Feb", revenue: 220000, collections: 210000 },
  { month: "Mar", revenue: 240000, collections: 235000 },
  { month: "Apr", revenue: 230000, collections: 225000 },
  { month: "May", revenue: 250000, collections: 245000 },
  { month: "Jun", revenue: 260000, collections: 255000 },
]

const activityFeed = [
  { id: "1", action: "New contract signed", entity: "Contract #12345", timestamp: "2024-01-15 10:30:00", user: "John Doe" },
  { id: "2", action: "Payment received", entity: "$5,000 from Jane Smith", timestamp: "2024-01-15 09:15:00", user: "System" },
  { id: "3", action: "Maintenance completed", entity: "Request #MNT-001", timestamp: "2024-01-14 16:45:00", user: "Mike Johnson" },
]

const alerts = [
  { id: "1", type: "warning", message: "3 contracts expiring in 30 days", severity: "medium" },
  { id: "2", type: "error", message: "Payment overdue: Building A - Unit 101", severity: "high" },
  { id: "3", type: "info", message: "Maintenance request completed", severity: "low" },
]

export function ExecutiveDashboard() {
  const activityColumns: Column<typeof activityFeed[0]>[] = [
    { key: "timestamp", header: "Time" },
    { key: "action", header: "Action" },
    { key: "entity", header: "Entity" },
    { key: "user", header: "User" },
  ]

  return (
    <PageContainer
      title="Executive Dashboard"
      description="High-level overview and KPIs"
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          <StatCard
            title="Total Revenue"
            value={`$${(executiveKpis.totalRevenue / 1000).toFixed(0)}K`}
            icon={DollarSign}
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatCard
            title="Collections"
            value={`$${(executiveKpis.collections / 1000).toFixed(0)}K`}
            icon={TrendingUp}
            trend={{ value: 8.3, isPositive: true }}
          />
          <StatCard
            title="Net Revenue"
            value={`$${(executiveKpis.netRevenue / 1000).toFixed(0)}K`}
            icon={TrendingUp}
            trend={{ value: 10.2, isPositive: true }}
          />
          <StatCard
            title="Active Contracts"
            value={executiveKpis.activeContracts}
            icon={Zap}
            trend={{ value: 5.1, isPositive: true }}
          />
          <StatCard
            title="Occupancy"
            value={`${executiveKpis.occupancyRate}%`}
            icon={TrendingUp}
            trend={{ value: 2.1, isPositive: true }}
          />
          <StatCard
            title="Collection Rate"
            value={`${executiveKpis.collectionRate}%`}
            icon={TrendingUp}
            trend={{ value: 1.5, isPositive: true }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <BarChart
            data={revenueData}
            dataKey="revenue"
            xAxisKey="month"
            title="Revenue vs Collections"
            multipleBars={[
              { key: "revenue", name: "Revenue" },
              { key: "collections", name: "Collections" },
            ]}
          />
          <LineChart
            data={revenueData}
            dataKey="revenue"
            xAxisKey="month"
            title="Revenue Trend"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Activity Feed
                </CardTitle>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable columns={activityColumns} data={activityFeed} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Alerts Overview
                </CardTitle>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-2 rounded-lg border">
                    <div className={`h-2 w-2 rounded-full mt-2 ${
                      alert.severity === "high" ? "bg-red-500" :
                      alert.severity === "medium" ? "bg-yellow-500" : "bg-blue-500"
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1 capitalize">{alert.severity} priority</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 md:grid-cols-4">
              <Button variant="outline" className="w-full">View Contracts</Button>
              <Button variant="outline" className="w-full">View Reports</Button>
              <Button variant="outline" className="w-full">Manage Zones</Button>
              <Button variant="outline" className="w-full">System Settings</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}

