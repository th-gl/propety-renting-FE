import { PageContainer } from "@/components/layout/PageContainer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DataTable, type Column } from "@/components/common/DataTable"
import { BadgeStatus } from "@/components/common/BadgeStatus"
import { Bell, Settings } from "lucide-react"

const notifications = [
  { id: "1", message: "New payment received from John Doe", type: "payment", read: false, timestamp: "2024-01-15 10:30:00" },
  { id: "2", message: "Contract renewal reminder for Jane Smith", type: "contract", read: false, timestamp: "2024-01-15 09:15:00" },
  { id: "3", message: "Maintenance request assigned", type: "maintenance", read: true, timestamp: "2024-01-14 16:45:00" },
  { id: "4", message: "New tenant registered", type: "tenant", read: true, timestamp: "2024-01-14 14:20:00" },
]

export function Notifications() {
  const columns: Column<typeof notifications[0]>[] = [
    {
      key: "read",
      header: "Status",
      render: (row) => row.read ? <BadgeStatus status="read" /> : <BadgeStatus status="unread" />,
    },
    { key: "type", header: "Type" },
    { key: "message", header: "Message" },
    { key: "timestamp", header: "Timestamp" },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <Button variant="ghost" size="sm">
          {row.read ? "Mark Unread" : "Mark Read"}
        </Button>
      ),
    },
  ]

  return (
    <PageContainer
      title="Notifications"
      description="Manage your notifications"
      actions={
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      }
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked />
                <span className="text-sm">Email notifications</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked />
                <span className="text-sm">Push notifications</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span className="text-sm">SMS notifications</span>
              </label>
            </div>
            <Button>Save Settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={notifications} />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}

