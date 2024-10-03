import paths from '@/configs/paths'

export interface INav {
  title: string
  group: (INavItem | null)[]
}

export interface INavItem {
  title: string
  path: string
  icon?: string
  group?: (INavItem | null)[]
}

const nav = (isCompany: boolean): INav[] => [
  {
    title: 'dashboard.title',
    group: [
      {
        title: 'dashboard.title',
        path: paths.dashboard.root,
        icon: 'teenyicons:donut-chart-solid',
      },
      {
        title: 'dashboard.sales.title',
        path: paths.dashboard.sales.root,
        icon: 'grommet-icons:line-chart',
        group: [
          {
            title: 'dashboard.sales.menu',
            path: paths.dashboard.sales.menu,
          },
          {
            title: 'dashboard.sales.company',
            path: paths.dashboard.sales.company,
          },
          {
            title: 'dashboard.sales.date',
            path: paths.dashboard.sales.time,
          },
        ],
      },
      {
        title: 'dashboard.settlement',
        path: paths.dashboard.settlement,
        icon: 'ph:invoice-duotone',
      },
    ],
  },
  {
    title: 'management.title',
    group: [
      {
        title: 'management.member.title',
        path: isCompany ? paths.management.member.root : paths.management.member.list,
        icon: 'fluent:people-team-16-regular',
        group: isCompany
          ? [
              {
                title: 'management.member.title',
                path: paths.management.member.list,
              },
              {
                title: 'management.member.manager',
                path: paths.management.manager.root,
              },
              {
                title: 'management.member.department',
                path: paths.management.department.root,
              },
            ]
          : undefined,
      },
      {
        title: 'management.payment',
        path: paths.management.payment,
        icon: 'icon-park-outline:table',
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
        title: 'management.settlement.title',
        path: paths.management.settlement.root,
        icon: 'mingcute:card-pay-line',
        group: [
          {
            title: 'management.settlement.settlement_date',
            path: paths.management.settlement.date,
          },
          {
            title: 'management.settlement.settlement_store',
            path: paths.management.settlement.store,
          },
        ],
      },
    ],
  },
  {
    title: 'setting.title',
    group: [
      {
        title: 'setting.account',
        path: paths.setting.account,
        icon: 'majesticons:user-box-line',
      },
      {
        title: 'setting.app',
        path: paths.setting.app,
        icon: 'solar:settings-linear',
      },
    ],
  },
]

// const nav: INav[] = [
//   {
//     title: 'dashboard.title',
//     group: [
//       {
//         title: 'dashboard.title',
//         path: paths.dashboard.root,
//         icon: 'teenyicons:donut-chart-solid',
//       },
//       {
//         title: 'dashboard.sales.title',
//         path: paths.dashboard.sales.root,
//         icon: 'grommet-icons:line-chart',
//         group: [
//           {
//             title: 'dashboard.sales.menu',
//             path: paths.dashboard.sales.menu,
//           },
//           {
//             title: 'dashboard.sales.company',
//             path: paths.dashboard.sales.company,
//           },
//           {
//             title: 'dashboard.sales.date',
//             path: paths.dashboard.sales.time,
//           },
//         ],
//       },
//       {
//         title: 'dashboard.settlement',
//         path: paths.dashboard.settlement,
//         icon: 'ph:invoice-duotone',
//       },
//     ],
//   },
//   {
//     title: 'management.title',
//     group: [
//       {
//         title: 'management.member',
//         path: paths.management.member.root,
//         icon: 'fluent:people-team-16-regular',
//       },
//       {
//         title: 'management.payment',
//         path: paths.management.payment,
//         icon: 'icon-park-outline:table',
//       },
//       {
//         title: 'management.contract.title',
//         path: paths.management.contract.root,
//         icon: 'tabler:contract',
//         group: [
//           {
//             title: 'management.contract.now',
//             path: paths.management.contract.now,
//           },
//           {
//             title: 'management.contract.request',
//             path: paths.management.contract.request,
//           },
//           {
//             title: 'management.contract.history',
//             path: paths.management.contract.history,
//           },
//         ],
//       },
//       {
//         title: 'management.settlement.title',
//         path: paths.management.settlement.root,
//         icon: 'mingcute:card-pay-line',
//         group: [
//           {
//             title: 'management.settlement.settlement_date',
//             path: paths.management.settlement.date,
//           },
//           {
//             title: 'management.settlement.settlement_store',
//             path: paths.management.settlement.store,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     title: 'setting.title',
//     group: [
//       {
//         title: 'setting.account',
//         path: paths.setting.account,
//         icon: 'majesticons:user-box-line',
//       },
//       {
//         title: 'setting.app',
//         path: paths.setting.app,
//         icon: 'solar:settings-linear',
//       },
//     ],
//   },
// ]

export default nav
