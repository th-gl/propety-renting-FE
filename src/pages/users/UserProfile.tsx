import { PageContainer } from "@/components/layout/PageContainer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BadgeStatus } from "@/components/common/BadgeStatus"
import { Edit, Save, X } from "lucide-react"
import { useState } from "react"

const userData = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  role: "Admin",
  zone: "Zone A",
  status: "active",
  createdAt: "2023-01-15",
  lastLogin: "2024-01-15",
}

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(userData)

  return (
    <PageContainer
      title="User Profile"
      description="View and edit user information"
      actions={
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button onClick={() => setIsEditing(false)}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
        </div>
      }
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                ) : (
                  <p className="text-sm">{formData.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                ) : (
                  <p className="text-sm">{formData.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                ) : (
                  <p className="text-sm">{formData.phone}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                {isEditing ? (
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <BadgeStatus status={formData.status} />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Role & Permissions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                {isEditing ? (
                  <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-sm">{formData.role}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="zone">Zone</Label>
                {isEditing ? (
                  <Select value={formData.zone} onValueChange={(value) => setFormData({ ...formData, zone: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Zone A">Zone A</SelectItem>
                      <SelectItem value="Zone B">Zone B</SelectItem>
                      <SelectItem value="Zone C">Zone C</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-sm">{formData.zone}</p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline">Assign Role</Button>
              <Button variant="outline" className="ml-2">Assign Zone</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Created</span>
                <span className="text-sm">{formData.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Last Login</span>
                <span className="text-sm">{formData.lastLogin}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Impersonation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Impersonate this user to view the system from their perspective
            </p>
            <Button variant="outline">Start Impersonation</Button>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}

