// Centralized chart theme configuration
export interface ChartTheme {
  colors: {
    primary: string
    secondary: string
    tertiary: string
    quaternary: string
    quinary: string
    commercial: string
    residential: string
    success: string
    warning: string
    error: string
    info: string
  }
  // For Highcharts
  highchartsColors: string[]
}

// Default theme - using colors from 3D pie chart
export const defaultChartTheme: ChartTheme = {
  colors: {
    primary: 'hsl(var(--chart-1))',      // 2021 - Blue (for Commercial/Revenue)
    secondary: 'hsl(var(--chart-2))',    // 2023 - Medium Gray (for Residential/Contracts)
    tertiary: 'hsl(var(--chart-3))',     // 2024 - Dark Blue (for third data series)
    quaternary: 'hsl(var(--chart-4))',   // 2020 - Light Gray (for fourth data series)
    quinary: 'hsl(var(--chart-5))',      // 2025 - Very Light Gray/White (for fifth data series)
    commercial: 'hsl(var(--chart-1))',   // Commercial sector - Blue
    residential: 'hsl(var(--chart-2))',   // Residential sector - Medium Gray
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: 'hsl(var(--chart-1))',         // Info - Blue
  },
  highchartsColors: [
    '#C0C0C0',  // 2020 - Light Gray
    '#3498db',  // 2021 - Blue
    '#90a4ae',  // 2023 - Medium Gray
    '#1a2b4c',  // 2024 - Dark Blue
    '#ecf0f1',  // 2025 - Very Light Gray/White
  ],
}

// Alternative themes
export const chartThemes: Record<string, ChartTheme> = {
  default: defaultChartTheme,
  blue: {
    colors: {
      primary: '#3b82f6',
      secondary: '#60a5fa',
      tertiary: '#93c5fd',
      quaternary: '#dbeafe',
      quinary: '#eff6ff',
      commercial: '#3b82f6',
      residential: '#60a5fa',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    highchartsColors: [
      '#3b82f6',
      '#60a5fa',
      '#93c5fd',
      '#1e40af',
      '#dbeafe',
    ],
  },
  green: {
    colors: {
      primary: '#22c55e',
      secondary: '#4ade80',
      tertiary: '#86efac',
      quaternary: '#bbf7d0',
      quinary: '#dcfce7',
      commercial: '#22c55e',
      residential: '#4ade80',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    highchartsColors: [
      '#22c55e',
      '#4ade80',
      '#86efac',
      '#15803d',
      '#dcfce7',
    ],
  },
  purple: {
    colors: {
      primary: '#a855f7',
      secondary: '#c084fc',
      tertiary: '#d8b4fe',
      quaternary: '#e9d5ff',
      quinary: '#f3e8ff',
      commercial: '#a855f7',
      residential: '#c084fc',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    highchartsColors: [
      '#a855f7',
      '#c084fc',
      '#d8b4fe',
      '#7e22ce',
      '#e9d5ff',
    ],
  },
}

// Theme context/hook for managing theme
import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface ChartThemeContextType {
  theme: ChartTheme
  themeName: string
  setTheme: (themeName: string) => void
  availableThemes: string[]
}

const ChartThemeContext = createContext<ChartThemeContextType | undefined>(undefined)

export function ChartThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<string>('default')

  const theme = chartThemes[themeName] || defaultChartTheme

  return (
    <ChartThemeContext.Provider
      value={{
        theme,
        themeName,
        setTheme: (name: string) => {
          if (chartThemes[name]) {
            setThemeName(name)
          }
        },
        availableThemes: Object.keys(chartThemes),
      }}
    >
      {children}
    </ChartThemeContext.Provider>
  )
}

export function useChartTheme() {
  const context = useContext(ChartThemeContext)
  if (!context) {
    // Return default theme if context is not available
    return {
      theme: defaultChartTheme,
      themeName: 'default',
      setTheme: () => {},
      availableThemes: Object.keys(chartThemes),
    }
  }
  return context
}

