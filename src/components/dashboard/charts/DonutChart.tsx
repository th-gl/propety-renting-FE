import { useState } from "react"
import { Pie, PieChart, Cell } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { useChartTheme } from "@/lib/chart-theme"

export function DonutChartComponent() {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined)
  const { theme } = useChartTheme()
  
  // Commercial vs Residential data - matching the image
  const chartData = [
    { 
      name: "Commercial", 
      nameAr: "التجاري",
      value: 24551497.5, 
      count: 243, 
      fill: theme.colors.commercial
    },
    { 
      name: "Residential", 
      nameAr: "السكني",
      value: 9255750, 
      count: 44, 
      fill: theme.colors.residential
    },
  ]

  const chartConfig = {
    commercial: {
      label: "Commercial",
      labelAr: "التجاري",
      color: theme.colors.commercial,
    },
    residential: {
      label: "Residential",
      labelAr: "السكني",
      color: theme.colors.residential,
    },
  }

  return (
    <ChartContainer config={chartConfig} className="h-[350px] w-full">
      <PieChart>
        <ChartTooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload
              return (
                <div className="rounded-lg border bg-background p-3 shadow-lg">
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-semibold">{data.name}</span>
                      <span className="text-xs text-muted-foreground">{data.nameAr}</span>
                    </div>
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tenants:</span>
                        <span className="font-medium">{data.count}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-medium">${data.value.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ cx, cy, midAngle, innerRadius, outerRadius, name, value, count }) => {
            const RADIAN = Math.PI / 180
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5
            const x = cx + radius * Math.cos(-midAngle * RADIAN)
            const y = cy + radius * Math.sin(-midAngle * RADIAN)

            return (
              <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                className="text-xs font-semibold"
                style={{
                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))',
                }}
              >
                {`${name}`}
                <tspan x={x} dy="1.2em" className="text-[10px] font-medium">
                  {`${count} / $${(value / 1000000).toFixed(1)}M`}
                </tspan>
              </text>
            )
          }}
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
          activeIndex={activeIndex}
          onMouseEnter={(_, index) => {
            setActiveIndex(index)
          }}
          onMouseLeave={() => {
            setActiveIndex(undefined)
          }}
        >
          {chartData.map((entry, index) => {
            const isActive = activeIndex === index
            return (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.fill}
                stroke={isActive ? entry.fill : "transparent"}
                strokeWidth={isActive ? 4 : 0}
                opacity={isActive ? 1 : 0.9}
                style={{
                  filter: isActive ? 'brightness(1.2) drop-shadow(0 4px 12px rgba(0,0,0,0.25))' : 'brightness(1)',
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  transformOrigin: 'center',
                  transition: 'all 0.2s ease-in-out',
                  cursor: 'pointer',
                }}
              />
            )
          })}
        </Pie>
        <ChartLegend 
          content={<ChartLegendContent />}
          payload={chartData.map((item) => ({
            value: `${item.name} (${item.nameAr})`,
            type: "square",
            id: item.name,
            color: item.fill,
          }))}
        />
      </PieChart>
    </ChartContainer>
  )
}
