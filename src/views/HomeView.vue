<script>
import water_unit from '@/components/overview/water_unit.vue';
import power_unit from '../components/overview/power_unit.vue';
import earthquake_unit from '../components/overview/earthquake_unit.vue';

export default{
    components: {
        water_unit,
        power_unit,
        earthquake_unit
  },
    data() {
        return {
            datas: [
                {
                    area: "桃園廠",
                    water:{
                        number: 1,
                        capacity: 2000.0,
                        storage_now: 1000.0,
                        storage_before: 900.0
                    },
                    power: {
                        pow_gen: 1000.0,
                        pow_use: 700.0
                    },
                    earthquake: {
                        deg: 1
                    }
                }, 
                {
                    area: "竹科廠",
                    water:{
                        number: 3,
                        capacity: 2000.0,
                        storage_now: 20.0,
                        storage_before: 100.0
                    },
                    power: {
                        pow_gen: 1000.0,
                        pow_use: 500.0
                    },
                    earthquake: {
                        deg: 3
                    }
                },
                {
                    area: "中科廠",
                    water:{
                        number: 2,
                        capacity: 2000.0,
                        storage_now: 2000.0,
                        storage_before: 2000.0
                    },
                    power: {
                        pow_gen: 1000.0,
                        pow_use: 800.0
                    },
                    earthquake: {
                        deg: 5
                    }
                }, 
                {
                    area: "南科廠",
                    water:{
                        number: 1,
                        capacity: 2000.0,
                        storage_now: 1000.0,
                        storage_before: 900.0
                    },
                    power: {
                        pow_gen: 1000.0,
                        pow_use: 1000.0
                    },
                    earthquake: {
                        deg: 7
                    }
                }
            ]
        }
    },
    methods: {
        goPower(){
            this.$router.push('/power');
        },
        goWater(){
            this.$router.push('/water');
        },
        goEarthquake(){
            this.$router.push('/earthquake');
        }
    }
}
    
</script>

<template>
    <div class="frame ">
        <div class="outbox head">
            <div class="area">廠區</div>
            <div class="water" @click="goWater">現在水量(萬立方公尺)</div>
            <div class="power" @click="goPower">現在用電量(萬瓩)</div>
            <div class="earth" @click="goEarthquake">最近地震</div>
        </div>
        <div class="outbox content" v-for="item in datas" >
            <div class="area"><div class="area_name">{{ item.area }}</div></div>
            <water_unit class="water" @click="goWater" :msg="item.water"></water_unit>
            <power_unit class="power" @click="goPower" :msg="item.power"></power_unit>
            <earthquake_unit class="earth" @click="goEarthquake" :msg="item.earthquake"></earthquake_unit>
        </div>
    </div>
</template>

<style scoped>
.frame{
    width: 100%;
    height: fit-content;
    margin: 0px;
}
.head{
    height: 100px;
    font-weight: 1000;
    padding-top: 30px;
    font-size: 30px;
    text-align: center; 
}

.outbox{
    display: flex;
    width: 100%;
    margin: auto;
    border-bottom: 1px solid lightgray ;
}

.content{
    height: 200px;
    position: relative;
}

.area{
    width: 19%;
    font-size: 30px;
    flex-grow: 0;
}

.content .area{
    position: relative;
}

.area_name{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

.power{
    width: 27%;
}

.earth{
    width: 27%;
}

.water{
    width: 27%;
    /* border: 1px solid; */
}

a{
    text-decoration: none !important;
    color: black;
    display: block;
}


</style>