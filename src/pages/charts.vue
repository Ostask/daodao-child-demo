<template>
    <div>
        <div id="charts" style="width: 600px;height:400px;"></div>
    </div>
</template>

<script>
const echarts = require('echarts')

export default {
    data(){
        return {

        }
    },
    mounted(){
        var myChart = echarts.init(document.getElementById('charts'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }
}
</script>