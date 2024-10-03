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

interface IDepartmentCreateRequest {
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

interface IManagerCreateRequest {
  departmentId: string
  code: string
  password: string
}

export type {
  IManager,
  IEmployee,
  IDepartment,
  IEmployeeCreate,
  IManagerCreateRequest,
  IDepartmentCreateRequest as IDepartmentCreateRequset,
}
