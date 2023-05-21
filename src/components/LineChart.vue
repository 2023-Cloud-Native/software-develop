<template>
    <div :style="componentStyles">
      <Line :data="data" :options="options"/>
    </div>
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
    },
    props: {
      phoneHeight: {
        type: String,
        default: '300px'
      },
      desktopHeight: {
        type: String,
        default: '500px'
      }
  },
  computed: {
    componentStyles() {
      return {
        margin: "auto",
        padding: this.isDesktop ? "4em" : "0",
        width: "90%",
        height: this.isDesktop ? this.desktopHeight : this.phoneHeight
      };
    },
    isDesktop() {
      return window.innerWidth >= 768;
    }
  }
  }
</script>