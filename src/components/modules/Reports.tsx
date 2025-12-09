import { useState, useEffect } from "react"
import { FileText, Download, Eye, Search, Calendar } from "lucide-react"
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
import { Pagination } from "@/components/ui/pagination"
import { dataService } from "@/services/dataService"
import type { OverduePayment } from "@/types"
import * as XLSX from "xlsx"

export function Reports() {
  const [overduePayments, setOverduePayments] = useState<OverduePayment[]>([])
  const [filteredPayments, setFilteredPayments] = useState<OverduePayment[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPayment, setSelectedPayment] = useState<OverduePayment | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    const filtered = overduePayments.filter(
      (payment) =>
        payment.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.tenantNameAr.includes(searchTerm) ||
        payment.branch.includes(searchTerm) ||
        payment.status.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredPayments(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, overduePayments])

  const loadData = async () => {
    try {
      const response = await fetch("/data/overduePayments.json")
      if (response.ok) {
        const data = await response.json()
        setOverduePayments(data)
        setFilteredPayments(data)
      } else {
        // Fallback to src/data
        const devResponse = await fetch("/src/data/overduePayments.json")
        if (devResponse.ok) {
          const data = await devResponse.json()
          setOverduePayments(data)
          setFilteredPayments(data)
        }
      }
    } catch (error) {
      console.error("Error loading overdue payments:", error)
    }
  }

  const handleViewDetails = (payment: OverduePayment) => {
    setSelectedPayment(payment)
    setIsModalOpen(true)
  }

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredPayments.map((p) => ({
        "Row #": p.rowNumber,
        Branch: p.branch,
        "Tenant Name (English)": p.tenantName,
        "Tenant Name (Arabic)": p.tenantNameAr,
        "Due Date": p.dueDate,
        "Due Date (Hijri)": p.dueDateHijri,
        "Days Delayed": p.daysDelayed,
        "Amount Due": p.amountDue,
        Status: p.status,
        Notes: p.notes,
      }))
    )

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Overdue Payments")

    // Set column widths
    const colWidths = [
      { wch: 8 }, // Row #
      { wch: 8 }, // Branch
      { wch: 50 }, // Tenant Name (English)
      { wch: 50 }, // Tenant Name (Arabic)
      { wch: 12 }, // Due Date
      { wch: 15 }, // Due Date (Hijri)
      { wch: 12 }, // Days Delayed
      { wch: 15 }, // Amount Due
      { wch: 20 }, // Status
      { wch: 40 }, // Notes
    ]
    worksheet["!cols"] = colWidths

    XLSX.writeFile(workbook, `Overdue_Payments_Report_${new Date().toISOString().split("T")[0]}.xlsx`)
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      scheduling: { label: "Scheduling", variant: "outline" },
      scheduling_termination: { label: "Scheduling & Termination", variant: "secondary" },
      terminated: { label: "Terminated", variant: "destructive" },
      court_case: { label: "Court Case", variant: "destructive" },
      evicted: { label: "Evicted", variant: "destructive" },
      active: { label: "Active", variant: "default" },
    }

    const statusInfo = statusMap[status] || { label: status, variant: "outline" as const }
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
  }

  const totalAmountDue = filteredPayments.reduce((sum, p) => sum + p.amountDue, 0)
  const totalDaysDelayed = filteredPayments.reduce((sum, p) => sum + p.daysDelayed, 0)
  const averageDaysDelayed = filteredPayments.length > 0 ? Math.round(totalDaysDelayed / filteredPayments.length) : 0

  // Pagination calculations
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedPayments = filteredPayments.slice(startIndex, endIndex)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Overdue payments and delayed rent reports
          </p>
        </div>
        <Button onClick={handleExportToExcel}>
          <Download className="mr-2 h-4 w-4" />
          Export to Excel
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredPayments.length}</div>
            <p className="text-xs text-muted-foreground">Overdue payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount Due</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalAmountDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">Outstanding amount</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Days Delayed</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageDaysDelayed}</div>
            <p className="text-xs text-muted-foreground">Days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Overdue Payments Report</CardTitle>
              <CardDescription>
                {filteredPayments.length} record{filteredPayments.length !== 1 ? "s" : ""} found
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Row #</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Tenant Name</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Due Date (Hijri)</TableHead>
                  <TableHead>Days Delayed</TableHead>
                  <TableHead>Amount Due</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedPayments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground">
                      No records found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.rowNumber}</TableCell>
                      <TableCell>{payment.branch}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{payment.tenantName}</div>
                          <div className="text-xs text-muted-foreground">
                            {payment.tenantNameAr}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{payment.dueDate}</TableCell>
                      <TableCell>{payment.dueDateHijri}</TableCell>
                      <TableCell>
                        <span className="font-medium text-red-500">
                          {payment.daysDelayed} days
                        </span>
                      </TableCell>
                      <TableCell className="font-medium">
                        ${payment.amountDue.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(payment)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            {filteredPayments.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                totalItems={filteredPayments.length}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
              />
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>
              Detailed information about the overdue payment
            </DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Row Number</label>
                  <div className="text-sm font-medium">{selectedPayment.rowNumber}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Branch</label>
                  <div className="text-sm font-medium">{selectedPayment.branch}</div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Tenant Name (English)</label>
                <div className="text-sm font-medium mt-1">{selectedPayment.tenantName}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Tenant Name (Arabic)</label>
                <div className="text-sm font-medium mt-1">{selectedPayment.tenantNameAr}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Due Date (Gregorian)</label>
                  <div className="text-sm font-medium">{selectedPayment.dueDate}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Due Date (Hijri)</label>
                  <div className="text-sm font-medium">{selectedPayment.dueDateHijri}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Days Delayed</label>
                  <div className="text-sm font-medium text-red-500">
                    {selectedPayment.daysDelayed} days
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Amount Due</label>
                  <div className="text-sm font-medium">
                    ${selectedPayment.amountDue.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <div className="mt-1">{getStatusBadge(selectedPayment.status)}</div>
              </div>
              {selectedPayment.notes && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Notes</label>
                  <div className="text-sm mt-1">{selectedPayment.notes}</div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

