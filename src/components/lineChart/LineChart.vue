<template>
    <div :style="componentStyles">
      <Line id='chart' :data="data" :options="options" :plugins="plugins"/>
    </div>
</template>
  
<script lang="ts">
  import { Line } from 'vue-chartjs'
  import {Chart as ChartJS, CategoryScale,LinearScale,PointElement,LineElement,Title,
        Tooltip,Legend
  } from 'chart.js'
  import {plugin} from './plugin.js'
  ChartJS.register(CategoryScale,LinearScale,
                PointElement, LineElement,
                Title, Tooltip,Legend
    )
  export default {
    name: 'LineChart',
    components: { Line },
    data() {
      return {
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: '新竹',
              backgroundColor: '#E86A92',
              borderColor: '#E86A92',
              data: [40, 39, 10, 40, 39, 80, 40]
            },
            {
              label: '中部',
              backgroundColor: '#F7F7F9',
              borderColor: '#F7F7F9',
              data: [20, 19, 50, 10, 90, 23, 13]
            },
            {
              label: '南部',
              backgroundColor: '#9AD1D4',
              borderColor: '#9AD1D4',
              data: [10, 20, 30, 40, 50, 60, 70]
            }
          ]
        }, 
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              title: {
                display: true,
                text: 'Percentage(%)'
              },
              bounds: 'ticks',
              suggestedMax: 100,
              suggestedMin: 0
            },
            x: {
              position: 'bottom'
            }
          }
        },
        plugins: [plugin]
      }
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
        padding: this.isDesktop ? "3em" : "0",
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