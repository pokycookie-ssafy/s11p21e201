interface IDashboardPayment {
  id: string
  employeeId: string
  employeeName: string
  price: number
  paidAt: string
  departmentId: string
  departmentName: string
  restaurantId: string
  restaurantName: string
}

export type { IDashboardPayment }
