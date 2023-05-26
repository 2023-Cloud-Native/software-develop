<script setup>
  import LineChart from '../components/LineChart.vue'
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
    </form>
</template>

<style scoped>
.frame{
    width: 100%;
    height: fit-content;
    margin-top: 2.5em;
}
.middle {
  text-align: center ;
}
.inputBlock {
    display: inline-block;
    padding: 3em;
    width: auto;
    height: 20%;
}
</style>
