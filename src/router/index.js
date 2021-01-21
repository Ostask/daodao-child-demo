const packageName = require('../../package.json').name;

// 判断是 qiankun 环境则增加路由前缀
let prefix = ''
if(window.__POWERED_BY_QIANKUN__){
    prefix = '/'+packageName
  }

const routes = [
    {
        path:prefix + "/",
        name:"Map",
        component:() => import('@/pages/map.vue')
    },
    {
        path:prefix + "/three",
        name:"Three",
        component:() => import('@/pages/three.vue')
    },
    {
        path:prefix + "/data",
        name:"Getdata",
        component:() => import('@/pages/getData.vue')
    },
    {
        path:prefix + "/query",
        name:"Query",
        component:() => import('@/pages/projects.vue')
    },
    {
        path:prefix + "/charts",
        name:"Charts",
        component:() => import('@/pages/charts.vue')
    },
    {
        path:prefix + "/public",
        name:"Public",
        component:() => import('@/pages/public.vue')
    }
]

export default routes