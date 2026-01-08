import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BarChartProps {
  data: Array<Record<string, any>>
  dataKey: string
  xAxisKey: string
  title?: string
  height?: number
  colors?: string[]
  multipleBars?: Array<{ key: string; name: string }>
}

export function BarChart({
  data,
  dataKey,
  xAxisKey,
  title,
  height = 300,
  colors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))"],
  multipleBars,
}: BarChartProps) {
  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsBarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey={xAxisKey} className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
            {multipleBars ? (
              multipleBars.map((bar, index) => (
                <Bar
                  key={bar.key}
                  dataKey={bar.key}
                  name={bar.name}
                  fill={colors[index % colors.length]}
                />
              ))
            ) : (
              <Bar dataKey={dataKey} fill={colors[0]} />
            )}
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

