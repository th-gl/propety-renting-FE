import { PageContainer } from "@/components/layout/PageContainer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TabsSection } from "@/components/common/TabsSection"
import { ImageIcon, Share2, DollarSign } from "lucide-react"

const propertyData = {
  id: "1",
  name: "Building A",
  address: "123 Main St",
  zone: "Zone A",
  totalUnits: 50,
  occupiedUnits: 45,
  emptyUnits: 5,
  daysEmpty: 30,
  priceOverride: false,
  monthlyRent: 5000,
}

export function PropertyDetails() {
  return (
    <PageContainer
      title="Property Details"
      description={`Property: ${propertyData.name}`}
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share Facility
          </Button>
          <Button>Edit Property</Button>
        </div>
      }
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Property Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Property Name</p>
                <p className="font-medium">{propertyData.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">{propertyData.address}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Zone</p>
                <p className="font-medium">{propertyData.zone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Units</p>
                <p className="font-medium">{propertyData.totalUnits}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Occupied Units</p>
                <p className="font-medium">{propertyData.occupiedUnits}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Empty Units</p>
                <p className="font-medium text-red-600">{propertyData.emptyUnits}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Days Empty</p>
                <p className={`font-medium ${propertyData.daysEmpty > 30 ? "text-red-600" : ""}`}>
                  {propertyData.daysEmpty} days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <TabsSection
          tabs={[
            {
              value: "gallery",
              label: "Image Gallery",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="h-5 w-5" />
                      Image Gallery
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>
                    <Button className="mt-4">
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Upload Images
                    </Button>
                  </CardContent>
                </Card>
              ),
            },
            {
              value: "price",
              label: "Price Override",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Price Override
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked={propertyData.priceOverride} />
                        <span className="text-sm">Enable price override</span>
                      </label>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="monthlyRent">Monthly Rent Override</Label>
                      <Input id="monthlyRent" type="number" defaultValue={propertyData.monthlyRent} />
                    </div>
                    <Button>Save Override</Button>
                  </CardContent>
                </Card>
              ),
            },
            {
              value: "partners",
              label: "Outsourcing Partners",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Outsourcing Partners</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Outsourcing partner information will appear here</p>
                  </CardContent>
                </Card>
              ),
            },
          ]}
        />
      </div>
    </PageContainer>
  )
}

