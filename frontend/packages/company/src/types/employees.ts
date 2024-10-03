interface IEmployee {
  id: string
  employeeName: string
  employeeCode: string
  departmentId: string
  departmentName: string
  createdAt: Date
}

interface IEmployeeCreate {
  code: string
  name: string
  supportAmount: number
  password: string
}

interface IDepartment {
  id: string
  code: string
  name: string
}

interface IManager {
  id: string
  code: string
  departmentId: string
  departmentName: string
  createdAt: Date
}

export type { IManager, IEmployee, IDepartment, IEmployeeCreate }
