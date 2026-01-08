import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { ChartThemeProvider } from "@/lib/chart-theme"
import { Signup } from "@/pages/auth/Signup"
import { Login } from "@/pages/auth/Login"
import { ResetPassword } from "@/pages/auth/ResetPassword"

function AppContent() {
  const location = useLocation()
  const isAuthRoute = location.pathname.startsWith("/auth")

  if (isAuthRoute) {
    return (
      <Routes>
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
      </Routes>
    )
  }

  return <DashboardLayout />
}

function App() {
  return (
    <BrowserRouter>
      <ChartThemeProvider>
        <AppContent />
      </ChartThemeProvider>
    </BrowserRouter>
  )
}

export default App
