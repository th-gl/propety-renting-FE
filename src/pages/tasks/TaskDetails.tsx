import { useParams, Link } from "react-router-dom"
import { PageContainer } from "@/components/layout/PageContainer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BadgeStatus } from "@/components/common/BadgeStatus"
import { Edit } from "lucide-react"

const taskData = {
  id: "1",
  title: "Follow up on contract renewal",
  description: "Contact tenant for contract renewal discussion. Schedule meeting to discuss terms and conditions.",
  assignedTo: "John Doe",
  status: "pending",
  priority: "high",
  dueDate: "2024-01-20",
  relatedContract: "CNT-001",
  relatedTenant: "John Doe",
  createdAt: "2024-01-15",
  updatedAt: "2024-01-15",
}

export function TaskDetails() {
  const { id } = useParams()

  return (
    <PageContainer
      title="Task Details"
      description={`Task: ${taskData.title}`}
      actions={
        <Button asChild>
          <Link to={`/tasks/${id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Task
          </Link>
        </Button>
      }
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Task Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Title</p>
                <p className="font-medium">{taskData.title}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <BadgeStatus status={taskData.status} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Priority</p>
                <span className={`text-xs px-2 py-1 rounded inline-block ${
                  taskData.priority === "urgent" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" :
                  taskData.priority === "high" ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" :
                  taskData.priority === "medium" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" :
                  "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                }`}>
                  {taskData.priority}
                </span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Assigned To</p>
                <p className="font-medium">{taskData.assignedTo}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Due Date</p>
                <p className="font-medium">{taskData.dueDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created At</p>
                <p className="font-medium">{taskData.createdAt}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Description</p>
              <p>{taskData.description}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Related Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Related Tenant</p>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link to={`/tenants/${taskData.relatedTenant}`}>
                    {taskData.relatedTenant}
                  </Link>
                </Button>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Related Contract</p>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link to={`/contracts/${taskData.relatedContract}`}>
                    {taskData.relatedContract}
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
