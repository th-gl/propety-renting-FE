import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface BadgeStatusProps {
  status: string
  variant?: "default" | "secondary" | "destructive" | "outline"
  className?: string
}

const statusVariants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; className?: string }> = {
  active: { variant: "default", className: "bg-green-500/10 text-green-700 dark:text-green-400" },
  inactive: { variant: "secondary" },
  pending: { variant: "outline", className: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400" },
  completed: { variant: "default", className: "bg-blue-500/10 text-blue-700 dark:text-blue-400" },
  cancelled: { variant: "destructive" },
  overdue: { variant: "destructive" },
  paid: { variant: "default", className: "bg-green-500/10 text-green-700 dark:text-green-400" },
  expired: { variant: "destructive" },
  terminated: { variant: "destructive" },
  in_progress: { variant: "outline", className: "bg-blue-500/10 text-blue-700 dark:text-blue-400" },
}

export function BadgeStatus({ status, variant, className }: BadgeStatusProps) {
  const statusConfig = statusVariants[status.toLowerCase()] || { variant: "default" }
  const finalVariant = variant || statusConfig.variant

  return (
    <Badge
      variant={finalVariant}
      className={cn(statusConfig.className, className)}
    >
      {status}
    </Badge>
  )
}

