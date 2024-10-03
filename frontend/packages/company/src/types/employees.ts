interface IEmployee {
  id: string
  employeeName: string
  employeeCode: string
  departmentId: string
  departmentName: string
  createdAt: Date
}

interface IDepartment {
  id: string
  name: string
}

export type { IEmployee, IDepartment }
