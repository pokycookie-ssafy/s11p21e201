import paths from '@/configs/paths'

export type NavValue = 'main' | 'setting' | 'payments'

export interface INav {
  value: NavValue
  label: string
  icon: string
  path: string
}

export const navs: INav[] = [
  {
    value: 'setting',
    label: 'nav.setting',
    icon: 'solar:settings-linear',
    path: paths.setting,
  },
  { value: 'main', label: 'nav.main', icon: 'solar:home-2-linear', path: paths.main },
  {
    value: 'payments',
    label: 'nav.payments',
    icon: 'solar:bill-list-linear',
    path: paths.payments,
  },
]
