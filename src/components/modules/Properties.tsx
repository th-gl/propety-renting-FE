import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Search, Building2 } from "lucide-react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Pagination } from "@/components/ui/pagination"
import { dataService } from "@/services/dataService"
import type { Property } from "@/types"

export function Properties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [zones, setZones] = useState<Array<{ id: string; name: string }>>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterZone, setFilterZone] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [formData, setFormData] = useState({
    name: "",
    nameAr: "",
    zoneId: "",
    zoneName: "",
    address: "",
    propertyType: "residential" as "residential" | "commercial" | "mixed",
    totalUnits: 0,
    occupiedUnits: 0,
    buildingManagerName: "",
    licenseExpiry: "",
  })

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    let filtered = properties

    if (searchTerm) {
      filtered = filtered.filter(
        (prop) =>
          prop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prop.nameAr.includes(searchTerm) ||
          prop.address.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterZone !== "all") {
      filtered = filtered.filter((prop) => prop.zoneId === filterZone)
    }

    setFilteredProperties(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, filterZone, properties])

  const loadData = async () => {
    const [propertiesData, zonesData] = await Promise.all([
      dataService.getProperties(),
      dataService.getZones(),
    ])
    setProperties(propertiesData)
    setFilteredProperties(propertiesData)
    setZones(zonesData.map((z) => ({ id: z.id, name: z.name })))
  }

  const handleAdd = () => {
    setEditingProperty(null)
    setFormData({
      name: "",
      nameAr: "",
      zoneId: "",
      zoneName: "",
      address: "",
      propertyType: "residential",
      totalUnits: 0,
      occupiedUnits: 0,
      buildingManagerName: "",
      licenseExpiry: "",
    })
    setIsDialogOpen(true)
  }

  const handleEdit = (property: Property) => {
    setEditingProperty(property)
    setFormData({
      name: property.name,
      nameAr: property.nameAr,
      zoneId: property.zoneId,
      zoneName: property.zoneName,
      address: property.address,
      propertyType: property.propertyType,
      totalUnits: property.totalUnits,
      occupiedUnits: property.occupiedUnits,
      buildingManagerName: property.buildingManagerName || "",
      licenseExpiry: property.licenseExpiry || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this property?")) {
      await dataService.deleteProperty(id)
      loadData()
    }
  }

  const handleSave = async () => {
    const selectedZone = zones.find((z) => z.id === formData.zoneId)
    const property: Property = {
      id: editingProperty?.id || `prop-${Date.now()}`,
      ...formData,
      zoneName: selectedZone?.name || "",
      buildingManagerId: editingProperty?.buildingManagerId || `bm-${Date.now()}`,
      createdAt: editingProperty?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    await dataService.saveProperty(property)
    setIsDialogOpen(false)
    loadData()
  }

  const occupancyRate = (occupied: number, total: number) => {
    if (total === 0) return 0
    return Math.round((occupied / total) * 100)
  }

  // Pagination calculations
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProperties = filteredProperties.slice(startIndex, endIndex)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
          <p className="text-muted-foreground">
            Manage properties, units, and building information
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Property
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{properties.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Units</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {properties.reduce((sum, p) => sum + p.totalUnits, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupied Units</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {properties.reduce((sum, p) => sum + p.occupiedUnits, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {occupancyRate(
                properties.reduce((sum, p) => sum + p.occupiedUnits, 0),
                properties.reduce((sum, p) => sum + p.totalUnits, 0)
              )}
              %
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Properties</CardTitle>
              <CardDescription>
                {filteredProperties.length} propert{filteredProperties.length !== 1 ? "ies" : "y"} found
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={filterZone} onValueChange={setFilterZone}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Zones</SelectItem>
                  {zones.map((zone) => (
                    <SelectItem key={zone.id} value={zone.id}>
                      {zone.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property Name</TableHead>
                <TableHead>Zone</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Units</TableHead>
                <TableHead>Occupancy</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProperties.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No properties found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedProperties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{property.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {property.nameAr}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{property.zoneName}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          property.propertyType === "commercial"
                            ? "default"
                            : property.propertyType === "residential"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {property.propertyType}
                      </Badge>
                    </TableCell>
                    <TableCell>{property.totalUnits}</TableCell>
                    <TableCell>
                      {property.occupiedUnits} / {property.totalUnits} (
                      {occupancyRate(property.occupiedUnits, property.totalUnits)}%)
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {property.buildingManagerName || "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(property)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(property.id)}
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
          {filteredProperties.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              totalItems={filteredProperties.length}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingProperty ? "Edit Property" : "Add New Property"}
            </DialogTitle>
            <DialogDescription>
              {editingProperty
                ? "Update property information"
                : "Add a new property to the system"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Property Name (English)</label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Al-Noor Tower"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Property Name (Arabic)</label>
                <Input
                  value={formData.nameAr}
                  onChange={(e) =>
                    setFormData({ ...formData, nameAr: e.target.value })
                  }
                  placeholder="برج النور"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Zone</label>
                <Select
                  value={formData.zoneId}
                  onValueChange={(value) => {
                    const zone = zones.find((z) => z.id === value)
                    setFormData({
                      ...formData,
                      zoneId: value,
                      zoneName: zone?.name || "",
                    })
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {zones.map((zone) => (
                      <SelectItem key={zone.id} value={zone.id}>
                        {zone.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Property Type</label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value: "residential" | "commercial" | "mixed") =>
                    setFormData({ ...formData, propertyType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Address</label>
              <Input
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="King Fahd Road, Riyadh"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Total Units</label>
                <Input
                  type="number"
                  value={formData.totalUnits}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      totalUnits: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Occupied Units</label>
                <Input
                  type="number"
                  value={formData.occupiedUnits}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      occupiedUnits: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">License Expiry</label>
                <Input
                  type="date"
                  value={formData.licenseExpiry}
                  onChange={(e) =>
                    setFormData({ ...formData, licenseExpiry: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Building Manager</label>
              <Input
                value={formData.buildingManagerName}
                onChange={(e) =>
                  setFormData({ ...formData, buildingManagerName: e.target.value })
                }
                placeholder="Building manager name"
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

