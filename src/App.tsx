import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { ChartThemeProvider } from "@/lib/chart-theme"

function App() {
  return (
    <ChartThemeProvider>
      <DashboardLayout />
    </ChartThemeProvider>
  )
}

export default App
