import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendChart } from "./charts/TrendChart"
import { DonutChartComponent } from "./charts/DonutChart"
import { Income3DPieChart } from "./charts/Income3DPieChart"
import { BarChartComponent } from "./charts/BarChart"
import { LineChartComponent } from "./charts/LineChart"
import { RadarChartComponent } from "./charts/RadarChart"
import { RadialChartComponent } from "./charts/RadialChart"
import { TrendingUp, DollarSign, Building2, AlertCircle, CheckCircle2, FileText } from "lucide-react"

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive overview of property management system
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          Last updated: Today
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$33,807,247</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+16.2%</span> from last year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Rent</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$850,000</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="text-orange-500">-5.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">739</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+77</span> new this year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Costs</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$125,000</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="text-blue-500">+3.2%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Theme Selector */}
  

      {/* Main Charts Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Row 1: Trend Chart and Donut Chart */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>5-Year Revenue & Contract Trends</CardTitle>
                <CardDescription>
                  Revenue and contract count trends over the last 5 years
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TrendChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sectors & Number of Tenants</CardTitle>
                <CardDescription>
                  Commercial vs Residential distribution with tenant counts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DonutChartComponent />
              </CardContent>
            </Card>
          </div>

          {/* Row 1.5: Pie Charts */}
          <div className="grid gap-4 md:grid-cols-2">
       
            <Card>
              <CardHeader>
                <CardTitle>Annual Income Chart (5 Years)</CardTitle>
                <CardDescription>
                  General income distribution across years with 3D visualization
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <Income3DPieChart />
              </CardContent>
            </Card>
          </div>

          {/* Row 2: Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Manager Performance Comparison</CardTitle>
              <CardDescription>
                Revenue and contract counts by zone manager
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChartComponent />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          {/* Row 1: Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Collection Trends</CardTitle>
              <CardDescription>
                Monthly collection vs pending rent over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LineChartComponent />
            </CardContent>
          </Card>

          {/* Row 2: Radial Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Collection Rate by Zone</CardTitle>
              <CardDescription>
                Percentage of rent collected per zone
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadialChartComponent />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          {/* Row 1: Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Overall Performance Metrics</CardTitle>
              <CardDescription>
                Multi-dimensional performance analysis across key metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadarChartComponent />
            </CardContent>
          </Card>

          {/* Row 2: Additional metrics */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Occupancy Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground mt-1">Above average</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Tenant Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4.2/5</div>
                <p className="text-xs text-muted-foreground mt-1">Good rating</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Maintenance Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground mt-1">On track</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

