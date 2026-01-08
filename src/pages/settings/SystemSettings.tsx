import { PageContainer } from "@/components/layout/PageContainer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TabsSection } from "@/components/common/TabsSection"
import { Textarea } from "@/components/ui/textarea"

export function SystemSettings() {
  return (
    <PageContainer
      title="System Configuration"
      description="Configure system settings and integrations"
    >
      <TabsSection
        tabs={[
          {
            value: "general",
            label: "General",
            content: (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>Basic system configuration</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="language">Default Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="ar">Arabic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateFormat">Date Format</Label>
                        <Select defaultValue="dd/mm/yyyy">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                            <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                            <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button>Save Changes</Button>
                  </CardContent>
                </Card>
              </div>
            ),
          },
          {
            value: "smtp",
            label: "SMTP",
            content: (
              <Card>
                <CardHeader>
                  <CardTitle>SMTP Configuration</CardTitle>
                  <CardDescription>Email server settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="smtpHost">SMTP Host</Label>
                      <Input id="smtpHost" placeholder="smtp.example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpPort">SMTP Port</Label>
                      <Input id="smtpPort" type="number" placeholder="587" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpUser">Username</Label>
                      <Input id="smtpUser" placeholder="user@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpPass">Password</Label>
                      <Input id="smtpPass" type="password" />
                    </div>
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
            ),
          },
          {
            value: "email-templates",
            label: "Email Templates",
            content: (
              <Card>
                <CardHeader>
                  <CardTitle>Email Templates</CardTitle>
                  <CardDescription>Manage email templates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="template">Template</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="welcome">Welcome Email</SelectItem>
                        <SelectItem value="contract">Contract Notification</SelectItem>
                        <SelectItem value="payment">Payment Reminder</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Email subject" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="body">Body</Label>
                    <Textarea id="body" rows={10} placeholder="Email body" />
                  </div>
                  <Button>Save Template</Button>
                </CardContent>
              </Card>
            ),
          },
          {
            value: "oauth",
            label: "OAuth",
            content: (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Google OAuth</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="googleClientId">Client ID</Label>
                      <Input id="googleClientId" placeholder="Google Client ID" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="googleClientSecret">Client Secret</Label>
                      <Input id="googleClientSecret" type="password" placeholder="Google Client Secret" />
                    </div>
                    <Button>Save</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Facebook OAuth</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="facebookAppId">App ID</Label>
                      <Input id="facebookAppId" placeholder="Facebook App ID" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="facebookAppSecret">App Secret</Label>
                      <Input id="facebookAppSecret" type="password" placeholder="Facebook App Secret" />
                    </div>
                    <Button>Save</Button>
                  </CardContent>
                </Card>
              </div>
            ),
          },
          {
            value: "firebase",
            label: "Firebase",
            content: (
              <Card>
                <CardHeader>
                  <CardTitle>Firebase Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="firebaseConfig">Firebase Config JSON</Label>
                    <Textarea id="firebaseConfig" rows={10} placeholder='{"apiKey": "...", ...}' />
                  </div>
                  <Button>Save Configuration</Button>
                </CardContent>
              </Card>
            ),
          },
          {
            value: "language",
            label: "Language",
            content: (
              <Card>
                <CardHeader>
                  <CardTitle>Language Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultLang">Default Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ar">Arabic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>Save</Button>
                </CardContent>
              </Card>
            ),
          },
          {
            value: "terminology",
            label: "Terminology",
            content: (
              <Card>
                <CardHeader>
                  <CardTitle>Real Estate Terminology</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="propertyTerm">Property Term</Label>
                      <Input id="propertyTerm" defaultValue="Property" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tenantTerm">Tenant Term</Label>
                      <Input id="tenantTerm" defaultValue="Tenant" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contractTerm">Contract Term</Label>
                      <Input id="contractTerm" defaultValue="Contract" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="leaseTerm">Lease Term</Label>
                      <Input id="leaseTerm" defaultValue="Lease" />
                    </div>
                  </div>
                  <Button>Save</Button>
                </CardContent>
              </Card>
            ),
          },
          {
            value: "calendar",
            label: "Calendar",
            content: (
              <Card>
                <CardHeader>
                  <CardTitle>Calendar Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="calendarType">Calendar Type</Label>
                    <Select defaultValue="gregorian">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gregorian">Gregorian</SelectItem>
                        <SelectItem value="hijri">Hijri</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>Save</Button>
                </CardContent>
              </Card>
            ),
          },
          {
            value: "visualization",
            label: "Visualization",
            content: (
              <Card>
                <CardHeader>
                  <CardTitle>Color Thresholds</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="greenThreshold">Green Threshold (%)</Label>
                      <Input id="greenThreshold" type="number" defaultValue="80" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="yellowThreshold">Yellow Threshold (%)</Label>
                      <Input id="yellowThreshold" type="number" defaultValue="60" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="redThreshold">Red Threshold (%)</Label>
                      <Input id="redThreshold" type="number" defaultValue="40" />
                    </div>
                  </div>
                  <Button>Save</Button>
                </CardContent>
              </Card>
            ),
          },
        ]}
      />
    </PageContainer>
  )
}

