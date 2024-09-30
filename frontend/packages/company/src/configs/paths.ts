const PATH = {
  root: '/',
  component: '/components',
  mirage: '/mirage',
  locale: '/locale',
  management: '/management',
  payment: '/payment',
  settlement: '/settlement',
}

const paths = {
  root: PATH.root,
  components: {
    root: PATH.component,
    toast: `${PATH.component}/toast`,
    scrollbar: `${PATH.component}/scrollbar`,
  },
  mirage: {
    root: PATH.mirage,
  },
  locale: {
    root: PATH.locale,
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
