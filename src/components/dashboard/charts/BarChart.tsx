import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useChartTheme } from "@/lib/chart-theme"

// Manager performance data - Revenue & Contract counts
const chartData = [
  { manager: "Manager 1", revenue: 14117517.62, contracts: 342 },
  { manager: "Manager 2", revenue: 9623252.55, contracts: 265 },
  { manager: "Manager 3", revenue: 7256570.5, contracts: 198 },
  { manager: "Manager 4", revenue: 2855586.97, contracts: 124 },
]

export function BarChartComponent() {
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

export function BarChartComponent() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="manager"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
        <Bar dataKey="contracts" fill="var(--color-contracts)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

