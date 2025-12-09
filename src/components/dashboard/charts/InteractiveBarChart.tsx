import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"
import { useChartTheme } from "@/lib/chart-theme"

// 5-year revenue & contract count trends data
const chartData = [
  { year: "2020", revenue: 21126250, contracts: 430 },
  { year: "2021", revenue: 24861562, contracts: 483 },
  { year: "2022", revenue: 28092173, contracts: 565 },
  { year: "2023", revenue: 29115623, contracts: 565 },
  { year: "2024", revenue: 29088355, contracts: 662 },
  { year: "2025", revenue: 33807247, contracts: 739 },
]

export function InteractiveBarChart() {
  const { theme } = useChartTheme()
  
  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: theme.colors.primary,
    },
    contracts: {
      label: "Contracts",
      color: theme.colors.secondary,
    },
  }

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart
        data={chartData}
        margin={{
          left: 12,
          right: 12,
          top: 12,
          bottom: 12,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="year"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => {
            if (value >= 1000000) {
              return `$${(value / 1000000).toFixed(1)}M`
            }
            return value.toString()
          }}
        />
        <ChartTooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-3 shadow-sm">
                  <div className="grid gap-2">
                    <div className="font-medium">{label}</div>
                    {payload.map((item, index) => {
                      const config = chartConfig[item.dataKey as keyof typeof chartConfig]
                      return (
                        <div key={index} className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <div
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: config?.color || item.color }}
                            />
                            <span className="text-sm text-muted-foreground">
                              {config?.label || item.name}
                            </span>
                          </div>
                          <span className="font-medium">
                            {item.dataKey === "revenue"
                              ? `$${Number(item.value).toLocaleString()}`
                              : item.value}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Bar
          dataKey="revenue"
          fill="var(--color-revenue)"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="contracts"
          fill="var(--color-contracts)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  )
}
