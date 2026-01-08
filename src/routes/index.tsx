import { Routes, Route, Navigate } from "react-router-dom"

// Dashboard
import { Dashboard } from "@/pages/dashboard/Dashboard"

// User Management
import { UserList } from "@/pages/users/UserList"
import { UserProfile } from "@/pages/users/UserProfile"
import { UserCreate } from "@/pages/users/UserCreate"
import { UserEdit } from "@/pages/users/UserEdit"

// Roles
import { RoleList } from "@/pages/roles/RoleList"
import { RoleDetails } from "@/pages/roles/RoleDetails"
import { RoleCreate } from "@/pages/roles/RoleCreate"

// Activity Logs
import { ActivityLogs } from "@/pages/activity-logs/ActivityLogs"

// Settings
import { SystemSettings } from "@/pages/settings/SystemSettings"

// Notifications
import { Notifications } from "@/pages/notifications/Notifications"

// Alerts
import { Alerts } from "@/pages/alerts/Alerts"

// Imports
import { ImportList } from "@/pages/imports/ImportList"
import { ImportDetails } from "@/pages/imports/ImportDetails"

// Contracts
import { ContractList } from "@/pages/contracts/ContractList"
import { ContractDetails } from "@/pages/contracts/ContractDetails"
import { ContractCreate } from "@/pages/contracts/ContractCreate"
import { ContractEdit } from "@/pages/contracts/ContractEdit"
import { ExpiringContracts } from "@/pages/contracts/ExpiringContracts"

// Tickets
import { TicketList } from "@/pages/tickets/TicketList"
import { TicketDetails } from "@/pages/tickets/TicketDetails"
import { TicketCreate } from "@/pages/tickets/TicketCreate"

// Collections
import { Collections } from "@/pages/collections/Collections"
import { PaymentCreate } from "@/pages/collections/PaymentCreate"

// Properties
import { PropertyList } from "@/pages/properties/PropertyList"
import { PropertyDetails } from "@/pages/properties/PropertyDetails"
import { PropertyCreate } from "@/pages/properties/PropertyCreate"
import { PropertyEdit } from "@/pages/properties/PropertyEdit"
import { UnitCreate } from "@/pages/properties/UnitCreate"

// Maintenance
import { MaintenanceList } from "@/pages/maintenance/MaintenanceList"
import { MaintenanceDetails } from "@/pages/maintenance/MaintenanceDetails"
import { MaintenanceCreate } from "@/pages/maintenance/MaintenanceCreate"

// Tenants
import { TenantList } from "@/pages/tenants/TenantList"
import { TenantProfile } from "@/pages/tenants/TenantProfile"
import { TenantCreate } from "@/pages/tenants/TenantCreate"
import { TenantEdit } from "@/pages/tenants/TenantEdit"

// Leases
import { LeaseList } from "@/pages/leases/LeaseList"
import { LeaseDetails } from "@/pages/leases/LeaseDetails"
import { LeaseCreate } from "@/pages/leases/LeaseCreate"
import { LeaseEdit } from "@/pages/leases/LeaseEdit"

// Assets
import { Assets } from "@/pages/assets/Assets"

// Zones
import { Zones } from "@/pages/zones/Zones"
import { ZoneCreate } from "@/pages/zones/ZoneCreate"
import { ZoneEdit } from "@/pages/zones/ZoneEdit"

// Executive
import { ExecutiveDashboard } from "@/pages/executive/ExecutiveDashboard"

export function AppRoutes() {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* User Management */}
      <Route path="/users" element={<UserList />} />
      <Route path="/users/create" element={<UserCreate />} />
      <Route path="/users/:id" element={<UserProfile />} />
      <Route path="/users/:id/edit" element={<UserEdit />} />

      {/* Roles */}
      <Route path="/roles" element={<RoleList />} />
      <Route path="/roles/create" element={<RoleCreate />} />
      <Route path="/roles/:id" element={<RoleDetails />} />

      {/* Activity Logs */}
      <Route path="/activity-logs" element={<ActivityLogs />} />

      {/* Settings */}
      <Route path="/settings" element={<SystemSettings />} />

      {/* Notifications */}
      <Route path="/notifications" element={<Notifications />} />

      {/* Alerts */}
      <Route path="/alerts" element={<Alerts />} />

      {/* Imports */}
      <Route path="/imports" element={<ImportList />} />
      <Route path="/imports/:id" element={<ImportDetails />} />

      {/* Contracts */}
      <Route path="/contracts" element={<ContractList />} />
      <Route path="/contracts/create" element={<ContractCreate />} />
      <Route path="/contracts/:id" element={<ContractDetails />} />
      <Route path="/contracts/:id/edit" element={<ContractEdit />} />
      <Route path="/contracts/expiring" element={<ExpiringContracts />} />

      {/* Tickets */}
      <Route path="/tickets" element={<TicketList />} />
      <Route path="/tickets/create" element={<TicketCreate />} />
      <Route path="/tickets/:id" element={<TicketDetails />} />

      {/* Collections */}
      <Route path="/collections" element={<Collections />} />
      <Route path="/collections/payment/create" element={<PaymentCreate />} />

      {/* Properties */}
      <Route path="/properties" element={<PropertyList />} />
      <Route path="/properties/create" element={<PropertyCreate />} />
      <Route path="/properties/:id" element={<PropertyDetails />} />
      <Route path="/properties/:id/edit" element={<PropertyEdit />} />
      <Route path="/properties/:id/units/create" element={<UnitCreate />} />

      {/* Maintenance */}
      <Route path="/maintenance" element={<MaintenanceList />} />
      <Route path="/maintenance/create" element={<MaintenanceCreate />} />
      <Route path="/maintenance/:id" element={<MaintenanceDetails />} />

      {/* Tenants */}
      <Route path="/tenants" element={<TenantList />} />
      <Route path="/tenants/create" element={<TenantCreate />} />
      <Route path="/tenants/:id" element={<TenantProfile />} />
      <Route path="/tenants/:id/edit" element={<TenantEdit />} />

      {/* Leases */}
      <Route path="/leases" element={<LeaseList />} />
      <Route path="/leases/create" element={<LeaseCreate />} />
      <Route path="/leases/:id" element={<LeaseDetails />} />
      <Route path="/leases/:id/edit" element={<LeaseEdit />} />

      {/* Assets */}
      <Route path="/assets" element={<Assets />} />

      {/* Zones */}
      <Route path="/zones" element={<Zones />} />
      <Route path="/zones/create" element={<ZoneCreate />} />
      <Route path="/zones/:id/edit" element={<ZoneEdit />} />

      {/* Executive */}
      <Route path="/executive" element={<ExecutiveDashboard />} />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

