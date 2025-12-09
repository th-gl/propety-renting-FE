import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pagination } from "@/components/ui/pagination"
import { dataService } from "@/services/dataService"
import type { Zone } from "@/types"

export function Zones() {
  const [zones, setZones] = useState<Zone[]>([])
  const [filteredZones, setFilteredZones] = useState<Zone[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingZone, setEditingZone] = useState<Zone | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [formData, setFormData] = useState({
    name: "",
    nameAr: "",
    managerId: "",
    managerName: "",
    description: "",
  })

  useEffect(() => {
    loadZones()
  }, [])

  useEffect(() => {
    const filtered = zones.filter(
      (zone) =>
        zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        zone.nameAr.includes(searchTerm) ||
        zone.managerName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredZones(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, zones])

  const loadZones = async () => {
    const data = await dataService.getZones()
    setZones(data)
    setFilteredZones(data)
  }

  const handleAdd = () => {
    setEditingZone(null)
    setFormData({
      name: "",
      nameAr: "",
      managerId: "",
      managerName: "",
      description: "",
    })
    setIsDialogOpen(true)
  }

  const handleEdit = (zone: Zone) => {
    setEditingZone(zone)
    setFormData({
      name: zone.name,
      nameAr: zone.nameAr,
      managerId: zone.managerId,
      managerName: zone.managerName,
      description: zone.description || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this zone?")) {
      await dataService.deleteZone(id)
      loadZones()
    }
  }

  const handleSave = async () => {
    const zone: Zone = {
      id: editingZone?.id || `zone-${Date.now()}`,
      ...formData,
      createdAt: editingZone?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    await dataService.saveZone(zone)
    setIsDialogOpen(false)
    loadZones()
  }

  // Pagination calculations
  const totalPages = Math.ceil(filteredZones.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedZones = filteredZones.slice(startIndex, endIndex)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Zones Management</h1>
          <p className="text-muted-foreground">
            Manage geographic zones and their assigned managers
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Zone
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Zones</CardTitle>
              <CardDescription>
                {filteredZones.length} zone{filteredZones.length !== 1 ? "s" : ""} found
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search zones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Zone Name</TableHead>
                <TableHead>Arabic Name</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedZones.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No zones found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedZones.map((zone) => (
                  <TableRow key={zone.id}>
                    <TableCell className="font-medium">{zone.name}</TableCell>
                    <TableCell>{zone.nameAr}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{zone.managerName}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {zone.description || "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(zone)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(zone.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          {filteredZones.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              totalItems={filteredZones.length}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingZone ? "Edit Zone" : "Add New Zone"}
            </DialogTitle>
            <DialogDescription>
              {editingZone
                ? "Update zone information"
                : "Create a new geographic zone"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Zone Name (English)</label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Zone A"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Zone Name (Arabic)</label>
              <Input
                value={formData.nameAr}
                onChange={(e) =>
                  setFormData({ ...formData, nameAr: e.target.value })
                }
                placeholder="المنطقة أ"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Manager Name</label>
              <Input
                value={formData.managerName}
                onChange={(e) =>
                  setFormData({ ...formData, managerName: e.target.value })
                }
                placeholder="Manager name"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Description</label>
              <Input
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Zone description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

