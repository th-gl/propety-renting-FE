import { PageContainer } from "@/components/layout/PageContainer"
import { StatCard } from "@/components/common/StatCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, FileText, AlertTriangle, Bell, Calendar, Building2, TrendingUp, TrendingDown, Wrench, CreditCard, MapPin } from "lucide-react"
import { BarChart } from "@/components/charts/BarChart"
import { LineChart } from "@/components/charts/LineChart"
import { PieChart } from "@/components/charts/PieChart"
import { DonutChart } from "@/components/charts/DonutChart"
import { AreaChart } from "@/components/charts/AreaChart"
import { BadgeStatus } from "@/components/common/BadgeStatus"
import { Button } from "@/components/ui/button"
import { TabsSection } from "@/components/common/TabsSection"
import { DataTable, type Column } from "@/components/common/DataTable"
import { Link } from "react-router-dom"

// KPI Data - Contract Income, Collection Summary, Occupancy Rates
const kpiData = {
  totalRevenue: 2450000,
  pendingRent: 125000,
  collected: 2325000,
  activeContracts: 342,
  maintenanceCosts: 45000,
  overduePayments: 89000,
  occupancyRate: 87.5,
  collectionRate: 94.9,
  totalUnits: 500,
  occupiedUnits: 437,
  emptyUnits: 63,
  newContracts: 28,
  renewedContracts: 45,
}

// Monthly data for charts
const monthlyData = [
  { month: "Jan", revenue: 200000, collections: 195000, commercial: 120000, residential: 80000 },
  { month: "Feb", revenue: 220000, collections: 210000, commercial: 130000, residential: 90000 },
  { month: "Mar", revenue: 240000, collections: 235000, commercial: 140000, residential: 100000 },
  { month: "Apr", revenue: 230000, collections: 225000, commercial: 135000, residential: 95000 },
  { month: "May", revenue: 250000, collections: 245000, commercial: 150000, residential: 100000 },
  { month: "Jun", revenue: 260000, collections: 255000, commercial: 155000, residential: 105000 },
]

// Building comparison data
const buildingComparison = [
  { building: "Building A", thisYear: 1200000, lastYear: 1100000, difference: 100000 },
  { building: "Building B", thisYear: 980000, lastYear: 950000, difference: 30000 },
  { building: "Building C", thisYear: 870000, lastYear: 820000, difference: 50000 },
]

// Contract income table data
const contractIncomeData = [
  { zone: "Zone A", manager: "Ahmed Al-Swaiket", commercial: 450000, residential: 320000, total: 770000 },
  { zone: "Zone B", manager: "Mohammed Al-Swaiket", commercial: 380000, residential: 290000, total: 670000 },
  { zone: "Zone C", manager: "Fahad Al-Swaiket", commercial: 420000, residential: 310000, total: 730000 },
]

// Expiring contracts (90 days)
const expiringContracts = [
  { id: "1", tenant: "John Doe", property: "Building A - Unit 101", expiryDate: "2024-12-31", daysLeft: 15, status: "Will Renew" },
  { id: "2", tenant: "Jane Smith", property: "Building B - Unit 205", expiryDate: "2025-01-15", daysLeft: 30, status: "Pending" },
  { id: "3", tenant: "Mike Johnson", property: "Building C - Unit 310", expiryDate: "2025-01-20", daysLeft: 35, status: "Will Not Renew" },
  { id: "4", tenant: "Sarah Williams", property: "Building A - Unit 205", expiryDate: "2025-02-10", daysLeft: 56, status: "Pending" },
]

// Overdue payments
const overduePayments = [
  { id: "1", tenant: "ABC Company", property: "Building A - Unit 301", amount: 15000, daysOverdue: 45, status: "overdue" },
  { id: "2", tenant: "XYZ Corp", property: "Building B - Unit 102", amount: 22000, daysOverdue: 60, status: "overdue" },
  { id: "3", tenant: "DEF LLC", property: "Building C - Unit 405", amount: 18000, daysOverdue: 30, status: "overdue" },
]

// Empty facilities
const emptyFacilities = [
  { id: "1", property: "Building A - Unit 201", daysEmpty: 45, expectedRevenue: 5000, zone: "Zone A" },
  { id: "2", property: "Building B - Unit 305", daysEmpty: 30, expectedRevenue: 7500, zone: "Zone B" },
  { id: "3", property: "Building C - Unit 110", daysEmpty: 60, expectedRevenue: 6000, zone: "Zone C" },
]

// Alerts
const alerts = [
  { id: "1", type: "warning", message: "3 contracts expiring in 30 days", time: "2h ago", severity: "medium" },
  { id: "2", type: "error", message: "Payment overdue: Building A - Unit 101 ($15,000)", time: "5h ago", severity: "high" },
  { id: "3", type: "info", message: "Maintenance request completed", time: "1d ago", severity: "low" },
  { id: "4", type: "warning", message: "5 facilities empty for 30+ days", time: "3h ago", severity: "medium" },
]

// Notifications
const notifications = [
  { id: "1", message: "New payment received from John Doe ($5,000)", time: "10m ago", read: false, type: "payment" },
  { id: "2", message: "Contract renewal reminder for Jane Smith", time: "1h ago", read: false, type: "contract" },
  { id: "3", message: "Maintenance request assigned", time: "2h ago", read: true, type: "maintenance" },
  { id: "4", message: "New contract created: Building A - Unit 205", time: "30m ago", read: false, type: "contract" },
]

export function Dashboard() {
  const contractIncomeColumns: Column<typeof contractIncomeData[0]>[] = [
    { key: "zone", header: "Zone" },
    { key: "manager", header: "Zone Manager" },
    { key: "commercial", header: "Commercial", render: (row) => `$${row.commercial.toLocaleString()}` },
    { key: "residential", header: "Residential", render: (row) => `$${row.residential.toLocaleString()}` },
    { key: "total", header: "Total", render: (row) => `$${row.total.toLocaleString()}` },
  ]

  const expiringColumns: Column<typeof expiringContracts[0]>[] = [
    { key: "tenant", header: "Tenant" },
    { key: "property", header: "Property" },
    { key: "expiryDate", header: "Expiry Date" },
    { key: "daysLeft", header: "Days Left", render: (row) => (
      <span className={row.daysLeft <= 30 ? "text-red-600 font-medium" : row.daysLeft <= 60 ? "text-yellow-600" : ""}>
        {row.daysLeft} days
      </span>
    )},
    { key: "status", header: "Status", render: (row) => <BadgeStatus status={row.status === "Will Renew" ? "active" : row.status === "Will Not Renew" ? "cancelled" : "pending"} /> },
  ]

  const overdueColumns: Column<typeof overduePayments[0]>[] = [
    { key: "tenant", header: "Tenant" },
    { key: "property", header: "Property" },
    { key: "amount", header: "Amount", render: (row) => `$${row.amount.toLocaleString()}` },
    { key: "daysOverdue", header: "Days Overdue" },
    { key: "status", header: "Status", render: (row) => <BadgeStatus status={row.status} /> },
  ]

  const emptyFacilitiesColumns: Column<typeof emptyFacilities[0]>[] = [
    { key: "property", header: "Property" },
    { key: "zone", header: "Zone" },
    { key: "daysEmpty", header: "Days Empty", render: (row) => (
      <span className={row.daysEmpty > 30 ? "text-red-600 font-medium" : ""}>
        {row.daysEmpty} days
      </span>
    )},
    { key: "expectedRevenue", header: "Expected Revenue", render: (row) => `$${row.expectedRevenue.toLocaleString()}/month` },
  ]

  return (
    <PageContainer title="Dashboard" description="Overview of your property management system - Replicating Excel Dashboard">
      <div className="space-y-6">
        {/* Main KPIs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue (Contracted)"
            value={`$${kpiData.totalRevenue.toLocaleString()}`}
            icon={DollarSign}
            trend={{ value: 12.5, isPositive: true }}
            description="All active contracts"
          />
          <StatCard
            title="Collected (MTD)"
            value={`$${kpiData.collected.toLocaleString()}`}
            icon={CreditCard}
            trend={{ value: 8.3, isPositive: true }}
            description="Month to date"
          />
          <StatCard
            title="Collection Rate"
            value={`${kpiData.collectionRate}%`}
            icon={TrendingUp}
            trend={{ value: 2.1, isPositive: true }}
            description="Target: 95%"
          />
          <StatCard
            title="Occupancy Rate"
            value={`${kpiData.occupancyRate}%`}
            icon={Building2}
            trend={{ value: 1.2, isPositive: true }}
            description={`${kpiData.occupiedUnits}/${kpiData.totalUnits} units`}
          />
        </div>

        {/* Secondary KPIs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Contracts"
            value={kpiData.activeContracts}
            icon={FileText}
            description={`${kpiData.newContracts} new, ${kpiData.renewedContracts} renewed`}
          />
          <StatCard
            title="Pending Rent"
            value={`$${kpiData.pendingRent.toLocaleString()}`}
            icon={DollarSign}
            trend={{ value: -5.2, isPositive: false }}
          />
          <StatCard
            title="Overdue Payments"
            value={`$${kpiData.overduePayments.toLocaleString()}`}
            icon={AlertTriangle}
            trend={{ value: 3.1, isPositive: false }}
          />
          <StatCard
            title="Maintenance Costs (MTD)"
            value={`$${kpiData.maintenanceCosts.toLocaleString()}`}
            icon={Wrench}
          />
        </div>

        {/* Charts Section */}
        <TabsSection
          tabs={[
            {
              value: "revenue",
              label: "Revenue & Collections",
              content: (
                <div className="grid gap-4 md:grid-cols-2">
                  <BarChart
                    data={monthlyData}
                    dataKey="revenue"
                    xAxisKey="month"
                    title="Monthly Revenue vs Collections"
                    multipleBars={[
                      { key: "revenue", name: "Revenue" },
                      { key: "collections", name: "Collections" },
                    ]}
                  />
                  <LineChart
                    data={monthlyData}
                    dataKey="revenue"
                    xAxisKey="month"
                    title="Revenue Trend (6 Months)"
                  />
                  <AreaChart
                    data={monthlyData}
                    dataKey="collections"
                    xAxisKey="month"
                    title="Collection Trend"
                  />
                  <PieChart
                    data={[
                      { name: "Commercial", value: 65 },
                      { name: "Residential", value: 35 },
                    ]}
                    title="Revenue by Type"
                  />
                </div>
              ),
            },
            {
              value: "building",
              label: "Building Comparison",
              content: (
                <div className="space-y-4">
                  <BarChart
                    data={buildingComparison}
                    dataKey="thisYear"
                    xAxisKey="building"
                    title="Building Income Comparison (Year-over-Year)"
                    multipleBars={[
                      { key: "thisYear", name: "This Year" },
                      { key: "lastYear", name: "Last Year" },
                    ]}
                  />
                  <Card>
                    <CardHeader>
                      <CardTitle>Building Income Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {buildingComparison.map((building) => (
                          <div key={building.building} className="flex items-center justify-between p-3 rounded-lg border">
                            <div>
                              <p className="font-medium">{building.building}</p>
                              <p className="text-sm text-muted-foreground">
                                This Year: ${building.thisYear.toLocaleString()} | Last Year: ${building.lastYear.toLocaleString()}
                              </p>
                            </div>
                            <div className={`text-right ${building.difference > 0 ? "text-green-600" : "text-red-600"}`}>
                              <p className="font-medium">
                                {building.difference > 0 ? "+" : ""}${building.difference.toLocaleString()}
                              </p>
                              <p className="text-xs">
                                {((building.difference / building.lastYear) * 100).toFixed(1)}%
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ),
            },
            {
              value: "collection",
              label: "Collection Summary",
              content: (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Collection Summary by Zone Manager</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <DataTable columns={contractIncomeColumns} data={contractIncomeData} />
                    </CardContent>
                  </Card>
                  <div className="grid gap-4 md:grid-cols-2">
                    <DonutChart
                      data={[
                        { name: "Collected", value: kpiData.collected },
                        { name: "Pending", value: kpiData.pendingRent },
                      ]}
                      title="Collection Status"
                    />
                    <Card>
                      <CardHeader>
                        <CardTitle>Collection Breakdown</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Total Expected</p>
                            <p className="text-2xl font-bold">${kpiData.totalRevenue.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Collected</p>
                            <p className="text-2xl font-bold text-green-600">
                              ${kpiData.collected.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Pending</p>
                            <p className="text-2xl font-bold text-yellow-600">
                              ${kpiData.pendingRent.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Collection Rate</p>
                            <p className="text-2xl font-bold">{kpiData.collectionRate}%</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Target: 95% | Gap: {(95 - kpiData.collectionRate).toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ),
            },
            {
              value: "occupancy",
              label: "Occupancy Analysis",
              content: (
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Occupancy Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Units</p>
                          <p className="text-3xl font-bold">{kpiData.totalUnits}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Occupied</p>
                          <p className="text-3xl font-bold text-green-600">{kpiData.occupiedUnits}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Empty</p>
                          <p className="text-3xl font-bold text-red-600">{kpiData.emptyUnits}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                          <p className="text-3xl font-bold">{kpiData.occupancyRate}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <DonutChart
                    data={[
                      { name: "Occupied", value: kpiData.occupiedUnits },
                      { name: "Empty", value: kpiData.emptyUnits },
                    ]}
                    title="Occupancy Distribution"
                  />
                </div>
              ),
            },
          ]}
        />

        {/* Expiring Contracts Widget */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Contracts Expiring (Next 90 Days)
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/contracts/expiring">View All</Link>
                </Button>
                <Button variant="outline" size="sm">Export</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable columns={expiringColumns} data={expiringContracts} />
          </CardContent>
        </Card>

        {/* Alerts and Notifications */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Alerts
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/alerts">View All</Link>
                </Button>
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
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/notifications">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className={`flex items-start gap-3 p-2 rounded-lg border ${!notif.read ? "bg-muted" : ""}`}>
                    <div className="flex-1">
                      <p className="text-sm">{notif.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                    </div>
                    {!notif.read && <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overdue Payments and Empty Facilities */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Overdue Payments
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/collections">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable columns={overdueColumns} data={overduePayments} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Empty Facilities (30+ Days)
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/properties">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable columns={emptyFacilitiesColumns} data={emptyFacilities} />
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}
