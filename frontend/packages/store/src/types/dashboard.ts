interface IDashboardMenu {
  name: string
  price: number
}

interface IDashboardPayment {
  paymentId: string
  companyId: string
  companyName: string
  employeeId: string
  employeeCode: string
  menus: IDashboardMenu[]
  createdAt: Date
}

export type { IDashboardMenu, IDashboardPayment }
