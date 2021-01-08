<template>
    <div class="map" id="map"></div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    mounted(){
        // 百度地图API功能
        const BMap = window.BMap
        var map = new BMap.Map("map");    // 创建Map实例
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
        //添加地图类型控件
        map.addControl(new BMap.MapTypeControl({
            mapTypes:[
                window.BMAP_NORMAL_MAP,
                window.BMAP_HYBRID_MAP
            ]}));	  
        map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    }
}
</script>

<style lang="scss" scoped>
    .map{
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
    }
</style>