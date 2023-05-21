<script setup>
    import LineChart from '../components/LineChart.vue'
</script>

<template>
    <div class="frame">
      <h2>This is the power view</h2>
        <LineChart />
    </div>
</template>

<style scoped>
.frame{
    width: 100%;
    height: fit-content;
}

.test{
    width: 1920px;
    height: 1080px;
    text-align: center;
    padding-top: 300px;
}
</style>