import React, { useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useChartTheme } from '@/lib/chart-theme'

// Initialize 3D module
let is3DLoaded = false

const load3DModule = async () => {
  if (is3DLoaded) return
  
  try {
    // Dynamic import for Vite compatibility
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

export function Income3DPieChart() {
  const [isReady, setIsReady] = useState(false)
  const { theme } = useChartTheme()

  useEffect(() => {
    load3DModule().then(() => {
      setIsReady(true)
    })
  }, [])

  const options: Highcharts.Options = {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45, // Tilt angle (matches your image)
        beta: 0
      },
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'inherit'
      }
    },
    title: {
      text: 'رسم بياني لتدخل العام', // "General Income Chart"
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        depth: 45, // Thickness of the 3D pie
        dataLabels: {
          enabled: true,
          format: '<b>{point.y:,.2f}</b><br>{point.name}, {point.percentage:.0f}%',
          distance: 25, // Push labels out
          style: {
            fontSize: '12px',
            color: '#333',
            fontWeight: 'normal'
          },
          connectorColor: '#ccc', // The line connecting label to slice
          connectorWidth: 1
        },
        showInLegend: false
      }
    },
    tooltip: {
      pointFormat: '<b>{point.y:,.2f}</b><br>{point.name}<br>{point.percentage:.1f}%'
    },
    series: [{
      name: 'Income',
      type: 'pie',
      colorByPoint: true,
      data: [
        {
          name: '2020',
          y: 21126250.00,
          sliced: true, // "Explodes" this slice out
          selected: true,
          color: theme.highchartsColors[0]
        },
        {
          name: '2021',
          y: 24883562.00,
          sliced: true,
          color: theme.highchartsColors[1]
        },
        {
          name: '2023', // Note: Image skips 2022
          y: 29115623.51,
          sliced: true,
          color: theme.highchartsColors[2]
        },
        {
          name: '2024',
          y: 28092173.57,
          sliced: true,
          color: theme.highchartsColors[3]
        },
        {
          name: '2025',
          y: 35807247.50,
          sliced: true,
          color: theme.highchartsColors[4]
        }
      ]
    }],
    credits: {
      enabled: false
    }
  }

  if (!isReady) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-muted-foreground">Loading chart...</div>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  )
}

