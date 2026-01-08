import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { PageContainer } from "@/components/layout/PageContainer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Save, X, Upload } from "lucide-react"

const propertyData = {
  id: "1",
  name: "Building A",
  nameAr: "المبنى أ",
  address: "123 Main St, City",
  zone: "zone-a",
  propertyType: "residential",
  totalUnits: "50",
  buildingManager: "manager-1",
  licenseExpiry: "2025-12-31",
  status: "active",
  notes: "",
}

export function PropertyEdit() {
  const { id: _id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(propertyData)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate("/properties")
  }

  return (
    <PageContainer
      title="Edit Property"
      description={`Editing property: ${formData.name}`}
      actions={
        <Button variant="outline" onClick={() => navigate("/properties")}>
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Information</CardTitle>
              <CardDescription>Update property details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Property Name (English) *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nameAr">Property Name (Arabic)</Label>
                  <Input
                    id="nameAr"
                    value={formData.nameAr}
                    onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={2}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zone">Zone *</Label>
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
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type *</Label>
                  <Select value={formData.propertyType} onValueChange={(value) => setFormData({ ...formData, propertyType: value })}>
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
                <div className="space-y-2">
                  <Label htmlFor="totalUnits">Total Units *</Label>
                  <Input
                    id="totalUnits"
                    type="number"
                    value={formData.totalUnits}
                    onChange={(e) => setFormData({ ...formData, totalUnits: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buildingManager">Building Manager</Label>
                  <Select value={formData.buildingManager} onValueChange={(value) => setFormData({ ...formData, buildingManager: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manager-1">Ahmed Al-Swaiket</SelectItem>
                      <SelectItem value="manager-2">Mohammed Al-Swaiket</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseExpiry">License Expiry Date</Label>
                  <Input
                    id="licenseExpiry"
                    type="date"
                    value={formData.licenseExpiry}
                    onChange={(e) => setFormData({ ...formData, licenseExpiry: e.target.value })}
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
              <CardTitle>Property Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="images">Upload Images</Label>
                <div className="flex items-center gap-2">
                  <Input id="images" type="file" accept="image/*" multiple />
                  <Button type="button" variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => navigate("/properties")}>
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
