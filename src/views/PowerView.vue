<script setup>
    import LineChart from '../components/LineChart.vue'
    
</script>

<template>
    <div class="frame">
      <h2 class="middle">電力</h2>
        <LineChart :data="data"/>
    </div>
    <form method="get" id="powerDateTime">
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
  text-align: center;
}
.test{
    width: 1920px;
    height: 1080px;
    text-align: center;
    padding-top: 300px;
}
.inputBlock {
    display: inline-block;
    padding: 1em;
    width: auto;
    height: 20%;
}
</style>