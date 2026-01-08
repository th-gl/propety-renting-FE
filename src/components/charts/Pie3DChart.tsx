import { useRef, useEffect, useState } from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Initialize the 3D module
let Highcharts3DInitialized = false

const initialize3D = async () => {
  if (Highcharts3DInitialized || typeof window === "undefined") {
    return
  }

  try {
    const Highcharts3DModule = await import("highcharts/highcharts-3d")
    // Handle different export formats
    const Highcharts3D = (Highcharts3DModule as any).default || Highcharts3DModule
    if (Highcharts3D && typeof Highcharts3D === "function") {
      Highcharts3D(Highcharts)
      Highcharts3DInitialized = true
    } else if ((Highcharts3DModule as any).apply) {
      // Some versions export it differently
      (Highcharts3DModule as any).apply(Highcharts)
      Highcharts3DInitialized = true
    }
  } catch (e) {
    console.warn("Highcharts 3D module could not be loaded:", e)
  }
}

interface Pie3DChartProps {
  data: Array<{ name: string; y: number }>
  title?: string
  height?: number
  colors?: string[]
}

export function Pie3DChart({
  data,
  title,
  height = 300,
  colors = ["#3498db", "#90a4ae", "#1a2b4c", "#C0C0C0", "#ecf0f1"],
}: Pie3DChartProps) {
  const chartRef = useRef<HighchartsReact.RefObject>(null)
  const [is3DInitialized, setIs3DInitialized] = useState(Highcharts3DInitialized)

  useEffect(() => {
    if (!is3DInitialized) {
      initialize3D().then(() => {
        setIs3DInitialized(true)
      })
    }
  }, [is3DInitialized])

  // Ensure data is properly formatted - just name and y values
  const formattedData = data.map((item) => ({
    name: item.name,
    y: item.y,
  }))

  const options: Highcharts.Options = {
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
        depth: 35,
        viewDistance: 25,
      },
      height: height,
      backgroundColor: "transparent",
    },
    title: {
      text: title || "",
      style: {
        color: "hsl(var(--foreground))",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        depth: 35,
        dataLabels: {
          enabled: true,
          format: "{point.name}: {point.percentage:.1f}%",
          style: {
            color: "hsl(var(--foreground))",
          },
        },
        showInLegend: true,
      },
    },
    series: [
      {
        type: "pie",
        name: "Value",
        data: formattedData,
      },
    ],
    colors: colors,
    tooltip: {
      backgroundColor: "hsl(var(--background))",
      borderColor: "hsl(var(--border))",
      style: {
        color: "hsl(var(--foreground))",
      },
      pointFormat: "{point.name}: <b>{point.percentage:.1f}%</b>",
    },
    legend: {
      enabled: true,
      itemStyle: {
        color: "hsl(var(--foreground))",
      },
    },
  }

  // Don't render until 3D is initialized
  if (!is3DInitialized) {
    return (
      <Card>
        {title && (
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
        )}
        <CardContent>
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-sm text-muted-foreground">Loading chart...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef} />
      </CardContent>
    </Card>
  )
}

