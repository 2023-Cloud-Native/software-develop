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
      return {
        data:{
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'Example Data 1',
              backgroundColor: '#f87979',
              borderColor: '#f87979',
              data: [40, 39, 10, 40, 39, 80, 40]
            },
            {
              label: 'Example Data 2',
              backgroundColor: '#cbf3f0',
              borderColor: '#cbf3f0',
              data: [20, 19, 50, 10, 90, 23, 13]
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
            },
            /*
            'x-green': {
              type: 'linear',
              display: true,
              position: {
                x: 50
              },
              backgroundColor: 'green',
              border: {
                color: 'green'
              }
            }
            */
          }
        }
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