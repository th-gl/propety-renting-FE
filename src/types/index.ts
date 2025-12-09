// Type definitions for the property management system

export interface Zone {
  id: string
  name: string
  nameAr: string
  managerId: string
  managerName: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface ZoneManager {
  id: string
  name: string
  nameAr: string
  email: string
  phone: string
  zoneIds: string[]
  role: 'zone_manager' | 'building_manager' | 'staff'
  createdAt: string
}

export interface Property {
  id: string
  name: string
  nameAr: string
  zoneId: string
  zoneName: string
  address: string
  propertyType: 'residential' | 'commercial' | 'mixed'
  totalUnits: number
  occupiedUnits: number
  buildingManagerId?: string
  buildingManagerName?: string
  licenseExpiry?: string
  createdAt: string
  updatedAt: string
}

export interface Unit {
  id: string
  propertyId: string
  propertyName: string
  unitNumber: string
  unitType: 'residential' | 'commercial'
  area: number // in square meters
  bedrooms?: number
  status: 'occupied' | 'vacant' | 'maintenance'
  currentTenantId?: string
  monthlyRent: number
  createdAt: string
}

export interface Tenant {
  id: string
  name: string
  nameAr: string
  email: string
  phone: string
  idNumber: string
  unitId: string
  unitNumber: string
  propertyId: string
  propertyName: string
  category: 'regular' | 'family_member' | 'mall_tenant'
  status: 'active' | 'inactive' | 'overdue'
  createdAt: string
  updatedAt: string
}

export interface Contract {
  id: string
  tenantId: string
  tenantName: string
  unitId: string
  propertyId: string
  zoneId: string
  contractNumber: string
  startDate: string
  endDate: string
  monthlyRent: number
  totalContractValue: number
  category: 'residential' | 'commercial'
  status: 'active' | 'expired' | 'terminated'
  signedDate: string
  createdAt: string
}

export interface Payment {
  id: string
  contractId: string
  tenantId: string
  tenantName: string
  amount: number
  dueDate: string
  paidDate?: string
  status: 'pending' | 'paid' | 'overdue' | 'partial'
  paymentMethod?: string
  referenceNumber?: string
  daysOverdue?: number
  createdAt: string
  updatedAt: string
}

export interface Maintenance {
  id: string
  propertyId: string
  propertyName: string
  unitId?: string
  unitNumber?: string
  title: string
  description: string
  type: 'preventive' | 'reactive' | 'emergency'
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  cost: number
  scheduledDate?: string
  completedDate?: string
  assignedTo?: string
  createdAt: string
  updatedAt: string
}

export interface Expense {
  id: string
  propertyId: string
  propertyName: string
  category: 'maintenance' | 'utilities' | 'insurance' | 'taxes' | 'other'
  description: string
  amount: number
  date: string
  costCenter: string
  createdAt: string
}

export interface CollectionAction {
  id: string
  paymentId: string
  tenantId: string
  tenantName: string
  actionType: 'phone_call' | 'email' | 'court_case' | 'meeting' | 'other'
  description: string
  date: string
  outcome?: string
  nextActionDate?: string
  createdAt: string
}

export interface CourtCase {
  id: string
  tenantId: string
  tenantName: string
  contractId: string
  caseNumber: string
  status: 'raised' | 'in_progress' | 'won' | 'lost' | 'settled'
  raisedDate: string
  courtDate?: string
  outcome?: string
  paymentSchedule?: string
  amount: number
  createdAt: string
  updatedAt: string
}

export interface DashboardData {
  totalRevenue: number
  pendingRent: number
  activeContracts: number
  maintenanceCosts: number
  overduePayments: number
  occupancyRate: number
  collectionRate: number
}

export interface OverduePayment {
  id: string
  branch: string
  rowNumber: number
  tenantName: string
  tenantNameAr: string
  dueDate: string
  dueDateHijri: string
  daysDelayed: number
  amountDue: number
  status: 'scheduling' | 'scheduling_termination' | 'terminated' | 'court_case' | 'evicted' | 'active'
  notes: string
}

