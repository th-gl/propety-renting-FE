import { type ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon?: React.ComponentType<{ className?: string }>
  description?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
  children?: ReactNode
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
  children,
}: StatCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div className={cn(
            "text-xs mt-1",
            trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
          )}>
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% from last period
          </div>
        )}
        {children}
      </CardContent>
    </Card>
  )
}

