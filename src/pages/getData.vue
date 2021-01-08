<template>
    <div class="get-data">
       <img src="@/assets/timg.jpg" alt="">
       <div class="user-info">
        <p>
            昵称:{{this.userInfo.name}}
        </p>
        <p>
            用户名：{{this.userInfo.username}}
        </p>
        <p>
            电话：{{this.userInfo.telPhone}}
        </p>
        <p>
            邮箱：{{this.userInfo.email}}
        </p>
        <p>
            注册时间:{{this.userInfo.createTime}}
        </p>
       </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    data(){
        return{

        }
    },
    computed: {
        ...mapGetters([
            'userInfo'
        ])
    }
}
</script>

<style lang="scss" scoped>
    .get-data{
        display: flex;
        .user-info{
            padding-left:10px;
        }
    }
</style>