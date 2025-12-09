import { useEffect, useState, useRef } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useChartTheme } from '@/lib/chart-theme'

// Initialize 3D module
let is3DLoaded = false

const load3DModule = async () => {
  if (is3DLoaded) return
  
  try {
    const module = await import('highcharts/highcharts-3d')
    const Highcharts3D = (module as any).default || module
    
    if (typeof Highcharts3D === 'function') {
      Highcharts3D(Highcharts)
      is3DLoaded = true
    }
  } catch (error) {
    console.error('Failed to load Highcharts 3D module:', error)
  }
}

// 5-year revenue & contract count trends data
const chartData = [
  { year: "2020", revenue: 21126250, contracts: 430 },
  { year: "2021", revenue: 24861562, contracts: 483 },
  { year: "2022", revenue: 28092173, contracts: 565 },
  { year: "2023", revenue: 29115623, contracts: 565 },
  { year: "2024", revenue: 29088355, contracts: 662 },
  { year: "2025", revenue: 33807247, contracts: 739 },
]

export function Interactive3DColumnChart() {
  const [isReady, setIsReady] = useState(false)
  const alpha = 0
  const beta = 0
  const depth = 0
  const chartRef = useRef<HighchartsReact.RefObject>(null)
  const { theme } = useChartTheme()

  useEffect(() => {
    load3DModule().then(() => {
      setIsReady(true)
    })
  }, [])

  // Get computed colors for tooltip (Highcharts doesn't support CSS variables)
  const getComputedColors = () => {
    if (typeof window === 'undefined') {
      return {
        background: '#ffffff',
        foreground: '#000000',
        border: '#e5e7eb'
      }
    }
    try {
      // Check if dark mode is active
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches ||
        document.documentElement.classList.contains('dark')
      
      if (isDark) {
        return {
          background: '#1f2937',
          foreground: '#f9fafb',
          border: '#374151'
        }
      } else {
        return {
          background: '#ffffff',
          foreground: '#111827',
          border: '#e5e7eb'
        }
      }
    } catch (e) {
      return {
        background: '#ffffff',
        foreground: '#000000',
        border: '#e5e7eb'
      }
    }
  }

  const colors = getComputedColors()

  const options: Highcharts.Options = {
    chart: {
      type: 'column',
      options3d: {
        enabled: true,
        alpha: alpha,
        beta: beta,
        depth: depth,
        viewDistance: 25
      },
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'inherit'
      }
    },
    title: {
      text: undefined
    },
    subtitle: {
      text: undefined
    },
    xAxis: {
      type: 'category',
      categories: chartData.map(d => d.year),
      labels: {
        style: {
          color: 'var(--foreground)'
        }
      }
    },
    yAxis: [
      {
        title: {
          text: undefined
        },
        labels: {
          formatter: function() {
            const value = typeof this.value === 'number' ? this.value : parseFloat(String(this.value || 0))
            if (value >= 1000000) {
              return `$${(value / 1000000).toFixed(1)}M`
            }
            return value.toString()
          },
          style: {
            color: theme.highchartsColors[0] || theme.colors.primary
          }
        }
      },
      {
        title: {
          text: undefined
        },
        opposite: true,
        labels: {
          style: {
            color: theme.highchartsColors[1] || theme.colors.secondary
          }
        }
      }
    ],
    tooltip: {
      shared: true,
      backgroundColor: colors.background,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 6,
      shadow: false,
      style: {
        color: colors.foreground,
        fontSize: '12px',
        fontFamily: 'inherit'
      },
      headerFormat: '<b style="font-size: 13px;">{point.key}</b><br/>',
      pointFormatter: function() {
        const point = this as any
        const value = point.series.name === 'Revenue' 
          ? `$${point.y.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
          : point.y.toLocaleString(undefined, { maximumFractionDigits: 0 })
        return `<span style="color: ${point.color}">●</span> <b>${point.series.name}:</b> ${value}<br/>`
      }
    },
    legend: {
      enabled: true,
      itemStyle: {
        color: 'var(--foreground)'
      }
    },
    plotOptions: {
      column: {
        depth: 25,
        grouping: true,
        groupZPadding: 10
      }
    },
    series: [
      {
        name: 'Revenue',
        type: 'column',
        data: chartData.map(d => d.revenue),
        color: theme.highchartsColors[0] || theme.colors.primary,
        yAxis: 0
      },
      {
        name: 'Contracts',
        type: 'column',
        data: chartData.map(d => d.contracts),
        color: theme.highchartsColors[1] || theme.colors.secondary,
        yAxis: 1
      }
    ],
    credits: {
      enabled: false
    }
  }

  if (!isReady) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center">
        <div className="text-muted-foreground">Loading chart...</div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <HighchartsReact
        ref={chartRef}
        highcharts={Highcharts}
        options={options}
      />
      {/* <div className="mt-4 space-y-3 px-2">
        <div className="flex items-center gap-4">
          <label className="text-sm text-muted-foreground w-20">Alpha:</label>
          <input
            type="range"
            min="0"
            max="45"
            value={alpha}
            onChange={(e) => {
              const newAlpha = parseFloat(e.target.value)
              setAlpha(newAlpha)
              updateChart(newAlpha, beta, depth)
            }}
            className="flex-1"
          />
          <span className="text-sm font-medium w-8 text-right">{alpha}</span>
        </div>
        <div className="flex items-center gap-4">
          <label className="text-sm text-muted-foreground w-20">Beta:</label>
          <input
            type="range"
            min="0"
            max="45"
            value={beta}
            onChange={(e) => {
              const newBeta = parseFloat(e.target.value)
              setBeta(newBeta)
              updateChart(alpha, newBeta, depth)
            }}
            className="flex-1"
          />
          <span className="text-sm font-medium w-8 text-right">{beta}</span>
        </div>
        <div className="flex items-center gap-4">
          <label className="text-sm text-muted-foreground w-20">Depth:</label>
          <input
            type="range"
            min="20"
            max="100"
            value={depth}
            onChange={(e) => {
              const newDepth = parseFloat(e.target.value)
              setDepth(newDepth)
              updateChart(alpha, beta, newDepth)
            }}
            className="flex-1"
          />
          <span className="text-sm font-medium w-8 text-right">{depth}</span>
        </div>
      </div> */}
    </div>
  )
}
