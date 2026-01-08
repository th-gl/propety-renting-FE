import { useState } from "react"
import { Link } from "react-router-dom"
import { PageContainer } from "@/components/layout/PageContainer"
import { DataTable, type Column } from "@/components/common/DataTable"
import { FilterBar } from "@/components/common/FilterBar"
import { Button } from "@/components/ui/button"
import { BadgeStatus } from "@/components/common/BadgeStatus"
import { Plus, Eye, Download, Calendar, UserPlus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const contracts = [
  { id: "1", contractNumber: "CNT-001", tenant: "John Doe", property: "Building A - Unit 101", startDate: "2024-01-01", endDate: "2024-12-31", monthlyRent: 5000, status: "active" },
  { id: "2", contractNumber: "CNT-002", tenant: "Jane Smith", property: "Building B - Unit 205", startDate: "2024-02-01", endDate: "2025-01-31", monthlyRent: 7500, status: "active" },
  { id: "3", contractNumber: "CNT-003", tenant: "Mike Johnson", property: "Building C - Unit 310", startDate: "2023-06-01", endDate: "2024-05-31", monthlyRent: 6000, status: "expired" },
]

export function ContractList() {
  const [search, setSearch] = useState("")
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)

  const handleAssignTask = (_contractId: string) => {
    setAssignDialogOpen(true)
  }

  const columns: Column<typeof contracts[0]>[] = [
    { key: "contractNumber", header: "Contract #" },
    { key: "tenant", header: "Tenant" },
    { key: "property", header: "Property" },
    { key: "startDate", header: "Start Date" },
    { key: "endDate", header: "End Date" },
    { key: "monthlyRent", header: "Monthly Rent", render: (row) => `$${row.monthlyRent.toLocaleString()}` },
    {
      key: "status",
      header: "Status",
      render: (row) => <BadgeStatus status={row.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/contracts/${row.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => handleAssignTask(row.id)}
            title="Assign Task"
          >
            <UserPlus className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <PageContainer
      title="Contracts"
      description="Manage property rental contracts"
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Expiring Contracts
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button asChild>
            <Link to="/contracts/create">
              <Plus className="mr-2 h-4 w-4" />
              New Contract
            </Link>
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <FilterBar
          searchValue={search}
          onSearchChange={setSearch}
          onClear={() => setSearch("")}
        />
        <DataTable columns={columns} data={contracts} />
      </div>

      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="taskTitle">Task Title</Label>
              <Input id="taskTitle" placeholder="Enter task title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignTo">Assign To</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user-1">John Doe</SelectItem>
                  <SelectItem value="user-2">Jane Smith</SelectItem>
                  <SelectItem value="user-3">Mike Johnson</SelectItem>
                  <SelectItem value="user-4">Sarah Williams</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              className="w-full" 
              onClick={() => {
                // Handle assignment
                setAssignDialogOpen(false)
              }}
            >
              Create & Assign Task
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageContainer>
  )
}

