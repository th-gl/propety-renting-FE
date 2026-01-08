import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { PageContainer } from "@/components/layout/PageContainer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, X } from "lucide-react"

const userData = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  role: "admin",
  zone: "zone-a",
  status: "active",
}

export function UserEdit() {
  const { id: _id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(userData)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    navigate("/users")
  }

  return (
    <PageContainer
      title="Edit User"
      description={`Editing user: ${formData.name}`}
      actions={
        <Button variant="outline" onClick={() => navigate("/users")}>
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update the user's personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Access & Permissions</CardTitle>
              <CardDescription>Update role and zone access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="role">Role *</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                      <SelectItem value="zone_manager">Zone Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zone">Zone</Label>
                  <Select value={formData.zone} onValueChange={(value) => setFormData({ ...formData, zone: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zone-a">Zone A</SelectItem>
                      <SelectItem value="zone-b">Zone B</SelectItem>
                      <SelectItem value="zone-c">Zone C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => navigate("/users")}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </PageContainer>
  )
}
