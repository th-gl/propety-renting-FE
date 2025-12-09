import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useChartTheme } from "@/lib/chart-theme"

// Collection trends over months
const chartData = [
  { month: "Jan", collected: 2800000, pending: 1200000 },
  { month: "Feb", collected: 3200000, pending: 1100000 },
  { month: "Mar", collected: 3500000, pending: 1000000 },
  { month: "Apr", collected: 3800000, pending: 950000 },
  { month: "May", collected: 4100000, pending: 900000 },
  { month: "Jun", collected: 4500000, pending: 850000 },
]

export function LineChartComponent() {
  const { theme } = useChartTheme()
  
  const chartConfig = {
    collected: {
      label: "Collected",
      color: theme.colors.success,
    },
    pending: {
      label: "Pending",
      color: theme.colors.warning,
    },
  }

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="collected"
          stroke="var(--color-collected)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="pending"
          stroke="var(--color-pending)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}

