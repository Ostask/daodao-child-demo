import { removeToken,setUser,getUser,removeUser } from '@/utils/auth'
const user = {
  state: {
    userInfo: getUser()||{},
  },
  mutations: {
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      setUser(JSON.stringify(userInfo))
    }
  },

  actions: {
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        removeToken()
        commit('SET_USERINFO',null)
        removeUser()
        resolve()
      })
    }
  }
}

export default user