import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PageContainer } from "@/components/layout/PageContainer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Save, X } from "lucide-react"

const permissions = [
  { category: "Dashboard", permissions: ["View Dashboard", "Export Reports"] },
  { category: "Users", permissions: ["View Users", "Create Users", "Edit Users", "Delete Users"] },
  { category: "Properties", permissions: ["View Properties", "Create Properties", "Edit Properties", "Delete Properties"] },
  { category: "Contracts", permissions: ["View Contracts", "Create Contracts", "Edit Contracts", "Delete Contracts"] },
  { category: "Finance", permissions: ["View Finance", "Create Payments", "Edit Payments"] },
  { category: "Maintenance", permissions: ["View Maintenance", "Create Maintenance", "Edit Maintenance"] },
  { category: "Tickets", permissions: ["View Tickets", "Create Tickets", "Edit Tickets"] },
  { category: "Reports", permissions: ["View Reports", "Export Reports"] },
]

export function RoleCreate() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })
  const [selectedPermissions, setSelectedPermissions] = useState<Record<string, boolean>>({})

  const handlePermissionChange = (permission: string, checked: boolean) => {
    setSelectedPermissions({ ...selectedPermissions, [permission]: checked })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    navigate("/roles")
  }

  return (
    <PageContainer
      title="Create New Role"
      description="Create a new role with specific permissions"
      actions={
        <Button variant="outline" onClick={() => navigate("/roles")}>
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Role Information</CardTitle>
              <CardDescription>Enter basic role details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Role Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Permissions</CardTitle>
              <CardDescription>Select permissions for this role</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {permissions.map((category) => (
                  <div key={category.category}>
                    <h3 className="font-semibold mb-3">{category.category}</h3>
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                      {category.permissions.map((permission) => (
                        <div key={permission} className="flex items-center space-x-2">
                          <Checkbox
                            id={permission}
                            checked={selectedPermissions[permission] || false}
                            onChange={(e) => handlePermissionChange(permission, e.target.checked)}
                          />
                          <Label htmlFor={permission} className="text-sm font-normal cursor-pointer">
                            {permission}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => navigate("/roles")}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Create Role
            </Button>
          </div>
        </div>
      </form>
    </PageContainer>
  )
}
