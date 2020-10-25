/**
 * nuxt.js 配置文件
*/

module.exports={
    server:{
        port:3000,
        //本地访问是用localhost
        host:'0.0.0.0'
    },
    router:{
        //nuxt-link 匹配路由高亮设置
        linkActiveClass: 'active',
        //自定义路由表
        extendRoutes(routes, resolve) {
            //清空nuxt.js 基于pages目录生成的默认路由表规则
            routes.splice(0);
            routes.push(...[
                {
                    path:'/',
                    component:resolve(__dirname,'pages/layout/'),
                    children:[
                        {
                        path:'', // 默认路由
                        name:"home",
                        component:resolve(__dirname,'pages/home/')
                    },
                    {
                        path:'/login', 
                        name:"login",
                        component:resolve(__dirname,'pages/login/')
                    },
                    {
                        path:'/register', 
                        name:"register",
                        component:resolve(__dirname,'pages/login/')
                    },
                    {
                        path:'/profile/:username', 
                        name:"profile",
                        component:resolve(__dirname,'pages/profile/')
                    },
                    {
                        path:'/settings', 
                        name:"settings",
                        component:resolve(__dirname,'pages/settings/')
                    },
                    {
                        path:'/editor', 
                        name:"editor",
                        component:resolve(__dirname,'pages/editor/')
                    },
                    {
                        path:'/article/:slug', 
                        name:"article",
                        component:resolve(__dirname,'pages/article/')
                    }
                ]
                }
            ])
          }
    },
    plugins: ['~plugins/request.js','~plugins/dayjs.js']
}