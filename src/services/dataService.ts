// Data service for managing JSON file operations
import type { Zone, Property, Contract, Tenant, Payment, Maintenance, Expense, ZoneManager } from '@/types'

class DataService {
  private async readFile<T>(filename: string): Promise<T[]> {
    try {
      // First, try to load from JSON file (initial data)
      let jsonData: T[] = []
      try {
        const response = await fetch(`/data/${filename}`)
        if (response.ok) {
          jsonData = await response.json()
        }
      } catch {
        // If /data doesn't work, try /src/data (for development)
        try {
          const devResponse = await fetch(`/src/data/${filename}`)
          if (devResponse.ok) {
            jsonData = await devResponse.json()
          }
        } catch {
          console.warn(`Could not fetch ${filename} from file system`)
        }
      }

      // Check localStorage for edited data
      const localData = this.getLocalStorageData<T>(filename)
      
      // If localStorage has data, use it (it's more recent)
      // Otherwise, use JSON file data and initialize localStorage
      if (localData.length > 0) {
        return localData
      } else if (jsonData.length > 0) {
        // Initialize localStorage with JSON data
        localStorage.setItem(`data_${filename}`, JSON.stringify(jsonData))
        return jsonData
      }
      
      return []
    } catch (error) {
      console.error(`Error reading ${filename}:`, error)
      return []
    }
  }

  private async writeFile<T>(filename: string, data: T[]): Promise<boolean> {
    try {
      // In a real app, this would be an API call
      // For now, we'll use localStorage as a fallback
      localStorage.setItem(`data_${filename}`, JSON.stringify(data))
      return true
    } catch (error) {
      console.error(`Error writing ${filename}:`, error)
      return false
    }
  }

  private getLocalStorageData<T>(filename: string): T[] {
    try {
      const stored = localStorage.getItem(`data_${filename}`)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }


  // Zones
  async getZones(): Promise<Zone[]> {
    return this.readFile<Zone>('zones.json')
  }

  async saveZone(zone: Zone): Promise<boolean> {
    const zones = await this.getZones()
    const index = zones.findIndex(z => z.id === zone.id)
    if (index >= 0) {
      zones[index] = { ...zone, updatedAt: new Date().toISOString() }
    } else {
      zones.push({ ...zone, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
    }
    return this.writeFile('zones.json', zones)
  }

  async deleteZone(id: string): Promise<boolean> {
    const zones = await this.getZones()
    const filtered = zones.filter(z => z.id !== id)
    return this.writeFile('zones.json', filtered)
  }

  // Properties
  async getProperties(): Promise<Property[]> {
    return this.readFile<Property>('properties.json')
  }

  async getPropertiesByZone(zoneId: string): Promise<Property[]> {
    const properties = await this.getProperties()
    return properties.filter(p => p.zoneId === zoneId)
  }

  async saveProperty(property: Property): Promise<boolean> {
    const properties = await this.getProperties()
    const index = properties.findIndex(p => p.id === property.id)
    if (index >= 0) {
      properties[index] = { ...property, updatedAt: new Date().toISOString() }
    } else {
      properties.push({ ...property, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
    }
    return this.writeFile('properties.json', properties)
  }

  async deleteProperty(id: string): Promise<boolean> {
    const properties = await this.getProperties()
    const filtered = properties.filter(p => p.id !== id)
    return this.writeFile('properties.json', filtered)
  }

  // Contracts
  async getContracts(): Promise<Contract[]> {
    return this.readFile<Contract>('contracts.json')
  }

  async getContractsByZone(zoneId: string): Promise<Contract[]> {
    const contracts = await this.getContracts()
    return contracts.filter(c => c.zoneId === zoneId)
  }

  async saveContract(contract: Contract): Promise<boolean> {
    const contracts = await this.getContracts()
    const index = contracts.findIndex(c => c.id === contract.id)
    if (index >= 0) {
      contracts[index] = contract
    } else {
      contracts.push({ ...contract, createdAt: new Date().toISOString() })
    }
    return this.writeFile('contracts.json', contracts)
  }

  async deleteContract(id: string): Promise<boolean> {
    const contracts = await this.getContracts()
    const filtered = contracts.filter(c => c.id !== id)
    return this.writeFile('contracts.json', filtered)
  }

  // Tenants
  async getTenants(): Promise<Tenant[]> {
    return this.readFile<Tenant>('tenants.json')
  }

  async saveTenant(tenant: Tenant): Promise<boolean> {
    const tenants = await this.getTenants()
    const index = tenants.findIndex(t => t.id === tenant.id)
    if (index >= 0) {
      tenants[index] = { ...tenant, updatedAt: new Date().toISOString() }
    } else {
      tenants.push({ ...tenant, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
    }
    return this.writeFile('tenants.json', tenants)
  }

  async deleteTenant(id: string): Promise<boolean> {
    const tenants = await this.getTenants()
    const filtered = tenants.filter(t => t.id !== id)
    return this.writeFile('tenants.json', filtered)
  }

  // Payments
  async getPayments(): Promise<Payment[]> {
    return this.readFile<Payment>('payments.json')
  }

  async savePayment(payment: Payment): Promise<boolean> {
    const payments = await this.getPayments()
    const index = payments.findIndex(p => p.id === payment.id)
    if (index >= 0) {
      payments[index] = { ...payment, updatedAt: new Date().toISOString() }
    } else {
      payments.push({ ...payment, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
    }
    return this.writeFile('payments.json', payments)
  }

  // Maintenance
  async getMaintenance(): Promise<Maintenance[]> {
    return this.readFile<Maintenance>('maintenance.json')
  }

  async saveMaintenance(maintenance: Maintenance): Promise<boolean> {
    const maintenanceList = await this.getMaintenance()
    const index = maintenanceList.findIndex(m => m.id === maintenance.id)
    if (index >= 0) {
      maintenanceList[index] = { ...maintenance, updatedAt: new Date().toISOString() }
    } else {
      maintenanceList.push({ ...maintenance, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
    }
    return this.writeFile('maintenance.json', maintenanceList)
  }

  // Expenses
  async getExpenses(): Promise<Expense[]> {
    return this.readFile<Expense>('expenses.json')
  }

  async saveExpense(expense: Expense): Promise<boolean> {
    const expenses = await this.getExpenses()
    const index = expenses.findIndex(e => e.id === expense.id)
    if (index >= 0) {
      expenses[index] = expense
    } else {
      expenses.push({ ...expense, createdAt: new Date().toISOString() })
    }
    return this.writeFile('expenses.json', expenses)
  }

  // Zone Managers
  async getZoneManagers(): Promise<ZoneManager[]> {
    return this.readFile<ZoneManager>('zoneManagers.json')
  }
}

export const dataService = new DataService()

