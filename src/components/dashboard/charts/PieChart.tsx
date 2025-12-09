import { Pie, PieChart, Cell } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { useChartTheme } from "@/lib/chart-theme"

export function PieChartComponent() {
  const { theme } = useChartTheme()
  
  // Commercial vs Residential data
  const chartData = [
    { name: "Commercial", value: 24551497.5, count: 243, fill: theme.colors.commercial },
    { name: "Residential", value: 9255750, count: 44, fill: theme.colors.residential },
  ]

  const chartConfig = {
    commercial: {
      label: "Commercial",
      color: theme.colors.commercial,
    },
    residential: {
      label: "Residential",
      color: theme.colors.residential,
    },
  }

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <PieChart>
        <ChartTooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-medium">{data.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <div>Amount: ${data.value.toLocaleString()}</div>
                      <div>Tenants: {data.count}</div>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <ChartLegend content={<ChartLegendContent />} />
      </PieChart>
    </ChartContainer>
  )
}
