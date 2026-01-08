import { PageContainer } from "@/components/layout/PageContainer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BadgeStatus } from "@/components/common/BadgeStatus"
import { Progress } from "@/components/ui/progress"
import { TabsSection } from "@/components/common/TabsSection"
import { DataTable, type Column } from "@/components/common/DataTable"
import { Download, Settings } from "lucide-react"

const importData = {
  id: "1",
  fileName: "contracts_2024.xlsx",
  type: "Contracts",
  status: "in_progress",
  progress: 65,
  totalRecords: 150,
  processedRecords: 98,
  successfulRecords: 95,
  failedRecords: 3,
  createdAt: "2024-01-15 10:30:00",
}

const validationErrors = [
  { row: 5, field: "startDate", error: "Invalid date format" },
  { row: 12, field: "monthlyRent", error: "Missing required field" },
  { row: 23, field: "tenantId", error: "Tenant not found" },
]

const importLogs = [
  { timestamp: "2024-01-15 10:30:00", message: "Import started", level: "info" },
  { timestamp: "2024-01-15 10:31:00", message: "Processing records...", level: "info" },
  { timestamp: "2024-01-15 10:32:00", message: "Validation errors found", level: "warning" },
]

export function ImportDetails() {
  const columns: Column<typeof validationErrors[0]>[] = [
    { key: "row", header: "Row" },
    { key: "field", header: "Field" },
    { key: "error", header: "Error" },
  ]

  const logColumns: Column<typeof importLogs[0]>[] = [
    { key: "timestamp", header: "Timestamp" },
    { key: "level", header: "Level" },
    { key: "message", header: "Message" },
  ]

  return (
    <PageContainer
      title="Import Details"
      description={`Import: ${importData.fileName}`}
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            FTP Settings
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Import Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">File Name</p>
                <p className="font-medium">{importData.fileName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <p className="font-medium">{importData.type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <BadgeStatus status={importData.status} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="font-medium">{importData.createdAt}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{importData.progress}%</span>
              </div>
              <Progress value={importData.progress} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Import Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Records</p>
                <p className="text-2xl font-bold">{importData.totalRecords}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Processed</p>
                <p className="text-2xl font-bold">{importData.processedRecords}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Successful</p>
                <p className="text-2xl font-bold text-green-600">{importData.successfulRecords}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold text-red-600">{importData.failedRecords}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <TabsSection
          tabs={[
            {
              value: "preview",
              label: "Preview",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Data Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Preview of imported data will appear here</p>
                  </CardContent>
                </Card>
              ),
            },
            {
              value: "validation",
              label: "Validation Errors",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Validation Errors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DataTable columns={columns} data={validationErrors} />
                  </CardContent>
                </Card>
              ),
            },
            {
              value: "logs",
              label: "Import Logs",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Import Logs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DataTable columns={logColumns} data={importLogs} />
                  </CardContent>
                </Card>
              ),
            },
            {
              value: "settings",
              label: "FTP/API Settings",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>FTP Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">FTP Host</label>
                        <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="ftp.example.com" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">FTP Port</label>
                        <input type="number" className="w-full px-3 py-2 border rounded-md" placeholder="21" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Username</label>
                        <input type="text" className="w-full px-3 py-2 border rounded-md" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Password</label>
                        <input type="password" className="w-full px-3 py-2 border rounded-md" />
                      </div>
                    </div>
                    <Button>Save FTP Settings</Button>
                  </CardContent>
                </Card>
              ),
            },
          ]}
        />
      </div>
    </PageContainer>
  )
}

