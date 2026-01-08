import { useState } from "react"
import { PageContainer } from "@/components/layout/PageContainer"
import { DataTable, type Column } from "@/components/common/DataTable"
import { FilterBar } from "@/components/common/FilterBar"
import { BadgeStatus } from "@/components/common/BadgeStatus"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const logs = [
  { id: "1", user: "John Doe", action: "Created Contract", entity: "Contract #12345", timestamp: "2024-01-15 10:30:00", ip: "192.168.1.1" },
  { id: "2", user: "Jane Smith", action: "Updated Property", entity: "Building A", timestamp: "2024-01-15 09:15:00", ip: "192.168.1.2" },
  { id: "3", user: "Mike Johnson", action: "Deleted User", entity: "User #456", timestamp: "2024-01-14 16:45:00", ip: "192.168.1.3" },
]

export function ActivityLogs() {
  const [search, setSearch] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const columns: Column<typeof logs[0]>[] = [
    { key: "timestamp", header: "Timestamp" },
    { key: "user", header: "User" },
    { key: "action", header: "Action" },
    { key: "entity", header: "Entity" },
    { key: "ip", header: "IP Address" },
  ]

  return (
    <PageContainer
      title="Activity Logs"
      description="View system activity and user actions"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Retention Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="retentionDays">Retention Period (Days)</Label>
                <Input id="retentionDays" type="number" defaultValue="90" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="autoDelete">Auto Delete After Period</Label>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="autoDelete" defaultChecked />
                  <Label htmlFor="autoDelete" className="text-sm font-normal">
                    Enable automatic deletion
                  </Label>
                </div>
              </div>
            </div>
            <Button>Save Settings</Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <FilterBar
            searchValue={search}
            onSearchChange={setSearch}
            filters={[]}
            onClear={() => setSearch("")}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="dateFrom">From Date</Label>
              <Input id="dateFrom" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateTo">To Date</Label>
              <Input id="dateTo" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            </div>
          </div>
          <DataTable columns={columns} data={logs} />
        </div>
      </div>
    </PageContainer>
  )
}

