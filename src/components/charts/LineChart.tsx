import { Line, LineChart as RechartsLineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LineChartProps {
  data: Array<Record<string, any>>
  dataKey: string
  xAxisKey: string
  title?: string
  height?: number
  colors?: string[]
  multipleLines?: Array<{ key: string; name: string }>
}

export function LineChart({
  data,
  dataKey,
  xAxisKey,
  title,
  height = 300,
  colors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))"],
  multipleLines,
}: LineChartProps) {
  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsLineChart data={data}>
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
            {multipleLines ? (
              multipleLines.map((line, index) => (
                <Line
                  key={line.key}
                  type="monotone"
                  dataKey={line.key}
                  name={line.name}
                  stroke={colors[index % colors.length]}
                />
              ))
            ) : (
              <Line type="monotone" dataKey={dataKey} stroke={colors[0]} />
            )}
          </RechartsLineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

