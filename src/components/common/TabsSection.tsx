import { ReactNode } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface TabItem {
  value: string
  label: string
  content: ReactNode
}

interface TabsSectionProps {
  tabs: TabItem[]
  defaultValue?: string
  className?: string
}

export function TabsSection({ tabs, defaultValue, className }: TabsSectionProps) {
  return (
    <Tabs defaultValue={defaultValue || tabs[0]?.value} className={cn("w-full", className)}>
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-4">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}

