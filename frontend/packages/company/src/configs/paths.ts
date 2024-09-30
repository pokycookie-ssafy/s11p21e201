const PATH = {
  root: '/',
  dashboard: '/dashboard',
  management: '/management',
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

  settlement: {
    root: PATH.settlement,
  },
  payment: {
    root: PATH.payment,
  },
  management: {
    member: `${PATH.management}/member`,
    member_create: `${PATH.management}/member/create`,
    contract: {
      root: `${PATH.management}/contract`,
      now: `${PATH.management}/contract/now`,
      new: `${PATH.management}/contract/new`,
      request: `${PATH.management}/contract/request`,
      history: `${PATH.management}/contract/history`,
    },
  },
  temp: {
    temp: `${PATH}/temp`,
  },
}

export default paths
