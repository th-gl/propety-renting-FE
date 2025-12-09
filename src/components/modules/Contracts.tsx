import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Search, FileText } from "lucide-react"
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
import type { Contract, Tenant, Property } from "@/types"

export function Contracts() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [filteredContracts, setFilteredContracts] = useState<Contract[]>([])
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [properties, setProperties] = useState<Property[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingContract, setEditingContract] = useState<Contract | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [formData, setFormData] = useState({
    tenantId: "",
    tenantName: "",
    unitId: "",
    propertyId: "",
    zoneId: "",
    contractNumber: "",
    startDate: "",
    endDate: "",
    monthlyRent: 0,
    totalContractValue: 0,
    category: "residential" as "residential" | "commercial",
    status: "active" as "active" | "expired" | "terminated",
  })

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    let filtered = contracts

    if (searchTerm) {
      filtered = filtered.filter(
        (contract) =>
          contract.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contract.tenantName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter((c) => c.category === filterCategory)
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((c) => c.status === filterStatus)
    }

    setFilteredContracts(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, filterCategory, filterStatus, contracts])

  const loadData = async () => {
    const [contractsData, tenantsData, propertiesData] = await Promise.all([
      dataService.getContracts(),
      dataService.getTenants(),
      dataService.getProperties(),
    ])
    setContracts(contractsData)
    setFilteredContracts(contractsData)
    setTenants(tenantsData)
    setProperties(propertiesData)
  }

  const handleAdd = () => {
    setEditingContract(null)
    setFormData({
      tenantId: "",
      tenantName: "",
      unitId: "",
      propertyId: "",
      zoneId: "",
      contractNumber: "",
      startDate: "",
      endDate: "",
      monthlyRent: 0,
      totalContractValue: 0,
      category: "residential",
      status: "active",
    })
    setIsDialogOpen(true)
  }

  const handleEdit = (contract: Contract) => {
    setEditingContract(contract)
    setFormData({
      tenantId: contract.tenantId,
      tenantName: contract.tenantName,
      unitId: contract.unitId,
      propertyId: contract.propertyId,
      zoneId: contract.zoneId,
      contractNumber: contract.contractNumber,
      startDate: contract.startDate,
      endDate: contract.endDate,
      monthlyRent: contract.monthlyRent,
      totalContractValue: contract.totalContractValue,
      category: contract.category,
      status: contract.status,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this contract?")) {
      await dataService.deleteContract(id)
      loadData()
    }
  }

  const handleSave = async () => {
    const contract: Contract = {
      id: editingContract?.id || `contract-${Date.now()}`,
      ...formData,
      signedDate: editingContract?.signedDate || new Date().toISOString().split("T")[0],
      createdAt: editingContract?.createdAt || new Date().toISOString(),
    }
    await dataService.saveContract(contract)
    setIsDialogOpen(false)
    loadData()
  }

  const totalContractValue = contracts.reduce((sum, c) => sum + c.totalContractValue, 0)
  const activeContracts = contracts.filter((c) => c.status === "active").length
  const commercialContracts = contracts.filter((c) => c.category === "commercial").length
  const residentialContracts = contracts.filter((c) => c.category === "residential").length

  // Pagination calculations
  const totalPages = Math.ceil(filteredContracts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedContracts = filteredContracts.slice(startIndex, endIndex)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contracts</h1>
          <p className="text-muted-foreground">
            Manage tenant contracts and agreements
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Contract
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contracts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contracts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeContracts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(totalContractValue / 1000000).toFixed(1)}M
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commercial / Residential</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {commercialContracts} / {residentialContracts}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Contracts</CardTitle>
              <CardDescription>
                {filteredContracts.length} contract{filteredContracts.length !== 1 ? "s" : ""} found
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="terminated">Terminated</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contracts..."
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
                <TableHead>Contract #</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Monthly Rent</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedContracts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-muted-foreground">
                    No contracts found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedContracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell className="font-medium">
                      {contract.contractNumber}
                    </TableCell>
                    <TableCell>{contract.tenantName}</TableCell>
                    <TableCell>
                      <Badge
                        variant={contract.category === "commercial" ? "default" : "secondary"}
                      >
                        {contract.category}
                      </Badge>
                    </TableCell>
                    <TableCell>${contract.monthlyRent.toLocaleString()}</TableCell>
                    <TableCell>${contract.totalContractValue.toLocaleString()}</TableCell>
                    <TableCell>{contract.startDate}</TableCell>
                    <TableCell>{contract.endDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          contract.status === "active"
                            ? "default"
                            : contract.status === "expired"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {contract.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(contract)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(contract.id)}
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
          {filteredContracts.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              totalItems={filteredContracts.length}
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
              {editingContract ? "Edit Contract" : "Add New Contract"}
            </DialogTitle>
            <DialogDescription>
              {editingContract
                ? "Update contract information"
                : "Create a new tenant contract"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Contract Number</label>
                <Input
                  value={formData.contractNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, contractNumber: e.target.value })
                  }
                  placeholder="CNT-2024-001"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Tenant</label>
                <Select
                  value={formData.tenantId}
                  onValueChange={(value) => {
                    const tenant = tenants.find((t) => t.id === value)
                    setFormData({
                      ...formData,
                      tenantId: value,
                      tenantName: tenant?.name || "",
                      propertyId: tenant?.propertyId || "",
                      zoneId: tenant?.propertyId ? properties.find((p) => p.id === tenant.propertyId)?.zoneId || "" : "",
                    })
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tenant" />
                  </SelectTrigger>
                  <SelectContent>
                    {tenants.map((tenant) => (
                      <SelectItem key={tenant.id} value={tenant.id}>
                        {tenant.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={formData.category}
                  onValueChange={(value: "residential" | "commercial") =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "active" | "expired" | "terminated") =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="terminated">Terminated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Start Date</label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">End Date</label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Monthly Rent</label>
                <Input
                  type="number"
                  value={formData.monthlyRent}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      monthlyRent: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Total Contract Value</label>
                <Input
                  type="number"
                  value={formData.totalContractValue}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      totalContractValue: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
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

