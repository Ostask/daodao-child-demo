import Vue from 'vue'
import VueRouter from 'vue-router'
import actions from "@/shared/actions";

import "./public-path";

import App from './App.vue'
import routes from "./router"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import store from './store'
import "@/utils/request"


const packageName = require('../package.json').name;

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI);



let instance = null;
let router = null;

// const router = new VueRouter({
//   mode:"history",
//   routes
// })

/**
 * 渲染函数
 * 两种情况：主应用生命周期钩子中运行 / 微应用单独启动时运行
 */
function render(props) {
  if (props) {
    // 注入 actions 实例
    actions.setActions(props);
  }
  // 在 render 中创建 VueRouter，可以保证在卸载微应用时，移除 location 事件监听，防止事件污染
  router = new VueRouter({
    // 运行在主应用中时，添加路由命名空间 /vue
    //base: window.__POWERED_BY_QIANKUN__ ? `/${packageName}` : "/",
    //mode: "history",
    //base: process.env.BASE_URL,
    routes,
  });

  // 判断 qiankun 环境则进行路由拦截，判断跳转路由是否有 /micro 开头前缀，没有则加上
  if(window.__POWERED_BY_QIANKUN__){
    router.beforeEach((to, from, next) => {
      if(!to.path.includes('/'+packageName)){
        next({
          path: '/' + packageName + to.path
        })
      }else{
        next()
      }
    })
  }

  // 挂载应用
  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
}

// 独立运行时，直接挂载应用
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log("VueMicroApp bootstraped");
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  console.log("VueMicroApp mount", props);
  render(props);
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  console.log("VueMicroApp unmount");
  instance.$destroy();
  instance = null;
  router = null;
}