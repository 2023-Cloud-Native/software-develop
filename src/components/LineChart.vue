<template>
    <Line :data="data" :options="options"/>
</template>
  
<script lang="ts">
  import { Line } from 'vue-chartjs'
  import {Chart as ChartJS, CategoryScale,LinearScale,PointElement,LineElement,Title,
        Tooltip,Legend
  } from 'chart.js'
  import * as chartConfig from './chartConfig.js'
  ChartJS.register(CategoryScale,LinearScale,
                PointElement, LineElement,
                Title, Tooltip,Legend
    )

  export default {
    name: 'LineChart',
    components: { Line },
    data() {
      return chartConfig
    }
  }
</script>