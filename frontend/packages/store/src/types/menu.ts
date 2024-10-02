interface IMenu {
  id: string
  name: string
  price: number
  category: string
}

interface IMenuCreateRequest {
  name: string
  price: number
  category: string
}

interface IMenuEditRequest {
  name: string
  price: number
  category: string
}

export type { IMenu, IMenuEditRequest, IMenuCreateRequest }
