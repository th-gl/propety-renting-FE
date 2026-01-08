import { ReactNode } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterBarProps {
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  filters?: Array<{
    key: string
    label: string
    options: Array<{ value: string; label: string }>
    value?: string
    onChange?: (value: string) => void
  }>
  actions?: ReactNode
  className?: string
  onClear?: () => void
}

export function FilterBar({
  searchPlaceholder = "Search...",
  searchValue,
  onSearchChange,
  filters = [],
  actions,
  className,
  onClear,
}: FilterBarProps) {
  const hasActiveFilters = searchValue || filters.some((f) => f.value)

  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", className)}>
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="pl-8"
          />
        </div>
        {filters.map((filter) => (
          <Select
            key={filter.key}
            value={filter.value === "" ? "all" : filter.value}
            onValueChange={(value) => {
              // Convert "all" back to empty string for filtering logic
              filter.onChange?.(value === "all" ? "" : value)
            }}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder={filter.label} />
            </SelectTrigger>
            <SelectContent>
              {filter.options.map((option) => {
                // Radix UI Select doesn't allow empty string values
                const safeValue = option.value === "" ? "all" : option.value
                return (
                  <SelectItem key={safeValue} value={safeValue}>
                    {option.label}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        ))}
        {hasActiveFilters && onClear && (
          <Button variant="outline" size="sm" onClick={onClear}>
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}

