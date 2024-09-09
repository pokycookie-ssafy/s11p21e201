const PATH = {
  root: '/',
  component: '/components',
  mirage: '/mirage',
  locale: '/locale',
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
}

export default paths
