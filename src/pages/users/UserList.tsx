import { useState } from "react"
import { Link } from "react-router-dom"
import { PageContainer } from "@/components/layout/PageContainer"
import { DataTable, type Column } from "@/components/common/DataTable"
import { FilterBar } from "@/components/common/FilterBar"
import { Button } from "@/components/ui/button"
import { BadgeStatus } from "@/components/common/BadgeStatus"
import { Plus, Edit, Trash2, UserCheck, UserX } from "lucide-react"

const users = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", zone: "Zone A", status: "active", lastLogin: "2024-01-15" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Manager", zone: "Zone B", status: "active", lastLogin: "2024-01-14" },
  { id: "3", name: "Mike Johnson", email: "mike@example.com", role: "Staff", zone: "Zone A", status: "inactive", lastLogin: "2024-01-10" },
  { id: "4", name: "Sarah Williams", email: "sarah@example.com", role: "Manager", zone: "Zone C", status: "active", lastLogin: "2024-01-15" },
]

export function UserList() {
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    const matchesRole = !roleFilter || roleFilter === "all" || user.role === roleFilter
    const matchesStatus = !statusFilter || statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const columns: Column<typeof users[0]>[] = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role" },
    { key: "zone", header: "Zone" },
    {
      key: "status",
      header: "Status",
      render: (row) => <BadgeStatus status={row.status} />,
    },
    { key: "lastLogin", header: "Last Login" },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/users/${row.id}/edit`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/users/${row.id}`}>
              {row.status === "active" ? (
                <UserX className="h-4 w-4" />
              ) : (
                <UserCheck className="h-4 w-4" />
              )}
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
      title="Users"
      description="Manage system users and their permissions"
      actions={
        <Button asChild>
          <Link to="/users/create">
            <Plus className="mr-2 h-4 w-4" />
            Add User
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
              key: "role",
              label: "Role",
              options: [
                { value: "all", label: "All Roles" },
                { value: "Admin", label: "Admin" },
                { value: "Manager", label: "Manager" },
                { value: "Staff", label: "Staff" },
              ],
              value: roleFilter,
              onChange: setRoleFilter,
            },
            {
              key: "status",
              label: "Status",
              options: [
                { value: "all", label: "All Status" },
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ],
              value: statusFilter,
              onChange: setStatusFilter,
            },
          ]}
          onClear={() => {
            setSearch("")
            setRoleFilter("")
            setStatusFilter("")
          }}
        />
        <DataTable columns={columns} data={filteredUsers} />
      </div>
    </PageContainer>
  )
}
