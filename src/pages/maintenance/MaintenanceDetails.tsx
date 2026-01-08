import { PageContainer } from "@/components/layout/PageContainer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BadgeStatus } from "@/components/common/BadgeStatus"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Upload, Image as ImageIcon, Video } from "lucide-react"

const maintenanceData = {
  id: "1",
  requestNumber: "MNT-001",
  title: "Leaky faucet in kitchen",
  description: "The kitchen faucet has been leaking for the past week. Water is dripping continuously.",
  property: "Building A - Unit 101",
  type: "reactive",
  status: "pending",
  cost: 150,
  scheduledDate: "2024-01-17",
  slaDeadline: "2024-01-17 10:30:00",
  assignedTo: "Mike Johnson",
  createdAt: "2024-01-15 10:30:00",
}

export function MaintenanceDetails() {
  return (
    <PageContainer
      title="Maintenance Request Details"
      description={`Request: ${maintenanceData.requestNumber}`}
      actions={
        <Button>Update Status</Button>
      }
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Request Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Request Number</p>
                <p className="font-medium">{maintenanceData.requestNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <BadgeStatus status={maintenanceData.status} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Title</p>
                <p className="font-medium">{maintenanceData.title}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <p className="font-medium capitalize">{maintenanceData.type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Property</p>
                <p className="font-medium">{maintenanceData.property}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Assigned To</p>
                <p className="font-medium">{maintenanceData.assignedTo}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Scheduled Date</p>
                <p className="font-medium">{maintenanceData.scheduledDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">SLA Deadline</p>
                <p className="font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {maintenanceData.slaDeadline}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cost</p>
                <p className="font-medium">${maintenanceData.cost}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="text-sm">{maintenanceData.description}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Update Request</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={maintenanceData.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">Cost</Label>
                <Input id="cost" type="number" defaultValue={maintenanceData.cost} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Enter notes..." />
            </div>
            <div className="space-y-2">
              <Label>Upload Images/Videos</Label>
              <div className="flex items-center gap-2">
                <Input type="file" accept="image/*,video/*" multiple />
                <Button variant="outline" size="icon">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button>Update Request</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attachments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <Video className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maintenance Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Generate Maintenance Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Cost History Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}

