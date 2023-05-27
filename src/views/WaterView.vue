<script>
  import LineChart from '../components/lineChart/LineChart.vue'
  import axios from 'axios';

  axios.defaults.timeout = 8000;
  axios.defaults.baseURL = "http://127.0.0.1"

  export default {
      components: {
          LineChart
    },
      data() {
          return {
              apiurl: "http://localhost:3000/api",
              apiData: {},
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
              
          }
      }
  }
</script>

<template>
    <div class="frame">
      <h2 class="middle">水利</h2>
      <LineChart />
    </div>
    <form method="get" id="waterDateTime">
      <div class="inputBlock">
        <label for="start">開始時間：</label>
        <br />
        <input type="date"/>
      </div>
      <div class="inputBlock">
        <label for="end">結束時間：</label>
        <br/>
        <input type="date"/>
      </div>
      <p class="desc_block">
        新竹：寶山第二水庫、寶山水庫、永和山水庫、石門水庫<br/>
        中部：德基水庫、鯉魚潭水庫<br/>
        南部：南化水庫、曾文水庫、烏⼭頭⽔庫、阿公店水庫
      </p>
    </form>
    
    
</template>

<style scoped>
.frame{
    width: 100%;
    height: fit-content;
    margin-top: 2.5em;
}
.desc_block {
    float: right;
    width: 30%;
    margin: 2em;
}
.middle {
  text-align: center;
}
.inputBlock {
    display: inline-block;
    padding: 3em;
    width: auto;
    height: 20%;
}
</style>
