import { Link } from "react-router-dom"
import { PageContainer } from "@/components/layout/PageContainer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BadgeStatus } from "@/components/common/BadgeStatus"
import { TabsSection } from "@/components/common/TabsSection"
import { DataTable, type Column } from "@/components/common/DataTable"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, DollarSign, Calendar, Eye } from "lucide-react"

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

const contracts = [
  { id: "1", contractNumber: "CNT-001", property: "Building A - Unit 101", startDate: "2024-01-01", endDate: "2024-12-31", monthlyRent: 5000, status: "active" },
  { id: "2", contractNumber: "CNT-002", property: "Building A - Unit 101", startDate: "2023-01-01", endDate: "2023-12-31", monthlyRent: 4500, status: "expired" },
]

const leases = [
  { id: "1", leaseNumber: "LSE-001", property: "Building A - Unit 101", startDate: "2024-01-01", endDate: "2024-12-31", monthlyRent: 5000, status: "active" },
]

export function TenantProfile() {
  const contractColumns: Column<typeof contracts[0]>[] = [
    { key: "contractNumber", header: "Contract #" },
    { key: "property", header: "Property" },
    { key: "startDate", header: "Start Date" },
    { key: "endDate", header: "End Date" },
    { key: "monthlyRent", header: "Monthly Rent", render: (row) => `$${row.monthlyRent.toLocaleString()}` },
    {
      key: "status",
      header: "Status",
      render: (row) => <BadgeStatus status={row.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <Button variant="ghost" size="icon" asChild>
          <Link to={`/contracts/${row.id}`}>
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      ),
    },
  ]

  const leaseColumns: Column<typeof leases[0]>[] = [
    { key: "leaseNumber", header: "Lease #" },
    { key: "property", header: "Property" },
    { key: "startDate", header: "Start Date" },
    { key: "endDate", header: "End Date" },
    { key: "monthlyRent", header: "Monthly Rent", render: (row) => `$${row.monthlyRent.toLocaleString()}` },
    {
      key: "status",
      header: "Status",
      render: (row) => <BadgeStatus status={row.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <Button variant="ghost" size="icon" asChild>
          <Link to={`/leases/${row.id}`}>
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      ),
    },
  ]

  return (
    <PageContainer
      title="Tenant Profile"
      description={`Tenant: ${tenantData.name}`}
      actions={
        <Button asChild>
          <Link to={`/tenants/${tenantData.id}/edit`}>
            Edit Tenant
          </Link>
        </Button>
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
              value: "contracts",
              label: "Contracts",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Contract History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DataTable columns={contractColumns} data={contracts} />
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
                    <DataTable columns={leaseColumns} data={leases} />
                  </CardContent>
                </Card>
              ),
            },
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
