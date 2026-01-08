import { PageContainer } from "@/components/layout/PageContainer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BadgeStatus } from "@/components/common/BadgeStatus"
import { TabsSection } from "@/components/common/TabsSection"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, DollarSign, Calendar } from "lucide-react"

const tenantData = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  idNumber: "ID123456",
  property: "Building A - Unit 101",
  category: "regular",
  status: "active",
  kycStatus: "verified",
  deposit: 10000,
}

export function TenantProfile() {
  return (
    <PageContainer
      title="Tenant Profile"
      description={`Tenant: ${tenantData.name}`}
      actions={
        <Button>Edit Tenant</Button>
      }
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{tenantData.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{tenantData.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{tenantData.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ID Number</p>
                <p className="font-medium">{tenantData.idNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Property</p>
                <p className="font-medium">{tenantData.property}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <BadgeStatus status={tenantData.status} />
              </div>
            </div>
          </CardContent>
        </Card>

        <TabsSection
          tabs={[
            {
              value: "kyc",
              label: "KYC",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Know Your Customer (KYC)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">KYC Status</p>
                      <BadgeStatus status={tenantData.kycStatus} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="idDocument">ID Document</Label>
                      <Input id="idDocument" type="file" accept=".pdf,.jpg,.png" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="proofOfAddress">Proof of Address</Label>
                      <Input id="proofOfAddress" type="file" accept=".pdf,.jpg,.png" />
                    </div>
                    <Button>Upload Documents</Button>
                  </CardContent>
                </Card>
              ),
            },
            {
              value: "leases",
              label: "Leases",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Lease History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Lease history will appear here</p>
                  </CardContent>
                </Card>
              ),
            },
            {
              value: "deposit",
              label: "Deposit Tracking",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Deposit Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Deposit</p>
                        <p className="text-2xl font-bold">${tenantData.deposit.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Deposit Status</p>
                        <BadgeStatus status="held" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ),
            },
            {
              value: "renewals",
              label: "Renewal Reminders",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Renewal Reminders
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Renewal reminders will appear here</p>
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

