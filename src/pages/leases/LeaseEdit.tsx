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

const leaseData = {
  id: "1",
  leaseNumber: "LSE-001",
  tenant: "tenant-1",
  property: "property-1",
  unit: "unit-1",
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  monthlyRent: "5000",
  deposit: "10000",
  indexation: false,
  renewalReminder: "2024-11-01",
  notes: "",
}

export function LeaseEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(leaseData)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate("/leases")
  }

  return (
    <PageContainer
      title="Edit Lease"
      description={`Editing lease: ${formData.leaseNumber}`}
      actions={
        <Button variant="outline" onClick={() => navigate("/leases")}>
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lease Information</CardTitle>
              <CardDescription>Update lease details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="leaseNumber">Lease Number *</Label>
                  <Input
                    id="leaseNumber"
                    value={formData.leaseNumber}
                    onChange={(e) => setFormData({ ...formData, leaseNumber: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tenant">Tenant *</Label>
                  <Select value={formData.tenant} onValueChange={(value) => setFormData({ ...formData, tenant: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tenant-1">John Doe</SelectItem>
                      <SelectItem value="tenant-2">Jane Smith</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lease Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyRent">Monthly Rent *</Label>
                  <Input
                    id="monthlyRent"
                    type="number"
                    value={formData.monthlyRent}
                    onChange={(e) => setFormData({ ...formData, monthlyRent: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deposit">Security Deposit</Label>
                  <Input
                    id="deposit"
                    type="number"
                    value={formData.deposit}
                    onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="renewalReminder">Renewal Reminder Date</Label>
                  <Input
                    id="renewalReminder"
                    type="date"
                    value={formData.renewalReminder}
                    onChange={(e) => setFormData({ ...formData, renewalReminder: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="indexation">Lease Indexation</Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <input
                      type="checkbox"
                      id="indexation"
                      checked={formData.indexation}
                      onChange={(e) => setFormData({ ...formData, indexation: e.target.checked })}
                    />
                    <Label htmlFor="indexation" className="text-sm font-normal">
                      Enable rent indexation
                    </Label>
                  </div>
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
            <Button type="button" variant="outline" onClick={() => navigate("/leases")}>
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
