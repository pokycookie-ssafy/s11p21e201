import paths from '@/configs/paths'

export interface INav {
  title: string
  group: INavItem[]
}

export interface INavItem {
  title: string
  path: string
  icon?: string
  group?: INavItem[]
}

const nav: INav[] = [
  {
    title: 'dashboard.title',
    group: [
      {
        title: 'dashboard.title',
        path: paths.temp.temp,
        icon: 'teenyicons:donut-chart-solid',
      },
      {
        title: 'dashboard.sales.title',
        path: paths.temp.temp,
        icon: 'grommet-icons:line-chart',
        group: [
          {
            title: 'dashboard.sales.menu',
            path: paths.temp.temp,
          },
          {
            title: 'dashboard.sales.company',
            path: paths.temp.temp,
          },
          {
            title: 'dashboard.sales.date',
            path: paths.temp.temp,
          },
        ],
      },
      {
        title: 'dashboard.settlement',
        path: paths.settlement.root,
        icon: 'ph:invoice-duotone',
      },
    ],
  },
  {
    title: 'management.title',
    group: [
      {
        title: 'management.payment',
        path: paths.payment.root,
        icon: 'tabler:contract',
      },
      {
        title: 'management.settlement',
        path: paths.settlement.root,
        icon: 'uil:money-insert',
      },
      {
        title: 'management.contract.title',
        path: paths.management.contract.root,
        icon: 'tabler:contract',
        group: [
          {
            title: 'management.contract.now',
            path: paths.management.contract.now,
          },
          // {
          //   title: 'management.contract.new',
          //   path: paths.management.contract.new,
          // },
          {
            title: 'management.contract.request',
            path: paths.management.contract.request,
          },
          {
            title: 'management.contract.history',
            path: paths.management.contract.history,
          },
        ],
      },
      {
        title: 'management.member',
        path: paths.management.member,
        icon: 'fluent:people-team-16-regular',
      },
    ],
  },
  {
    title: 'setting.title',
    group: [
      {
        title: 'setting.account',
        path: paths.temp.temp,
        icon: 'majesticons:user-box-line',
      },
      {
        title: 'setting.app',
        path: paths.temp.temp,
        icon: 'solar:settings-linear',
      },
    ],
  },
]

export default nav
