import { PageContainer } from "@/components/layout/PageContainer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BadgeStatus } from "@/components/common/BadgeStatus"
import { TabsSection } from "@/components/common/TabsSection"
import { Calendar, FileText, AlertTriangle } from "lucide-react"

const contractData = {
  id: "1",
  contractNumber: "CNT-001",
  tenant: "John Doe",
  property: "Building A - Unit 101",
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  monthlyRent: 5000,
  totalValue: 60000,
  status: "active",
  signedDate: "2023-12-15",
  daysUntilExpiry: 15,
}

export function ContractDetails() {
  return (
    <PageContainer
      title="Contract Details"
      description={`Contract: ${contractData.contractNumber}`}
      actions={
        <div className="flex gap-2">
          <Button variant="outline">Assign Renewal Follow-up</Button>
          <Button>Edit Contract</Button>
        </div>
      }
    >
      <div className="space-y-6">
        {contractData.daysUntilExpiry <= 30 && (
          <Card className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <p className="text-sm font-medium">
                  Contract expiring in {contractData.daysUntilExpiry} days
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Contract Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Contract Number</p>
                <p className="font-medium">{contractData.contractNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <BadgeStatus status={contractData.status} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tenant</p>
                <p className="font-medium">{contractData.tenant}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Property</p>
                <p className="font-medium">{contractData.property}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="font-medium">{contractData.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">End Date</p>
                <p className="font-medium">{contractData.endDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Rent</p>
                <p className="font-medium">${contractData.monthlyRent.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="font-medium">${contractData.totalValue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <TabsSection
          tabs={[
            {
              value: "history",
              label: "5-Year History",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Contract History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Historical contract data will appear here</p>
                  </CardContent>
                </Card>
              ),
            },
            {
              value: "reports",
              label: "Reports",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Contract Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="mr-2 h-4 w-4" />
                        Generate Contract Report
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="mr-2 h-4 w-4" />
                        Expiry Report
                      </Button>
                    </div>
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

