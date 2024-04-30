import { StoreType } from './httpType'
const store: StoreType = {}
Object.defineProperties(store, {
  org: {
    get() {
      return JSON.parse(localStorage.getItem('currentOrg') as string)
    },
  },
  user: {
    get() {
      return JSON.parse(localStorage.getItem('user') as string)
    },
  },
  token: {
    get() {
      return localStorage.getItem('token')
    },
  },
  operations: {
    get() {
      // eslint-disable-next-line eqeqeq
      return localStorage['operations'] == null ? null : JSON.parse(localStorage['operations'])
    },
  },
})

export default store
