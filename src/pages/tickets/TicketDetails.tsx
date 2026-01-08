import { PageContainer } from "@/components/layout/PageContainer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BadgeStatus } from "@/components/common/BadgeStatus"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { User, Clock, Upload } from "lucide-react"

const ticketData = {
  id: "1",
  ticketNumber: "TKT-001",
  title: "Leaky faucet in kitchen",
  description: "The kitchen faucet has been leaking for the past week. Water is dripping continuously.",
  tenant: "John Doe",
  property: "Building A - Unit 101",
  status: "open",
  priority: "medium",
  assignedTo: "Mike Johnson",
  createdAt: "2024-01-15 10:30:00",
  slaDeadline: "2024-01-17 10:30:00",
}

export function TicketDetails() {
  return (
    <PageContainer
      title="Ticket Details"
      description={`Ticket: ${ticketData.ticketNumber}`}
      actions={
        <div className="flex gap-2">
          <Button variant="outline">Reassign</Button>
          <Button>Update Status</Button>
        </div>
      }
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Ticket Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Ticket Number</p>
                <p className="font-medium">{ticketData.ticketNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <BadgeStatus status={ticketData.status} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Title</p>
                <p className="font-medium">{ticketData.title}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Priority</p>
                <p className="font-medium capitalize">{ticketData.priority}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tenant</p>
                <p className="font-medium">{ticketData.tenant}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Property</p>
                <p className="font-medium">{ticketData.property}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Assigned To</p>
                <p className="font-medium">{ticketData.assignedTo}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">SLA Deadline</p>
                <p className="font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {ticketData.slaDeadline}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="text-sm">{ticketData.description}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Update Ticket</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={ticketData.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignTo">Assign To</Label>
                <Select defaultValue={ticketData.assignedTo}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mike">Mike Johnson</SelectItem>
                    <SelectItem value="sarah">Sarah Williams</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment">Add Comment</Label>
              <Textarea id="comment" placeholder="Enter comment..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="attachments">Attachments</Label>
              <div className="flex items-center gap-2">
                <Input id="attachments" type="file" multiple />
                <Button variant="outline" size="icon">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button>Update Ticket</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ticket Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Generate Ticket Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                SLA Performance Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}

