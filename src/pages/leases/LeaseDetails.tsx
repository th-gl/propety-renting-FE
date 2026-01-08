import { PageContainer } from "@/components/layout/PageContainer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BadgeStatus } from "@/components/common/BadgeStatus"
import { Calendar } from "lucide-react"

const leaseData = {
  id: "1",
  leaseNumber: "LSE-001",
  tenant: "John Doe",
  property: "Building A - Unit 101",
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  monthlyRent: 5000,
  totalValue: 60000,
  deposit: 10000,
  status: "active",
  renewalReminder: "2024-11-01",
}

export function LeaseDetails() {
  return (
    <PageContainer
      title="Lease Details"
      description={`Lease: ${leaseData.leaseNumber}`}
      actions={
        <Button>Edit Lease</Button>
      }
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Lease Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Lease Number</p>
                <p className="font-medium">{leaseData.leaseNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <BadgeStatus status={leaseData.status} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tenant</p>
                <p className="font-medium">{leaseData.tenant}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Property</p>
                <p className="font-medium">{leaseData.property}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="font-medium">{leaseData.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">End Date</p>
                <p className="font-medium">{leaseData.endDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Rent</p>
                <p className="font-medium">${leaseData.monthlyRent.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="font-medium">${leaseData.totalValue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Deposit</p>
                <p className="font-medium">${leaseData.deposit.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Renewal Reminder</p>
                <p className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {leaseData.renewalReminder}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}

