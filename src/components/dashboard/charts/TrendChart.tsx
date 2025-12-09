import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
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

export function TrendChart() {
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
      <AreaChart
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="year"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          dataKey="revenue"
          type="natural"
          fill="var(--color-revenue)"
          fillOpacity={0.4}
          stroke="var(--color-revenue)"
          stackId="a"
        />
        <Area
          dataKey="contracts"
          type="natural"
          fill="var(--color-contracts)"
          fillOpacity={0.4}
          stroke="var(--color-contracts)"
          stackId="b"
        />
      </AreaChart>
    </ChartContainer>
  )
}

