const cookieparser = process.server ? require('cookieparser') : undefined

//在服务端渲染期间都是同一个实例
//为了防止数据冲突，将state定义成函数，动态返回数据对象
export const state = ()=>{
    return {
        user:null
    }
}

export const mutations = {
    setUser(state,data){
        state.user=data
    }
}

export const actions = {
    //nuxtServerInit服务端渲染期间自动调用
    //初始化容器数据，传递数据给客户端使用
    nuxtServerInit ({ commit }, { req }) {
        let user = null
        if (req.headers.cookie) {
            //将客户端请求中的cookie转成对象
          const parsed = cookieparser.parse(req.headers.cookie)
          try {
            user = JSON.parse(parsed.user)
          } catch (err) {
            // No valid cookie found
          }
        }
        commit('setUser', user)
      }
}
