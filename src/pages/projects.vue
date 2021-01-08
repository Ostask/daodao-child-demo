<template>
    <div class="projects">
         <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
            prop="name"
            label="项目名称">
            </el-table-column>
            <el-table-column
            prop="typeName"
            label="项目类型">
            </el-table-column>
            <el-table-column
            prop="position"
            label="项目地址">
            </el-table-column>
            <el-table-column
            prop="createTime"
            label="创建时间">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tableData:[]
        }
    },
    mounted(){
        this.queryData()
    },
    methods:{
        queryData(){
            let sendObj = {
                andCondition: {type: ""},
                orderByCondition: {py_head: "asc"},
                otherCondition: {name: ""},
                pageObj: {}
            }
            this.$httpProj.post("proj/project/indexPage",sendObj).then(res =>{
                this.tableData = res.data.list
            })
        }
    }
}
</script>