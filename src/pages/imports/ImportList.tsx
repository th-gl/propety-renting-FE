import { PageContainer } from "@/components/layout/PageContainer"
import { DataTable, type Column } from "@/components/common/DataTable"
import { Button } from "@/components/ui/button"
import { BadgeStatus } from "@/components/common/BadgeStatus"
import { Plus, Download, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const imports = [
  { id: "1", fileName: "contracts_2024.xlsx", type: "Contracts", status: "completed", records: 150, createdAt: "2024-01-15 10:30:00" },
  { id: "2", fileName: "tenants_2024.xlsx", type: "Tenants", status: "in_progress", records: 75, createdAt: "2024-01-15 09:15:00" },
  { id: "3", fileName: "properties_2024.xlsx", type: "Properties", status: "failed", records: 0, createdAt: "2024-01-14 16:45:00" },
]

export function ImportList() {
  const columns: Column<typeof imports[0]>[] = [
    { key: "fileName", header: "File Name" },
    { key: "type", header: "Type" },
    {
      key: "status",
      header: "Status",
      render: (row) => <BadgeStatus status={row.status} />,
    },
    { key: "records", header: "Records" },
    { key: "createdAt", header: "Created" },
    {
      key: "actions",
      header: "Actions",
      render: () => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <PageContainer
      title="Import Management"
      description="Manage data imports"
      actions={
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Import
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Import</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="importType">Import Type</Label>
                <select id="importType" className="w-full px-3 py-2 border rounded-md">
                  <option>Contracts</option>
                  <option>Tenants</option>
                  <option>Properties</option>
                  <option>Payments</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">Upload File</Label>
                <Input id="file" type="file" accept=".xlsx,.xls,.csv" />
              </div>
              <Button className="w-full">Start Import</Button>
            </div>
          </DialogContent>
        </Dialog>
      }
    >
      <DataTable columns={columns} data={imports} />
    </PageContainer>
  )
}

