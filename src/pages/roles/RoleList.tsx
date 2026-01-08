import { useState } from "react"
import { Link } from "react-router-dom"
import { PageContainer } from "@/components/layout/PageContainer"
import { DataTable, type Column } from "@/components/common/DataTable"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const roles = [
  { id: "1", name: "Admin", users: 5, permissions: 25, createdAt: "2023-01-15" },
  { id: "2", name: "Manager", users: 12, permissions: 18, createdAt: "2023-01-15" },
  { id: "3", name: "Staff", users: 25, permissions: 10, createdAt: "2023-01-15" },
]

export function RoleList() {
  const columns: Column<typeof roles[0]>[] = [
    { key: "name", header: "Role Name" },
    { key: "users", header: "Users" },
    { key: "permissions", header: "Permissions" },
    { key: "createdAt", header: "Created" },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/roles/${row.id}`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <PageContainer
      title="Roles & Permissions"
      description="Manage user roles and their permissions"
      actions={
        <Button asChild>
          <Link to="/roles/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Role
          </Link>
        </Button>
      }
    >
      <DataTable columns={columns} data={roles} />
    </PageContainer>
  )
}

