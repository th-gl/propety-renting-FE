import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useChartTheme } from "@/lib/chart-theme"

// Zone performance metrics
const chartData = [
  { category: "Collections", value: 95, fullMark: 100 },
  { category: "Maintenance", value: 78, fullMark: 100 },
  { category: "Contracts", value: 88, fullMark: 100 },
  { category: "Tenant Satisfaction", value: 82, fullMark: 100 },
  { category: "Revenue", value: 92, fullMark: 100 },
  { category: "Occupancy", value: 87, fullMark: 100 },
]

export function RadarChartComponent() {
  const { theme } = useChartTheme()
  
  const chartConfig = {
    value: {
      label: "Performance",
      color: theme.colors.primary,
    },
  }

export function RadarChartComponent() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <RadarChart data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="category" />
        <PolarRadiusAxis angle={90} domain={[0, 100]} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Radar
          name="Performance"
          dataKey="value"
          stroke="var(--color-value)"
          fill="var(--color-value)"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ChartContainer>
  )
}

