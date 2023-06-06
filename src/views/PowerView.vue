<script>
  import LineChart from '../components/lineChart/PowerChart.vue'
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
      <h2 class="middle">電力</h2>
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
