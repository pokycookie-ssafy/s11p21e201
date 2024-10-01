const PATH = {
  root: '/',
  dashboard: '/dashboard',
  management: '/management',
  setting: '/setting',
  payment: '/payment',
  settlement: '/settlement',
}

const paths = {
  root: PATH.root,
  main: `${PATH.management}/member`,

  // auth
  auth: {
    signIn: '/sign-in',
    signUp: '/sign-up',
  },

  // dashboard
  dashboard: {
    root: PATH.dashboard,
    total: `${PATH.dashboard}/total`,

    sales: {
      root: `${PATH.dashboard}/sales`,
      menu: `${PATH.dashboard}/sales/menu`,
      company: `${PATH.dashboard}/sales/company`,
      time: `${PATH.dashboard}/sales/time`,
    },

    settlement: `${PATH.dashboard}/settlement`,
  },

  // management
  management: {
    member: {
      root: `${PATH.management}/member`,
      create: `${PATH.management}/member/create`,
    },
    payment: `${PATH.management}/payment`,
    settlement: {
      root: `${PATH.management}/settlement`,
      date: `${PATH.management}/settlement/date`,
      store: `${PATH.management}/settlement/company`,
    },
    contract: {
      root: `${PATH.management}/contract`,
      now: `${PATH.management}/contract/now`,
      new: `${PATH.management}/contract/new`,
      request: `${PATH.management}/contract/request`,
      history: `${PATH.management}/contract/history`,
    },
  },

  // setting
  setting: {
    root: PATH.setting,
    account: `${PATH.setting}/account`,
    app: `${PATH.setting}/app`,
  },
}

export default paths
