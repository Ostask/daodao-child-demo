<template>
    <div class="article-page">
        <h3>主应用共享插件</h3>
        <el-button @click="test">点我啊</el-button>
        <h3>主应用共享组件</h3>
        <nothing></nothing>
        <h3>主应用共享方法</h3>
        <el-button @click="hello">点一下</el-button>
        <h3>主应用共享指令</h3>
        <p>点击每一列并打开控制台查看</p>
        <ul>
            <li v-for="(item,index) in arr" :key="index" v-my-click="item">{{item}}</li>
        </ul>
    </div>
</template>

<script>
import {util} from '@/utils/common.js'

export default {
  data(){
    return{
      arr:['a','b','c','d','e']
    }
  },
  methods:{
    test(){
      this.$daodao.success('这是一条成功消息')
    },
    hello(){
      util.hello()
    }
  }
}
</script>