interface IEmployee {
  id: string
  name: string
  departmentId: string
  departmentName: string
}

interface IDepartment {
  id: string
  name: string
}

export type { IEmployee, IDepartment }
