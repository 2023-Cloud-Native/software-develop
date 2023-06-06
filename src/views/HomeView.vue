<script>
import water_unit from '@/components/overview/water_unit.vue';
import power_unit from '../components/overview/power_unit.vue';
import earthquake_unit from '../components/overview/earthquake_unit.vue';
import axios from 'axios';

axios.defaults.timeout = 8000;
axios.defaults.baseURL = "http://127.0.0.1"

export default{
    components: {
        water_unit,
        power_unit,
        earthquake_unit
  },
    data() {
        return {
            apiurl: "http://localhost:3000/api",
            apiData: {},
            apiEarth: {},
            apiPower: {},
            apiWater: {},
            datas: [
                {
                    area: "竹科廠",
                    water:{
                        number: 4,
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
                        number: 4,
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
    mounted() {
        this.fetchData(); // 页面加载时执行 GET 请求
    },
    watch: {
        // 监听 apiData 的变化，在数据变化时执行 GET 请求
        apiData: {
            handler() {
                this.fetchData();
            },
        deep: true,
        },
    },
    methods: {
        fetchData() {
            var status ;
            axios.get(this.apiurl, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'Content-Type'
                }
                }).then(response => {
                    this.apiData = response.data;
                    
                    // Convert Proxy objects to JSON and parse it back
                    var apiEarth = this.apiData.Earthquake;
                    var apiPower = this.apiData.Electricity;
                    var apiWater = this.apiData.Reservoir;
                    this.compute_power(apiPower);   
                    this.compute_water(apiWater);
                    this.compute_earth(apiEarth);    
                }).catch(error => {
                    console.error(error);
                });
        },
        goPower(){
            this.$router.push('/power');
        },
        goWater(){
            this.$router.push('/water');
        },
        goEarthquake(){
            this.$router.push('/earthquake');
        },
        compute_power(power){
            this.datas[0].power.pow_gen = power.north_generate;
            this.datas[1].power.pow_gen = power.central_generate;
            this.datas[2].power.pow_gen = power.south_generate;
            this.datas[0].power.pow_use = power.north_usage;
            this.datas[1].power.pow_use = power.central_usage;
            this.datas[2].power.pow_use = power.south_usage;
        },
        compute_water(water){
            this.datas[0].water.capacity = water.新竹.total_capacity;
            this.datas[0].water.storage_now = water.新竹.current_capacity;
            this.datas[0].water.storage_before = water.新竹.current_capacity + water.新竹.outflow - water.新竹.inflow ;
            this.datas[1].water.capacity = water.臺中.total_capacity;
            this.datas[1].water.storage_now = water.臺中.current_capacity;
            this.datas[1].water.storage_before = water.臺中.current_capacity + water.新竹.outflow - water.新竹.inflow ;
            this.datas[2].water.capacity = water.臺南.total_capacity;
            this.datas[2].water.storage_now = water.臺南.current_capacity;
            this.datas[2].water.storage_before = water.臺南.current_capacity + water.新竹.outflow - water.新竹.inflow ;
        },
        compute_earth(data){
            var level = [0, 0.8, 2.5, 8.0, 25, 80, 250, 800];
            var pgaN = data.新竹[0].pga;
            var pgaC = data.臺中[0].pga;
            var pgaS = data.臺南[0].pga;
            console.log(pgaN);
            this.datas[0].earthquake.deg = 0;
            this.datas[1].earthquake.deg = 0;
            this.datas[2].earthquake.deg = 0;
            for(var i=0; i<8; i++){
                if(pgaN > level[i]) {
                    this.datas[0].earthquake.deg = i;
                }
                if(pgaC > level[i]) {
                    this.datas[1].earthquake.deg = i;
                }
                if(pgaS > level[i]) {
                    this.datas[2].earthquake.deg = i;
                }
            }
            
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
    width:auto;
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