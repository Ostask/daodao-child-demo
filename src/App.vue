<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {getToken} from "@/utils/auth"
import {watchUserInfo} from "@/utils/actions";
import { mapMutations } from 'vuex'

export default {
  name: 'App',
  data(){
    return{                     
      
    }
  },           
  mounted() {
    watchUserInfo((state, prevState) => {
      // state: 变更后的状态; prevState: 变更前的状态
      let {userInfo} = state
      this.setUserInfo(userInfo)
    })
  },
  methods:{
    ...mapMutations({
        setUserInfo: 'SET_USERINFO'
    })
  }
}
</script>

<style scoped>

</style>
