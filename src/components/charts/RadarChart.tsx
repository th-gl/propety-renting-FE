import { Radar, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RadarChartProps {
  data: Array<Record<string, any>>
  dataKey: string
  title?: string
  height?: number
  colors?: string[]
}

export function RadarChart({
  data,
  dataKey,
  title,
  height = 300,
  colors = ["hsl(var(--chart-1))"],
}: RadarChartProps) {
  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsRadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" className="text-xs" />
            <PolarRadiusAxis />
            <Radar
              name={dataKey}
              dataKey={dataKey}
              stroke={colors[0]}
              fill={colors[0]}
              fillOpacity={0.6}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
          </RechartsRadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

