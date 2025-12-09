import { RadialBar, RadialBarChart, Legend } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"
import { useChartTheme } from "@/lib/chart-theme"

export function RadialChartComponent() {
  const { theme } = useChartTheme()
  
  // Collection progress by zone
  const chartData = [
    { name: "Zone A", value: 85, fill: theme.colors.primary },
    { name: "Zone B", value: 72, fill: theme.colors.secondary },
    { name: "Zone C", value: 91, fill: theme.colors.tertiary },
    { name: "Zone D", value: 68, fill: theme.colors.quaternary },
  ]

  const chartConfig = {
    zoneA: {
      label: "Zone A",
      color: theme.colors.primary,
    },
    zoneB: {
      label: "Zone B",
      color: theme.colors.secondary,
    },
    zoneC: {
      label: "Zone C",
      color: theme.colors.tertiary,
    },
    zoneD: {
      label: "Zone D",
      color: theme.colors.quaternary,
    },
  }

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="20%"
        outerRadius="80%"
        data={chartData}
        startAngle={90}
        endAngle={-270}
      >
        <RadialBar
          dataKey="value"
          cornerRadius={4}
        />
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
                      Collection Rate: {data.value}%
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Legend
          iconSize={10}
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </RadialBarChart>
    </ChartContainer>
  )
}

