import { PageContainer } from "@/components/layout/PageContainer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Save } from "lucide-react"

const permissions = [
  { category: "Dashboard", permissions: ["View Dashboard", "Export Reports"] },
  { category: "Users", permissions: ["View Users", "Create Users", "Edit Users", "Delete Users"] },
  { category: "Properties", permissions: ["View Properties", "Create Properties", "Edit Properties", "Delete Properties"] },
  { category: "Contracts", permissions: ["View Contracts", "Create Contracts", "Edit Contracts", "Delete Contracts"] },
  { category: "Finance", permissions: ["View Finance", "Create Payments", "Edit Payments"] },
]

export function RoleDetails() {
  return (
    <PageContainer
      title="Role Details"
      description="Manage permissions for this role"
      actions={
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      }
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Role Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="roleName">Role Name</Label>
              <Input id="roleName" defaultValue="Manager" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Permissions Matrix</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {permissions.map((category) => (
                <div key={category.category}>
                  <h3 className="font-semibold mb-3">{category.category}</h3>
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                    {category.permissions.map((permission) => (
                      <div key={permission} className="flex items-center space-x-2">
                        <Checkbox id={permission} defaultChecked={Math.random() > 0.5} />
                        <Label htmlFor={permission} className="text-sm font-normal">
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
      </div>
    </PageContainer>
  )
}

