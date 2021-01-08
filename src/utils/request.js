import Vue from 'vue'
import axios from 'axios'
import  { Message } from 'element-ui'
import { getToken} from '@/utils/auth'
import {sendUserInfo} from "@/utils/actions";

import store from '@/store'

function packAxios(baseUrl,baseAPI){
  baseUrl = baseUrl||""
  let tempAxios = axios.create({
    baseURL: (baseAPI||process.env.VUE_APP_BASE_API)+"/"+baseUrl,
    timeout:5000
  })
  tempAxios.interceptors.request.use(config => {
    config.headers['Authorization'] = getToken()
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    config.headers['realm'] = '';
    
    config.url = encodeURI(config.url)
    config.url = config.url.replace(new RegExp(/(#)/g),encodeURIComponent('#'))
    config.url = config.url.replace(new RegExp(/\+/g),encodeURIComponent('+'))
    
    return config
  }, error => {
    let errormsg = error.length < 10 ? error :'系统异常，请刷新重试'
    Promise.reject(errormsg)
  })
  tempAxios.interceptors.response.use(response => {
    if (response.data.status === 200 ){
      return response.data  //返回response
    }else if (response.data.status === 40101) {
      store.dispatch('LogOut').then(() => {
        sendUserInfo(null)
      })
    }else if(response.data.status === 500||response.data.status === 250){
      let message = response.data.message
      Message({
        message: message,
        type: 'warning',
        duration: 5 * 1000
      })
      return Promise.reject(response.data)
    }else{
      return response.data||{}
    }
  }, error => {
    if(error.response&&error.response.status == 404){
      //router.push({name:'404'})
    }else{
      return Promise.reject(error)
    }
  })
  return tempAxios
}

Vue.prototype.$http = packAxios()
Vue.prototype.$httpBase = packAxios('')
Vue.prototype.$httpProj = packAxios('IOT-SERVER-PROJ')
Vue.prototype.$httpEs = packAxios('IOT-SERVER-ES')
Vue.prototype.$httpDisk = packAxios('IOT-SERVER-DISK')
Vue.prototype.$httpSys = packAxios('IOT-SERVER-SYSTEM2')
Vue.prototype.$httpBd = packAxios('IOT-SERVER-BD')
Vue.prototype.$httpData = packAxios('IOT-DATA-GATHER')
Vue.prototype.$httpWater = packAxios('IOTECH-WATER-CONTROL')
Vue.prototype.$httpBridge = packAxios('IOT-SERVER-BRIDGE')
Vue.prototype.$httpPlatform = packAxios('IOT-JACKUP-PLATFORM','https://www.everiaction.com')