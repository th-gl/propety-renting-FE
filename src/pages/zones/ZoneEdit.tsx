import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { PageContainer } from "@/components/layout/PageContainer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Save, X } from "lucide-react"

const zoneData = {
  id: "1",
  name: "Zone A",
  nameAr: "المنطقة أ",
  manager: "manager-1",
  description: "Zone A description",
}

export function ZoneEdit() {
  const { id: _id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(zoneData)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate("/zones")
  }

  return (
    <PageContainer
      title="Edit Zone"
      description={`Editing zone: ${formData.name}`}
      actions={
        <Button variant="outline" onClick={() => navigate("/zones")}>
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Zone Information</CardTitle>
              <CardDescription>Update zone details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Zone Name (English) *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nameAr">Zone Name (Arabic)</Label>
                  <Input
                    id="nameAr"
                    value={formData.nameAr}
                    onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manager">Zone Manager *</Label>
                  <Select value={formData.manager} onValueChange={(value) => setFormData({ ...formData, manager: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manager-1">Ahmed Al-Swaiket</SelectItem>
                      <SelectItem value="manager-2">Mohammed Al-Swaiket</SelectItem>
                      <SelectItem value="manager-3">Fahad Al-Swaiket</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => navigate("/zones")}>
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
