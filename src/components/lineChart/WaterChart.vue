<template>
    <div :style="componentStyles">
      <Line ref='line' id="chart" :data="data" :options="options" :plugins="plugins"/>
    </div>
</template>
  
<script lang="ts">
  import { Line } from 'vue-chartjs'
  import {Chart as ChartJS, CategoryScale,LinearScale,PointElement,LineElement,Title,
        Tooltip,Legend
  } from 'chart.js'
  import {plugin} from './water_plugin.js'
  import axios from 'axios'
  ChartJS.register(CategoryScale,LinearScale,
                PointElement, LineElement,
                Title, Tooltip,Legend
    )
  export default {
    name: 'LineChart',
    components: { Line },
    props: {
      phoneHeight: {
        type: String,
        default: '300px'
      },
      desktopHeight: {
        type: String,
        default: '500px'
      },
      start: String,
      end: String
    },
    data() {
      return {
        data: {
          labels: ['2023-06-01 02:07:35', '2023-06-01 13:21:42', '2023-06-02 01:38:26', '2023-06-02 05:34:20', '2023-06-03 07:38:16', '2023-06-04 09:14:35', '2023-06-05 02:14:22'],
          datasets: [
            {
              label: '新竹',
              backgroundColor: '#E86A92',
              borderColor: '#E86A92',
              data: [40, 39, 10, 40, 39, 80, 40],
              tension: 0.2
            },
            {
              label: '中部',
              backgroundColor: '#F7F7F9',
              borderColor: '#F7F7F9',
              data: [20, 19, 50, 10, 90, 23, 13],
              tension: 0.2
            },
            {
              label: '南部',
              backgroundColor: '#9AD1D4',
              borderColor: '#9AD1D4',
              data: [15, 20, 37, 40, 45, 60, 70],
              tension: 0.2
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
        plugins: [plugin],
        apiurl: "http://localhost:3000/api/reservoir",
        apiData: {},
        apiWater: {},
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
      },
      datasetLength() {
        return this.data.datasets.length;
      }
    },
    mounted() {
      this.fetchData();
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
        console.log(this.start);
        console.log(this.end);
        axios.get(this.apiurl, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type'
          },
          params: {
            start: this.start? this.start:this.currentDate(-4),
            end: this.end? this.end:this.currentDate()
          }
          }).then(response => {
            if(this.apiData !== response.data)
              this.apiData = response.data;
              // Convert Proxy objects to JSON and parse it back
              this.update_chart(this.apiData);
          }).catch(error => {
              console.error(error);
          });
      },
      update_chart(data){
        var labels = [];
        var datasets = [[],[],[]];
        for(let x of data.新竹){
          labels.push(x.updated_time);
          datasets[0].push(x.percentage*100);
        }
        //console.log(labels);
        for(let x of data.臺中){
          datasets[1].push(x.percentage*100);
        }
        for(let x of data.臺南){
          datasets[2].push(x.percentage*100);
        }
        while(labels.length>30){ 
          // select even-indexed elements for too much data to show
          labels = labels.filter(function(element, index, array) {
            return (index % 2 === 0);
          });
          datasets[0] = datasets[0].filter(function(element, index, array) {
            return (index % 2 === 0);
          });
          datasets[1] = datasets[1].filter(function(element, index, array) {
            return (index % 2 === 0);
          });
          datasets[2] = datasets[2].filter(function(element, index, array) {
            return (index % 2 === 0);
          });
        }
        this.$refs.line.chart.data.labels = labels;
        this.$refs.line.chart.data.datasets[0].data = datasets[0];
        this.$refs.line.chart.data.datasets[1].data = datasets[1];
        this.$refs.line.chart.data.datasets[2].data = datasets[2];
        this.$refs.line.chart.update();
      },
      currentDate(offset=0) {
        const current = new Date();
        current.setDate(current.getDate()+offset); // add offset to current date
        var paddedMonth = ('0'+`${current.getMonth()+1}`).slice(-2); // leading-zero padding
        var paddedDate = ('0'+`${current.getDate()}`).slice(-2);
        const date = `${current.getFullYear()}-${paddedMonth}-${paddedDate}`;
        return date;
      }
    }
  }
</script>