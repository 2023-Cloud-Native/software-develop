<script>
  import LineChart from '../components/lineChart/WaterChart.vue'
  import axios from 'axios';

  axios.defaults.timeout = 8000;
  axios.defaults.baseURL = "http://127.0.0.1"

  export default {
    components: {
      LineChart
    }
  }
</script>

<template>
    <div class="frame">
      <h2 class="middle">水利</h2>
      <LineChart :start="start" :end="end"/>
    </div>
    <form method="get" id="waterDateTime">
      <div class="inputBlock">
        <label for="start">開始時間：</label>
        <br />
        <input v-model="start" type="date"/>
      </div>
      <div class="inputBlock">
        <label for="end">結束時間：</label>
        <br/>
        <input v-model="end" type="date"/>
      </div>
      <div class="inputBlock">
        <input type="submit">
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
