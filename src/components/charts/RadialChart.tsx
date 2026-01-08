import { RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RadialChartProps {
  data: Array<{ name: string; value: number; fill?: string }>
  title?: string
  height?: number
  colors?: string[]
}

export function RadialChart({
  data,
  title,
  height = 300,
  colors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"],
}: RadialChartProps) {
  const chartData = data.map((item, index) => ({
    ...item,
    fill: item.fill || colors[index % colors.length],
  }))

  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" data={chartData}>
            <RadialBar dataKey="value" cornerRadius={10} fill="#8884d8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
          </RadialBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

