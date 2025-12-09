import { BrowserRouter } from "react-router-dom"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { ChartThemeProvider } from "@/lib/chart-theme"

function App() {
  return (
    <BrowserRouter>
      <ChartThemeProvider>
        <DashboardLayout />
      </ChartThemeProvider>
    </BrowserRouter>
  )
}

export default App
