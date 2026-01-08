import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PageContainer } from "@/components/layout/PageContainer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Save, X, Upload } from "lucide-react"

export function MaintenanceCreate() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    property: "",
    unit: "",
    type: "reactive",
    priority: "medium",
    scheduledDate: "",
    assignedTo: "",
    status: "pending",
    cost: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate("/maintenance")
  }

  return (
    <PageContainer
      title="Create Maintenance Request"
      description="Create a new maintenance request"
      actions={
        <Button variant="outline" onClick={() => navigate("/maintenance")}>
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Request Information</CardTitle>
              <CardDescription>Enter maintenance request details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="preventive">Preventive</SelectItem>
                      <SelectItem value="reactive">Reactive</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location & Assignment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="property">Property *</Label>
                  <Select value={formData.property} onValueChange={(value) => setFormData({ ...formData, property: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="property-1">Building A</SelectItem>
                      <SelectItem value="property-2">Building B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unit-1">Unit 101</SelectItem>
                      <SelectItem value="unit-2">Unit 205</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignedTo">Assign To</Label>
                  <Select value={formData.assignedTo} onValueChange={(value) => setFormData({ ...formData, assignedTo: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select user" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user-1">Mike Johnson</SelectItem>
                      <SelectItem value="user-2">Sarah Williams</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority *</Label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scheduledDate">Scheduled Date</Label>
                  <Input
                    id="scheduledDate"
                    type="date"
                    value={formData.scheduledDate}
                    onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
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
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost & Attachments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cost">Estimated Cost</Label>
                  <Input
                    id="cost"
                    type="number"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="images">Upload Images/Videos</Label>
                  <div className="flex items-center gap-2">
                    <Input id="images" type="file" accept="image/*,video/*" multiple />
                    <Button type="button" variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => navigate("/maintenance")}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Create Request
            </Button>
          </div>
        </div>
      </form>
    </PageContainer>
  )
}
