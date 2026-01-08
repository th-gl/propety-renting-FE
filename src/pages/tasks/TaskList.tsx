import { useState } from "react"
import { Link } from "react-router-dom"
import { PageContainer } from "@/components/layout/PageContainer"
import { DataTable, type Column } from "@/components/common/DataTable"
import { FilterBar } from "@/components/common/FilterBar"
import { Button } from "@/components/ui/button"
import { BadgeStatus } from "@/components/common/BadgeStatus"
import { Plus, Eye, UserPlus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const tasks = [
  { id: "1", title: "Follow up on contract renewal", description: "Contact tenant for contract renewal", assignedTo: "John Doe", status: "pending", priority: "high", dueDate: "2024-01-20", relatedContract: "CNT-001", createdAt: "2024-01-15" },
  { id: "2", title: "Collect overdue payment", description: "Follow up on overdue payment from tenant", assignedTo: "Jane Smith", status: "in_progress", priority: "urgent", dueDate: "2024-01-18", relatedContract: "CNT-002", createdAt: "2024-01-14" },
  { id: "3", title: "Property inspection", description: "Schedule property inspection for Building A", assignedTo: "Mike Johnson", status: "completed", priority: "medium", dueDate: "2024-01-16", relatedContract: "CNT-003", createdAt: "2024-01-13" },
]

export function TaskList() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("")
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = !statusFilter || statusFilter === "all" || task.status === statusFilter
    const matchesPriority = !priorityFilter || priorityFilter === "all" || task.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleAssignTask = (_taskId: string) => {
    setAssignDialogOpen(true)
  }

  const columns: Column<typeof tasks[0]>[] = [
    { key: "title", header: "Title" },
    { key: "description", header: "Description" },
    { key: "assignedTo", header: "Assigned To" },
    {
      key: "status",
      header: "Status",
      render: (row) => <BadgeStatus status={row.status} />,
    },
    { key: "priority", header: "Priority", render: (row) => (
      <span className={`text-xs px-2 py-1 rounded ${
        row.priority === "urgent" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" :
        row.priority === "high" ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" :
        row.priority === "medium" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" :
        "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      }`}>
        {row.priority}
      </span>
    )},
    { key: "dueDate", header: "Due Date" },
    { key: "relatedContract", header: "Related Contract" },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/tasks/${row.id}`}>
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
    <>
      <PageContainer
        title="Tasks"
        description="Manage and track tasks"
        actions={
          <Button asChild>
            <Link to="/tasks/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Task
            </Link>
          </Button>
        }
      >
        <div className="space-y-4">
          <FilterBar
            searchValue={search}
            onSearchChange={setSearch}
            filters={[
              {
                key: "status",
                label: "Status",
                options: [
                  { value: "all", label: "All Status" },
                  { value: "pending", label: "Pending" },
                  { value: "in_progress", label: "In Progress" },
                  { value: "completed", label: "Completed" },
                  { value: "cancelled", label: "Cancelled" },
                ],
                value: statusFilter,
                onChange: setStatusFilter,
              },
              {
                key: "priority",
                label: "Priority",
                options: [
                  { value: "all", label: "All Priorities" },
                  { value: "urgent", label: "Urgent" },
                  { value: "high", label: "High" },
                  { value: "medium", label: "Medium" },
                  { value: "low", label: "Low" },
                ],
                value: priorityFilter,
                onChange: setPriorityFilter,
              },
            ]}
            onClear={() => {
              setSearch("")
              setStatusFilter("")
              setPriorityFilter("")
            }}
          />
          <DataTable columns={columns} data={filteredTasks} />
        </div>
      </PageContainer>

      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
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
            <Button 
              className="w-full" 
              onClick={() => {
                // Handle assignment
                setAssignDialogOpen(false)
              }}
            >
              Assign Task
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
